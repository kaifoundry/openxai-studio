"use client";
import React, { useState, useRef, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DeployedApps from "./DeployedApps";
import UnDeployedApps from "./UnDeployedApps";
const UserModelInfo = () => {
  const [activeTab, setActiveTab] = useState("deployed");
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const tabData = [
    { value: "deployed", label: "Deployed Apps" },
    // { value: "undeployed", label: "Undeployed Apps" },
  ];

  useEffect(() => {
    const el = tabRefs.current[activeTab];
    if (el) {
      setIndicatorStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
      });
    }
  }, [activeTab]);

  return (
    <div className="w-full p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
     
        <div className="relative border-b border-gray-300">
          <TabsList className="flex w-full bg-transparent justify-start relative">
            {tabData.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                ref={(el) => {
                  tabRefs.current[tab.value] = el;
                }}
                className={`relative flex justify-start text-left text-[16px] 3xl:text-[20px] font-[400] text-[#697586] 
                  data-[state=active]:text-[#004EEB] data-[state=active]:text-left data-[state=active]:shadow-none `}
              >
                {tab.label}
              </TabsTrigger>
            ))}
            <span
              className="absolute bottom-0 h-[2px] bg-[#004EEB] transition-all duration-300 ease-in-out"
              style={indicatorStyle}
            />
          </TabsList>
        </div>

        <TabsContent value="deployed" className="mt-6">
          <DeployedApps/>
        </TabsContent>

        <TabsContent value="undeployed" className="mt-6">
          <UnDeployedApps/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserModelInfo;
