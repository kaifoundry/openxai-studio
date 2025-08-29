
'use client'

import { useMemo } from 'react'
import Lottie from "lottie-react";
import Link from 'next/link'
import { ArrowRight, Triangle } from 'lucide-react'

import {
  Label,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from 'recharts'
import { motion } from 'framer-motion'
import Image from "next/image";
import { ChartContainer } from '@/components/ui/chart'

export default function Home() {
  const { data: activeDeployments } = { data: 22652 * 0.67 }
  const { data: deploymentStock } = { data: 22652 * (1 - 0.67) }
  const { data: dailyDeployments } = {
    data: Array.from({ length: 30 }).map((_) =>
      Math.round(Math.random() * 100)
    ),
  }
  const maxDailyDeploymentCount = useMemo(() => {
    return Math.max(...dailyDeployments)
  }, [dailyDeployments])

  return (
    <motion.div
      className="grid size-full grid-cols-1 xl:grid-cols-[1fr_1fr] lg:grid-cols-[2fr_1fr] "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="flex flex-col gap-8 px-4 py-8 sm:gap-16 sm:px-8  md:gap-24 md:px-12 lg:gap-24  lg:px-8 2xl:px-16 ">
        <div className="mt-8 sm:mt-16 lg:mt-12  ">
          <h1 className="text-[43px]  leading-tight lg:leading-none font-semibold lg:text-[2.9rem] xl:text-[4rem]">
            Build and deploy AI agents in 5 minutes
          </h1>

          <div className="mt-6 flex flex-row gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4 lg:mt-12">
            <Link
              href="/app-store"
              className="flex h-12 items-center whitespace-nowrap justify-center rounded-full bg-primary px-8 text-lg font-medium text-background transition-colors hover:bg-primary/90 sm:h-14 sm:px-10 lg:px-12 lg:text-lg xl:text-xl"
            >
              Build Now
            </Link>
            <Link
              href="https://docs.openxai.org"
              target="_blank"
              className="flex h-12 items-center justify-center gap-2 rounded-lg whitespace-nowrap px-4 font-medium text-blue-600 transition-colors hover:bg-foreground/10 sm:h-14 sm:px-6"
            >
              <span>Quick guide</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="flex w-full justify-center items-center px-4 pt-4 lg:hidden  ">
            <Image
              src="/globe-unscreen.gif"
              alt="Earth"
              width={400}
              height={400}
              className="size-[400px] sm:size-[400px] md:size-[400px] "
              draggable={false}
            />
          </div>
        </div>

        <div className="grid grid-cols-2  md:grid-cols-4  w-full  3xl:w-[80%] md:w-full gap-4 lg:gap-0 py-4 lg:py-0 ">
          <div className="flex w-full justify-center   border-gray-300 border-r-2 py-2 px-5 lg:px-2 xl:px-5">

            <div className="flex flex-col ">
              <div className="flex  ">
                <span className="text-xl font-medium xl:text-3xl lg:text-xl  3xl:text-4xl">{'>'}50</span>
                <span className="text-sm  lg:text-[12px]">K</span>
              </div>
              <span className="text-[10px] font-semibold xl:text-[12px]">Transaction /s</span>
            </div>
          </div>
          <div className="flex justify-center items-center  lg:border-r-2 md:border-r-2 border-gray-300 py-2   px-5 lg:px-2 xl:px-5">
            <div className="flex flex-col   ">
              <div className="flex  justify-center ">
                <span className="text-xl font-medium xl:text-3xl lg:text-xl  3xl:text-4xl">600</span>
                <span className="text-sm  lg:text-[12px]">ms</span>
              </div>
              <span className="text-[10px] font-semibold xl:text-[12px]  text-center">Time to Finality (avg)</span>
            </div>
          </div>
          <div className="flex w-full justify-center   border-gray-300 border-r-2 py-2 px-5 lg:px-2 xl:px-5">

            <div className="flex flex-col ">
              <div className="flex  ">
                <span className="text-xl font-medium xl:text-3xl lg:text-xl  3xl:text-4xl">{'>'}50</span>
                <span className="text-sm  lg:text-[12px]">K</span>
              </div>
              <span className="text-[10px] font-semibold xl:text-[12px]">Transaction /s</span>
            </div>
          </div>
          <div className="flex justify-center items-center py-2 px-5 lg:px-2 xl:px-5">
            <div className="flex flex-col ">
              <div className="flex justify-center ">
                <span className="text-xl font-medium xl:text-3xl lg:text-xl  3xl:text-4xl">600</span>
                <span className="text-sm  lg:text-[12px]">ms</span>
              </div>
              <span className="text-[10px] font-semibold xl:text-[12px]  text-center ">Time to Finality (avg)</span>
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2  lg:justify-start   lg:px-0 px-4  items-center w-full  2xl:w-[90%]  3xl:w-[60%] pb-10">
          <div className="flex justify-start  items-center border-gray-300 pb-6   border-b-2 lg:border-b-0 lg:border-r-2  ">
            <div className="flex justify-between lg:justify-center  lg:pr-4 lg:place-items-center gap-2 w-full   lg:gap-6">
              <div>
                <ChartContainer
                  config={{
                    data: {
                      color: 'hsl(var(--primary))',
                    },
                  }}
                  className="size-[60px] sm:size-[75px] lg:size-[90px]"
                >
                  <RadialBarChart
                    accessibilityLayer
                    data={[
                      {
                        data: Math.round(
                          (100 * activeDeployments) /
                          (activeDeployments + deploymentStock)
                        ),
                        fill: 'hsl(var(--primary))',
                      },
                    ]}
                    startAngle={90}
                    endAngle={-270}
                    innerRadius={30}
                    outerRadius={25}
                  >
                    <PolarAngleAxis
                      type="number"
                      domain={[0, 100]}
                      angleAxisId={0}
                      tick={false}
                    />
                    <PolarGrid
                      gridType="circle"
                      radialLines={false}
                      stroke="none"
                      className="first:fill-[#EBF2FF] last:fill-[#FFFFFF]"
                      polarRadius={[28, 25]}
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      tick={false}
                      axisLine={false}
                    />
                    <RadialBar dataKey="data" cornerRadius={2} />
                    <PolarRadiusAxis
                      tick={false}
                      tickLine={false}
                      axisLine={false}
                    >
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  className="fill-foreground font-mono text-lg font-bold sm:text-xl lg:text-2xl"
                                >
                                  {(
                                    (100 * activeDeployments) /
                                    (activeDeployments + deploymentStock)
                                  ).toFixed(0)}
                                  %
                                </tspan>
                              </text>
                            )
                          }
                        }}
                      />
                    </PolarRadiusAxis>
                  </RadialBarChart>
                </ChartContainer>
              </div>
              <div className="flex flex-col place-content-center">
                <span className="text-lg font-semibold sm:text-xl lg:text-2xl">
                  {(activeDeployments + deploymentStock).toLocaleString(
                    'en-US'
                  )}
                </span>
                <span className="text-xs text-muted-foreground sm:text-sm">
                  Network Capacity
                </span>
              </div>
            </div>
          </div>
          <div className="flex pt-6 lg:pt-0   pl-3 lg:pl-8">
            <div className="flex justify-between lg:justify-center w-full gap-3 sm:gap-4 lg:gap-6">
              <div className="grid size-12 grid-cols-3 gap-0.5  lg:size-20">
                {dailyDeployments.map((deploymentCount, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: `hsla(219, 100%, 50%, ${(0.1 + 0.9 * (deploymentCount / maxDailyDeploymentCount)).toFixed(2)})`,
                    }}
                  />
                ))}
              </div>
              <div className="flex flex-col place-content-center">
                <div className="flex place-items-center gap-2 text-lg sm:gap-3 sm:text-xl lg:gap-4 lg:text-2xl">
                  <span className="font-semibold">324</span>
                  <div className="flex place-items-center gap-1 text-green-600">
                    <Triangle className="size-3 fill-green-600 sm:size-4" />
                    <span>300%</span>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground sm:text-sm">
                  30 Days Deployments
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex w-full h-full place-content-center place-items-center px-4 pb-8 lg:px-8">
        <Image
          src="/globe-unscreen.gif"
          alt="Earth"
          width={800}
          height={800}
          className="w-full h-full lg:w-[350px] lg:h-[350px] xl:h-[500px] xl:w-[500px] 2xl:h-[700px] 2xl:w-[700px] max-w-[800px] max-h-[800px]"
          draggable={false}
        />
      </div>

      {/* <div className="flex w-full h-screen place-content-center place-items-center px-4 py-8 lg:px-8">
      <Lottie
        animationData={globeAnimation}
        loop={true}
        className="w-full h-full max-w-[1000px]"
      />
    </div> */}

    </motion.div>
  )
}