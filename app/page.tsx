// 'use client'

// import { useMemo } from 'react'
// import Link from 'next/link'
// import { ArrowRight, Earth, Rocket, Triangle } from 'lucide-react'
// import {
//   Label,
//   PolarAngleAxis,
//   PolarGrid,
//   PolarRadiusAxis,
//   RadialBar,
//   RadialBarChart,
// } from 'recharts'

// import { ChartContainer } from '@/components/ui/chart'

// export default function Home() {
//   const { data: activeDeployments } = { data: 22652 * 0.67 }
//   const { data: deploymentStock } = { data: 22652 * (1 - 0.67) }
//   const { data: dailyDeployments } = {
//     data: Array.from({ length: 30 }).map((_) =>
//       Math.round(Math.random() * 100)
//     ),
//   }
//   const maxDailyDeploymentCount = useMemo(() => {
//     return Math.max(...dailyDeployments)
//   }, [dailyDeployments])

//   return (
//     <div className="flex size-full flex-col lg:flex-row">
//       <div className="flex flex-col gap-8 px-4 py-8 sm:gap-16 sm:px-8 md:gap-24 md:px-12 lg:gap-32 lg:px-16">

//         <div className="mt-8 sm:mt-16 lg:mt-24">
//           <h1 className="text-balance text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
//             Build and deploy AI agents in 5 minutes
//           </h1>
//           <div className="mt-6 flex flex-row gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4 lg:mt-12">
//             <Link
//               href="/app-store"
//               className="flex h-12 items-center justify-center rounded-2xl bg-primary px-8 text-lg font-medium text-background transition-colors hover:bg-primary/90 sm:h-14 sm:px-10 lg:px-12 lg:text-xl"
//             >
//               Build Now
//             </Link>
//             <Link
//               href="https://docs.openxai.org"
//               target="_blank"
//               className="flex h-12 items-center justify-center gap-2 rounded-lg px-4 font-medium text-blue-600 transition-colors hover:bg-foreground/10 sm:h-14 sm:px-6"
//             >
//               <span>Quick guide</span>
//               <ArrowRight className="size-4" />
//             </Link>
//           </div>
//         </div>


//         <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 lg:gap-8">
//           <div className="flex place-content-center border-r border-gray-400 py-2 sm:py-3">
//             <div className="flex flex-col place-items-center">
//               <div className="flex place-content-start">
//                 <span className="text-2xl font-medium sm:text-3xl lg:text-4xl">{'>'}50</span>
//                 <span className="text-sm sm:text-base lg:text-lg">K</span>
//               </div>
//               <span className="text-xs text-center sm:text-sm">Transaction /s</span>
//             </div>
//           </div>
//           <div className="flex place-content-center border-r border-gray-400 py-2 sm:py-3">
//             <div className="flex flex-col place-items-center">
//               <div className="flex place-content-start">
//                 <span className="text-2xl font-medium sm:text-3xl lg:text-4xl">600</span>
//                 <span className="text-sm sm:text-base lg:text-lg">ms</span>
//               </div>
//               <span className="text-xs text-center sm:text-sm">Time to Finality (avg)</span>
//             </div>
//           </div>
//           <div className="flex place-content-center border-r border-gray-400 py-2 sm:py-3 sm:border-r-0 lg:border-r">
//             <div className="flex flex-col place-items-center">
//               <div className="flex place-content-start">
//                 <span className="text-2xl font-medium sm:text-3xl lg:text-4xl">{'>'}50</span>
//                 <span className="text-sm sm:text-base lg:text-lg">K</span>
//               </div>
//               <span className="text-xs text-center sm:text-sm">Transaction /s</span>
//             </div>
//           </div>
//           <div className="flex place-content-center py-2 sm:py-3">
//             <div className="flex flex-col place-items-center">
//               <div className="flex place-content-start">
//                 <span className="text-2xl font-medium sm:text-3xl lg:text-4xl">600</span>
//                 <span className="text-sm sm:text-base lg:text-lg">ms</span>
//               </div>
//               <span className="text-xs text-center sm:text-sm">Time to Finality (avg)</span>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:gap-12 pb-10">
//           <div className="flex place-content-center border-b border-gray-400 pb-6 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-6 lg:pr-8">
//             <div className="flex place-items-center gap-3 sm:gap-4 lg:gap-6">
//               <div>
//                 <ChartContainer
//                   config={{
//                     data: {
//                       color: 'hsl(var(--primary))',
//                     },
//                   }}
//                   className="size-[60px] sm:size-[75px] lg:size-[90px]"
//                 >
//                   <RadialBarChart
//                     accessibilityLayer
//                     data={[
//                       {
//                         data: Math.round(
//                           (100 * activeDeployments) /
//                           (activeDeployments + deploymentStock)
//                         ),
//                         fill: 'hsl(var(--primary))',
//                       },
//                     ]}
//                     startAngle={90}
//                     endAngle={-270}
//                     innerRadius={30}
//                     outerRadius={25}
//                   >
//                     <PolarAngleAxis
//                       type="number"
//                       domain={[0, 100]}
//                       angleAxisId={0}
//                       tick={false}
//                     />
//                     <PolarGrid
//                       gridType="circle"
//                       radialLines={false}
//                       stroke="none"
//                       className="first:fill-[#EBF2FF] last:fill-[#FFFFFF]"
//                       polarRadius={[28, 25]}
//                     />
//                     <PolarRadiusAxis
//                       angle={90}
//                       domain={[0, 100]}
//                       tick={false}
//                       axisLine={false}
//                     />
//                     <RadialBar dataKey="data" cornerRadius={2} />
//                     <PolarRadiusAxis
//                       tick={false}
//                       tickLine={false}
//                       axisLine={false}
//                     >
//                       <Label
//                         content={({ viewBox }) => {
//                           if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
//                             return (
//                               <text
//                                 x={viewBox.cx}
//                                 y={viewBox.cy}
//                                 textAnchor="middle"
//                                 dominantBaseline="middle"
//                               >
//                                 <tspan
//                                   x={viewBox.cx}
//                                   y={viewBox.cy}
//                                   className="fill-foreground font-mono text-lg font-bold sm:text-xl lg:text-2xl"
//                                 >
//                                   {(
//                                     (100 * activeDeployments) /
//                                     (activeDeployments + deploymentStock)
//                                   ).toFixed(0)}
//                                   %
//                                 </tspan>
//                               </text>
//                             )
//                           }
//                         }}
//                       />
//                     </PolarRadiusAxis>
//                   </RadialBarChart>
//                 </ChartContainer>
//               </div>
//               <div className="flex flex-col place-content-center">
//                 <span className="text-lg font-semibold sm:text-xl lg:text-2xl">
//                   {(activeDeployments + deploymentStock).toLocaleString(
//                     'en-US'
//                   )}
//                 </span>
//                 <span className="text-xs text-muted-foreground sm:text-sm">
//                   Network Capacity
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="flex place-content-center pt-6 sm:pt-0 sm:pl-6 lg:pl-8">
//             <div className="flex place-items-center gap-3 sm:gap-4 lg:gap-6">
//               <div className="grid size-16 grid-cols-3 gap-0.5 sm:size-18 lg:size-20">
//                 {dailyDeployments.map((deploymentCount, i) => (
//                   <div
//                     key={i}
//                     style={{
//                       backgroundColor: `hsla(219, 100%, 50%, ${(0.1 + 0.9 * (deploymentCount / maxDailyDeploymentCount)).toFixed(2)})`,
//                     }}
//                   />
//                 ))}
//               </div>
//               <div className="flex flex-col place-content-center">
//                 <div className="flex place-items-center gap-2 text-lg sm:gap-3 sm:text-xl lg:gap-4 lg:text-2xl">
//                   <span className="font-semibold">324</span>
//                   <div className="flex place-items-center gap-1 text-green-600">
//                     <Triangle className="size-3 fill-green-600 sm:size-4" />
//                     <span>300%</span>
//                   </div>
//                 </div>
//                 <span className="text-xs text-muted-foreground sm:text-sm">
//                   30 Days Deployments
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>


//       <div className="flex w-full place-content-center place-items-center px-4 py-8 lg:px-8">
//         <Earth className="size-[200px] sm:size-[300px] md:size-[400px] lg:size-[500px] xl:size-[600px] 2xl:size-[700px]" />
//       </div>
//     </div>
//   )
// }

// 'use client'

// import { useMemo } from 'react'
// import Link from 'next/link'
// import { ArrowRight, Earth, Rocket, Triangle } from 'lucide-react'
// import {
//   Label,
//   PolarAngleAxis,
//   PolarGrid,
//   PolarRadiusAxis,
//   RadialBar,
//   RadialBarChart,
// } from 'recharts'
// import { motion } from 'framer-motion'

// import { ChartContainer } from '@/components/ui/chart'

// export default function Home() {
//   const { data: activeDeployments } = { data: 22652 * 0.67 }
//   const { data: deploymentStock } = { data: 22652 * (1 - 0.67) }
//   const { data: dailyDeployments } = {
//     data: Array.from({ length: 30 }).map((_) =>
//       Math.round(Math.random() * 100)
//     ),
//   }
//   const maxDailyDeploymentCount = useMemo(() => {
//     return Math.max(...dailyDeployments)
//   }, [dailyDeployments])

//   return (
//     <motion.div
//       className="flex size-full flex-col lg:flex-row"
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8, ease: 'easeOut' }}
//     >
//       <div className="flex flex-col gap-8 px-4 py-8 sm:gap-16 sm:px-8 md:gap-24 md:px-12 lg:gap-32 lg:px-16">
//         <div className="mt-8 sm:mt-16 lg:mt-24">
//           <h1 className="text-balance text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
//             Build and deploy AI agents in 5 minutes
//           </h1>
//           <div className="mt-6 flex flex-row gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4 lg:mt-12">
//             <Link
//               href="/app-store"
//               className="flex h-12 items-center justify-center rounded-2xl bg-primary px-8 text-lg font-medium text-background transition-colors hover:bg-primary/90 sm:h-14 sm:px-10 lg:px-12 lg:text-xl"
//             >
//               Build Now
//             </Link>
//             <Link
//               href="https://docs.openxai.org"
//               target="_blank"
//               className="flex h-12 items-center justify-center gap-2 rounded-lg px-4 font-medium text-blue-600 transition-colors hover:bg-foreground/10 sm:h-14 sm:px-6"
//             >
//               <span>Quick guide</span>
//               <ArrowRight className="size-4" />
//             </Link>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 lg:gap-8">
//           <div className="flex place-content-center border-r border-gray-400 py-2 sm:py-3">
//             <div className="flex flex-col place-items-center">
//               <div className="flex place-content-start">
//                 <span className="text-2xl font-medium sm:text-3xl lg:text-4xl">{'>'}50</span>
//                 <span className="text-sm sm:text-base lg:text-lg">K</span>
//               </div>
//               <span className="text-xs text-center sm:text-sm">Transaction /s</span>
//             </div>
//           </div>
//           <div className="flex place-content-center border-r border-gray-400 py-2 sm:py-3">
//             <div className="flex flex-col place-items-center">
//               <div className="flex place-content-start">
//                 <span className="text-2xl font-medium sm:text-3xl lg:text-4xl">600</span>
//                 <span className="text-sm sm:text-base lg:text-lg">ms</span>
//               </div>
//               <span className="text-xs text-center sm:text-sm">Time to Finality (avg)</span>
//             </div>
//           </div>
//           <div className="flex place-content-center border-r border-gray-400 py-2 sm:py-3 sm:border-r-0 lg:border-r">
//             <div className="flex flex-col place-items-center">
//               <div className="flex place-content-start">
//                 <span className="text-2xl font-medium sm:text-3xl lg:text-4xl">{'>'}50</span>
//                 <span className="text-sm sm:text-base lg:text-lg">K</span>
//               </div>
//               <span className="text-xs text-center sm:text-sm">Transaction /s</span>
//             </div>
//           </div>
//           <div className="flex place-content-center py-2 sm:py-3">
//             <div className="flex flex-col place-items-center">
//               <div className="flex place-content-start">
//                 <span className="text-2xl font-medium sm:text-3xl lg:text-4xl">600</span>
//                 <span className="text-sm sm:text-base lg:text-lg">ms</span>
//               </div>
//               <span className="text-xs text-center sm:text-sm">Time to Finality (avg)</span>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:gap-12 pb-10">
//           <div className="flex place-content-center border-b border-gray-400 pb-6 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-6 lg:pr-8">
//             <div className="flex place-items-center gap-3 sm:gap-4 lg:gap-6">
//               <div>
//                 <ChartContainer
//                   config={{
//                     data: {
//                       color: 'hsl(var(--primary))',
//                     },
//                   }}
//                   className="size-[60px] sm:size-[75px] lg:size-[90px]"
//                 >
//                   <RadialBarChart
//                     accessibilityLayer
//                     data={[
//                       {
//                         data: Math.round(
//                           (100 * activeDeployments) /
//                             (activeDeployments + deploymentStock)
//                         ),
//                         fill: 'hsl(var(--primary))',
//                       },
//                     ]}
//                     startAngle={90}
//                     endAngle={-270}
//                     innerRadius={30}
//                     outerRadius={25}
//                   >
//                     <PolarAngleAxis
//                       type="number"
//                       domain={[0, 100]}
//                       angleAxisId={0}
//                       tick={false}
//                     />
//                     <PolarGrid
//                       gridType="circle"
//                       radialLines={false}
//                       stroke="none"
//                       className="first:fill-[#EBF2FF] last:fill-[#FFFFFF]"
//                       polarRadius={[28, 25]}
//                     />
//                     <PolarRadiusAxis
//                       angle={90}
//                       domain={[0, 100]}
//                       tick={false}
//                       axisLine={false}
//                     />
//                     <RadialBar dataKey="data" cornerRadius={2} />
//                     <PolarRadiusAxis
//                       tick={false}
//                       tickLine={false}
//                       axisLine={false}
//                     >
//                       <Label
//                         content={({ viewBox }) => {
//                           if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
//                             return (
//                               <text
//                                 x={viewBox.cx}
//                                 y={viewBox.cy}
//                                 textAnchor="middle"
//                                 dominantBaseline="middle"
//                               >
//                                 <tspan
//                                   x={viewBox.cx}
//                                   y={viewBox.cy}
//                                   className="fill-foreground font-mono text-lg font-bold sm:text-xl lg:text-2xl"
//                                 >
//                                   {(
//                                     (100 * activeDeployments) /
//                                     (activeDeployments + deploymentStock)
//                                   ).toFixed(0)}
//                                   %
//                                 </tspan>
//                               </text>
//                             )
//                           }
//                         }}
//                       />
//                     </PolarRadiusAxis>
//                   </RadialBarChart>
//                 </ChartContainer>
//               </div>
//               <div className="flex flex-col place-content-center">
//                 <span className="text-lg font-semibold sm:text-xl lg:text-2xl">
//                   {(activeDeployments + deploymentStock).toLocaleString(
//                     'en-US'
//                   )}
//                 </span>
//                 <span className="text-xs text-muted-foreground sm:text-sm">
//                   Network Capacity
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="flex place-content-center pt-6 sm:pt-0 sm:pl-6 lg:pl-8">
//             <div className="flex place-items-center gap-3 sm:gap-4 lg:gap-6">
//               <div className="grid size-16 grid-cols-3 gap-0.5 sm:size-18 lg:size-20">
//                 {dailyDeployments.map((deploymentCount, i) => (
//                   <div
//                     key={i}
//                     style={{
//                       backgroundColor: `hsla(219, 100%, 50%, ${(0.1 + 0.9 * (deploymentCount / maxDailyDeploymentCount)).toFixed(2)})`,
//                     }}
//                   />
//                 ))}
//               </div>
//               <div className="flex flex-col place-content-center">
//                 <div className="flex place-items-center gap-2 text-lg sm:gap-3 sm:text-xl lg:gap-4 lg:text-2xl">
//                   <span className="font-semibold">324</span>
//                   <div className="flex place-items-center gap-1 text-green-600">
//                     <Triangle className="size-3 fill-green-600 sm:size-4" />
//                     <span>300%</span>
//                   </div>
//                 </div>
//                 <span className="text-xs text-muted-foreground sm:text-sm">
//                   30 Days Deployments
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="flex w-full place-content-center place-items-center px-4 py-8 lg:px-8">
//         <Earth className="size-[200px] sm:size-[300px] md:size-[400px] lg:size-[500px] xl:size-[600px] 2xl:size-[700px]" />
//       </div>
//     </motion.div>
//   )
// }
'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { ArrowRight, Earth, Rocket, Triangle } from 'lucide-react'
import {
  Label,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from 'recharts'
import { motion } from 'framer-motion'

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
      className="flex size-full flex-col lg:flex-row "
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="flex flex-col gap-8 px-4 py-8 sm:gap-16 sm:px-8 md:gap-24 md:px-12 lg:gap-24 lg:px-16">
        <div className="mt-8 sm:mt-16 lg:mt-24">
          <h1 className="text-balance text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl ">
            Build and deploy AI agents in 5 minutes
          </h1>
          <div className="mt-6 flex flex-row gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4 lg:mt-12">
            <Link
              href="/app-store"
              className="flex h-12 items-center justify-center rounded-2xl bg-primary px-8 text-lg font-medium text-background transition-colors hover:bg-primary/90 sm:h-14 sm:px-10 lg:px-12 lg:text-xl"
            >
              Build Now
            </Link>
            <Link
              href="https://docs.openxai.org"
              target="_blank"
              className="flex h-12 items-center justify-center gap-2 rounded-lg px-4 font-medium text-blue-600 transition-colors hover:bg-foreground/10 sm:h-14 sm:px-6"
            >
              <span>Quick guide</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 lg:gap-8">
          <div className="flex place-content-center border-r border-gray-400 py-2 sm:py-3">
            <div className="flex flex-col place-items-center">
              <div className="flex place-content-start">
                <span className="text-2xl font-medium sm:text-3xl lg:text-4xl">{'>'}50</span>
                <span className="text-sm sm:text-base lg:text-lg">K</span>
              </div>
              <span className="text-xs text-center sm:text-sm">Transaction /s</span>
            </div>
          </div>
          <div className="flex place-content-center border-r border-gray-400 py-2 sm:py-3">
            <div className="flex flex-col place-items-center">
              <div className="flex place-content-start">
                <span className="text-2xl font-medium sm:text-3xl lg:text-4xl">600</span>
                <span className="text-sm sm:text-base lg:text-lg">ms</span>
              </div>
              <span className="text-xs text-center sm:text-sm">Time to Finality (avg)</span>
            </div>
          </div>
          <div className="flex place-content-center border-r border-gray-400 py-2 sm:py-3 sm:border-r-0 lg:border-r">
            <div className="flex flex-col place-items-center">
              <div className="flex place-content-start">
                <span className="text-2xl font-medium sm:text-3xl lg:text-4xl">{'>'}50</span>
                <span className="text-sm sm:text-base lg:text-lg">K</span>
              </div>
              <span className="text-xs text-center sm:text-sm">Transaction /s</span>
            </div>
          </div>
          <div className="flex place-content-center py-2 sm:py-3">
            <div className="flex flex-col place-items-center">
              <div className="flex place-content-start">
                <span className="text-2xl font-medium sm:text-3xl lg:text-4xl">600</span>
                <span className="text-sm sm:text-base lg:text-lg">ms</span>
              </div>
              <span className="text-xs text-center sm:text-sm">Time to Finality (avg)</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:gap-12 pb-10">
          <div className="flex place-content-center border-b border-gray-400 pb-6 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-6 lg:pr-8">
            <div className="flex place-items-center gap-3 sm:gap-4 lg:gap-6">
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
          <div className="flex place-content-center pt-6 sm:pt-0 sm:pl-6 lg:pl-8">
            <div className="flex place-items-center gap-3 sm:gap-4 lg:gap-6">
              <div className="grid size-16 grid-cols-3 gap-0.5 sm:size-18 lg:size-20">
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

      <div className="flex w-full place-content-center place-items-center px-4 py-8 lg:px-8">
        <Earth className="size-[200px] md:size-[400px] lg:size-[500px] xl:size-[600px] 2xl:size-[700px]" />
      </div>
    </motion.div>
  )
}