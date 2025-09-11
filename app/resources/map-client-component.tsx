"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import * as d3 from "d3";
import { hexbin as d3Hexbin } from "d3-hexbin";
import type { HexbinBin } from "d3-hexbin";
import * as topojson from "topojson-client";

interface Provider {
  name?: string;
  location?: string;
  description?: string;
  providerName?: string;
  coordinates?: [number, number]; 
  storage?: number;
  ram?: number;
  gpus?: number;
  bandwidth?: number;
}

interface Filters {
  provider?: string;
  minStorage?: number;
  minRAM?: number;
  minGPUs?: number;
  minBandwidth?: number;
}

interface MapClientComponentProps {
  providers: Provider[];
  searchQuery?: string;
  filters?: Filters;
}

// Cache world data globally
let cachedWorldData: any = null;
const landCache = new Map<string, boolean>();

const MapComponent: React.FC<MapClientComponentProps> = ({ providers, searchQuery, filters }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [providersVisible, setProvidersVisible] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [processingProviders, setProcessingProviders] = useState(false);
  
  const [stats, setStats] = useState({
    countries: 0,
    providers: 0,
    regions: 0,
    storage: 0,
    ram: 0,
    bandwidth: 0,
    gpus: 0,
  });

  const width = 1000;
  const height = 600;

  // Memoized projection and path
  const projection = useMemo(() => 
    d3.geoNaturalEarth1().scale(180).translate([width / 2, height / 2]), 
    [width, height]
  );

  const path = useMemo(() => d3.geoPath().projection(projection), [projection]);

  // Memoized hexbin generator
  const hexbin = useMemo(() => 
    d3Hexbin<[number, number]>()
      .radius(5)
      .extent([[0, 0], [width, height]]),
    [width, height]
  );

  // Pre-calculated hex centers
  const hexCenters = useMemo(() => {
    const hexRadius = 5;
    const dx = hexRadius * 1.5;
    const dy = hexRadius * Math.sqrt(3);
    const centers: [number, number][] = [];
    
    let row = 0;
    for (let y = 0; y <= height + dy; y += dy, row++) {
      const offset = (row % 2) * (dx / 2);
      for (let x = 0; x <= width + dx; x += dx) {
        centers.push([x + offset, y]);
      }
    }
    return centers;
  }, [width, height]);

  // Filter providers with debounce effect
  const filteredProviders = useMemo(() => {
    return providers.filter((provider) => {
      if (searchQuery && searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          provider.name?.toLowerCase().includes(query) ||
          provider.location?.toLowerCase().includes(query) ||
          provider.description?.toLowerCase().includes(query) ||
          provider.providerName?.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      if (filters) {
        if (filters.provider && filters.provider !== '' &&
          provider.name !== filters.provider &&
          provider.providerName !== filters.provider) return false;
        if (filters.minStorage > 0 && provider.storage < filters.minStorage) return false;
        if (filters.minRAM > 0 && provider.ram < filters.minRAM) return false;
        if (filters.minGPUs > 0 && provider.gpus < filters.minGPUs) return false;
        if (filters.minBandwidth > 0 && provider.bandwidth < filters.minBandwidth) return false;
      }
      return true;
    });
  }, [providers, searchQuery, filters]);

  const [debouncedProviders, setDebouncedProviders] = useState(filteredProviders);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedProviders(filteredProviders);
    }, 200);

    return () => clearTimeout(handler);
  }, [filteredProviders]);

  const finalStats = useMemo(
    () => ({
      countries: 172,
      providers: 32,
      regions: 482,
      storage: 900 * 1024 * 1024, 
      ram: 26 * 1024 * 1024, 
      bandwidth: 900 * 1024 * 1024, 
      gpus: 335,
    }),
    []
  );

  // Optimized land detection with caching
  const isPointOnLand = useCallback((lonLat: [number, number], land: any) => {
    const key = `${lonLat[0].toFixed(2)}_${lonLat[1].toFixed(2)}`;
    if (landCache.has(key)) {
      return landCache.get(key);
    }
    
    const result = d3.geoContains(land as any, lonLat);
    landCache.set(key, result);
    return result;
  }, []);

  // Loading messages based on progress
  const getLoadingMessage = useCallback(() => {
    if (loadingProgress < 30) return "Calculating provider locations...";
   
    return "Finalizing visualization...";
  }, [loadingProgress]);

  // Update progress function
  const updateProgress = useCallback((newProgress: number) => {
    setLoadingProgress(prev => Math.max(prev, Math.min(newProgress, 100)));
  }, []);

  // Main rendering function
  const renderMap = useCallback((worldData: any) => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    let tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any> = d3.select(tooltipRef.current as HTMLDivElement);
    if (tooltip.empty()) {
      tooltip = d3.select("body")
        .append<HTMLDivElement>("div")
        .attr("class", "hex-tooltip")
        .style("position", "absolute")
        .style("pointer-events", "none")
        .style("padding", "6px 8px")
        .style("background", "rgba(0,0,0,0.75)")
        .style("color", "white")
        .style("font-size", "12px")
        .style("border-radius", "4px")
        .style("display", "none");
    
      tooltipRef.current = tooltip.node();
    }

    // Draw countries
    const land = topojson.merge(worldData, (worldData.objects.countries as any).geometries);
    const countries = topojson.feature(worldData, worldData.objects.countries);
    
    svg.append("g")
      .selectAll("path")
      .data((countries as any).features)
      .join("path")
      .attr("d", path as any)
      .attr("fill", "#ffffff")
      .attr("stroke", "#e6e9ef")
      .attr("stroke-width", 0.4);

    setMapInitialized(true);
   

    setProcessingProviders(true);

   
    const bins: HexbinBin<[number, number]>[] = hexbin(hexCenters);
   
    const validProviders = debouncedProviders.filter((p) => p.coordinates && p.coordinates.length === 2);
    updateProgress(50);

    const projectedProviders: { x: number; y: number; provider: Provider }[] = validProviders
      .map((p) => {
        const projected = projection([p.coordinates![1], p.coordinates![0]]);
        return projected ? { x: projected[0], y: projected[1], provider: p } : null;
      })
      .filter((d): d is { x: number; y: number; provider: Provider } => d !== null);

    updateProgress(60);

   
    type BinKey = string;
    const binMap = new Map<BinKey, Provider[]>();

    bins.forEach((b) => {
      const key = `${Math.round(b.x)}_${Math.round(b.y)}`;
      binMap.set(key, []);
    });

    projectedProviders.forEach((pt, index) => {
      let bestBin: HexbinBin<[number, number]> | null = null;
      let bestDist = Infinity;
      
      for (const b of bins) {
        const dxp = b.x - pt.x;
        const dyp = b.y - pt.y;
        const dist = dxp * dxp + dyp * dyp;
        if (dist < bestDist) {
          bestDist = dist;
          bestBin = b;
        }
      }
      
      if (bestBin) {
        const key = `${Math.round(bestBin.x)}_${Math.round(bestBin.y)}`;
        const arr = binMap.get(key);
        if (arr) arr.push(pt.provider);
      }

     
      if (index % Math.max(1, Math.floor(projectedProviders.length / 10)) === 0) {
        updateProgress(60 + Math.floor((index / projectedProviders.length) * 20));
      }
    });

    updateProgress(80);

   
    const landBins: { bin: HexbinBin<[number, number]>; providers: Provider[] }[] = [];
    
    bins.forEach((b, index) => {
      const inv = projection.invert([b.x, b.y]);
      if (!inv) return;
      
      const lonLat: [number, number] = [inv[0], inv[1]];
      if (isPointOnLand(lonLat, land)) {
        const key = `${Math.round(b.x)}_${Math.round(b.y)}`;
        const list = binMap.get(key) ?? [];
        landBins.push({ bin: b, providers: list });
      }

     
      if (index % Math.max(1, Math.floor(bins.length / 10)) === 0) {
        updateProgress(80 + Math.floor((index / bins.length) * 15));
      }
    });

    updateProgress(95);

    const maxCount = d3.max(landBins, (d) => d.providers.length) ?? 1;
    const color = d3.scaleSequential<number>()
      .domain([0, maxCount])
      .interpolator(
        d3.interpolateRgbBasis([
          "#1E90FF", 
          "#FF69B4", 
          "#8A2BE2", 
          "#FF8C00"  
        ])
      );

    
    const hexLayer = svg.append("g").attr("class", "hex-layer");
    hexLayer
      .selectAll("path")
      .data(landBins)
      .join("path")
      .attr("d", (d) => hexbin.hexagon() as string)
      .attr("transform", (d) => `translate(${d.bin.x},${d.bin.y})`)
      .attr("fill", (d) => (d.providers.length > 0 ? color(d.providers.length) : "#ffffff"))
      .attr("stroke", "#ebebeb")
      .attr("stroke-width", 0.3)
      .style("cursor", (d) => (d.providers.length > 0 ? "pointer" : "default"))
      .on("mousemove", (event, d) => {
        const t = tooltipRef.current
          ? d3.select(tooltipRef.current)
          : d3.select("body");
        const names = d.providers.slice(0, 6).map((p) => p.providerName || p.name || "Unknown").join(", ");
        const more = d.providers.length > 6 ? ` +${d.providers.length - 6} more` : "";
        t
          .style("display", "block")
          .html(`<strong>${d.providers.length}</strong> providers<br/>${names}${more}`)
          .style("left", `${event.pageX + 12}px`)
          .style("top", `${event.pageY + 12}px`);
      })
      .on("mouseleave", () => {
        if (tooltipRef.current) {
          d3.select(tooltipRef.current).style("display", "none");
        } else {
          d3.select("body").select(".hex-tooltip").style("display", "none");
        }
      })
      .on("click", (event, d) => {
        console.log("Providers in hex:", d.providers);
      });

    const progress = validProviders.length / providers.length || 1;
    setStats({
      countries: Math.floor(finalStats.countries * progress),
      providers: Math.floor(finalStats.providers * progress),
      regions: Math.floor(finalStats.regions * progress),
      storage: Math.floor(finalStats.storage * progress),
      ram: Math.floor(finalStats.ram * progress),
      bandwidth: Math.floor(finalStats.bandwidth * progress),
      gpus: Math.floor(finalStats.gpus * progress),
    });

   
    updateProgress(100);
    setProvidersVisible(true);
    
    setProcessingProviders(false);
    setLoading(false);
  }, [hexbin, hexCenters, projection, path, isPointOnLand, debouncedProviders, providers.length, finalStats, updateProgress]);

  
  useEffect(() => {
    setLoading(true);
    setLoadingProgress(0);
    setMapInitialized(false);
    setProvidersVisible(false);
    setProcessingProviders(false);
    setError(null);

    const loadAndRenderMap = async () => {
      try {
        if (cachedWorldData) {
          updateProgress(20);
          renderMap(cachedWorldData);
        } else {
          updateProgress(10);
          const worldData = await d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
          cachedWorldData = worldData;
          updateProgress(25);
          renderMap(worldData);
        }
      } catch (error) {
        console.error("Failed to load world data:", error);
        setError("Failed to load map data. Please check your connection and try again.");
        setLoading(false);
        setProcessingProviders(false);
      }
    };

    loadAndRenderMap();
  }, [renderMap, updateProgress]);

  return (
    <div className="flex flex-col gap-6">
      <div className="overflow-hidden bg-[#ebebeb] rounded-lg  flex justify-center items-center relative min-h-[500px]">
       
        {loading && !mapInitialized && (
          <div className="absolute inset-0 flex items-center justify-center  z-10 rounded-lg">
            <div className="text-center p-6 ">
              <div className="mx-auto mb-4 size-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
              <p className="mb-2 text-lg font-medium text-gray-700">{getLoadingMessage()}</p>
            </div>
          </div>
        )}
        
        {((processingProviders && mapInitialized) && (!providersVisible)) && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-white bg-opacity-90 px-4 py-2 rounded-lg shadow-md border border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-1">Locating providers on map...</p>
            <div className="w-64 h-2 rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1 text-center">
              {loadingProgress}% complete • {debouncedProviders.length} providers
            </p>
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-red-600 mb-2">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        <svg
          ref={svgRef}
          className="rounded-lg shadow-sm"
          style={{
            height: "500px",
            width: "100%",
            overflow: "hidden",
            borderRadius: "16px",
            background: "#ebebeb",
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-7">
        <StatCard title="Countries" value={stats.countries} />
        <StatCard title="Providers" value={stats.providers} />
        <StatCard title="Regions" value={stats.regions} />
        <StatCard title="Storage" value={`${Math.floor(stats.storage / (1024 * 1024))}PB`} isText />
        <StatCard title="GPUs" value={`${stats.gpus}G/F`} isText />
        <StatCard title="Memory" value={`${Math.floor(stats.ram / (1024 * 1024))}PB`} isText />
        <StatCard title="Bandwidth" value={`${Math.floor(stats.bandwidth / (1024 * 1024))}PB`} isText />
      </div>
    </div>
  );
};

function StatCard({
  title,
  value,
  isText = false,
}: {
  title: string;
  value: number | string;
  isText?: boolean;
}) {
  return (
    <div className="bg-[#F5F8FF] border border-[#EBEBEB] rounded-[10px] flex flex-col gap-3 p-4">
      <p className="text-lg md:text-xl lg:text-3xl font-semibold text-[#0047CC]">
        {isText ? value : (value as number).toLocaleString()}
      </p>
      <h3 className="text-sm font-[400] text-[#666666] ">{title}</h3>
    </div>
  );
}

export default MapComponent;