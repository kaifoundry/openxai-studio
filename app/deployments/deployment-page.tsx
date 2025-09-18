'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from "next/navigation";

import deploymentsData from '@/utils/deployments-data.json'
import { mockXNodes } from '@/config/demo-mode';
export default function DeploymentPage() {
  const router = useRouter();
  const { summaryData, marketplaceEntries, undeploymentData, personalServers } = deploymentsData as any
  const handleClick = (id: string) => {
    router.push(`/app-store/${id}?deploy=true`);
  };

  const formatGB = (mb: number | undefined): string => {
    if (!mb || mb <= 0) return '0'
    return (mb / 1024).toFixed(2)
  }

  return (
    <div className=" mx-auto md:p-6 px-2">
      {/* Summary */}
      <section className="mb-8">
        <motion.h2 initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="md:text-xl text-lg lg:text-2xl font-bold text-gray-900 mb-6">Summary</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryData.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
              viewport={{ once: true }}

              key={index} className="bg-[#F5F8FF] border border-[#EBEBEB] rounded-[16px]">
              <div className="p-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 + 0.1 }}
                  viewport={{ once: true }}
                  className="text-xl  md:text-2xl lg:text-4xl bold text-[#0047CC]">{item.value}</motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 + 0.15 }}
                  viewport={{ once: true }}
                  className="text-sm text-[#666666] mt-2">{item.label}</motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Marketplace */}
      <section className="mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          viewport={{ once: true }}
          className=" md:text-xl text-lg lg:text-2xl font-bold text-gray-900 mb-6">
          Your Marketplace Entries ({marketplaceEntries.length})
        </motion.h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {marketplaceEntries.map((entry) => (
            <div key={entry.id}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.25 }}
                viewport={{ once: true }}
                className="relative">

                <div className="my-2 flex cursor-pointer  flex-col justify-center rounded-xl bg-[#F6FAFF] p-2 
                                        perspective-1000"
                  style={{ transformStyle: 'preserve-3d' }}
                  onClick={() => handleClick("0")}
                >

                  <div className="transform-style-preserve-3d group transition-all duration-500 ease-in-out 
                                           hover:rotate-x-[10deg] hover:rotate-y-[10deg] hover:translate-z-10">

                    <div className="relative rounded-xl">
                      <div
                        className="absolute inset-0 z-0 h-[245px] w-full p-2 opacity-50 3xl:h-[275px]"
                        style={{
                          backgroundImage: `url(${entry.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          filter: 'blur(40px)',
                          transform: 'scale(0.8)',
                        }}
                      />
                      <div className='overflow-hidden rounded-xl'>
                        <Image
                          src={entry.image || ''}
                          alt="title"
                          width={390}
                          height={235}
                          priority={true}
                          blurDataURL={entry.image}
                          className="transition-transform  duration-1000 group-hover:scale-105  relative z-20 h-[190px] md:h-[150px] lg:h-[150px] xl:h-[170px] 2xl:h-[190px] w-full rounded-xl  ease-in-out 3xl:h-[235px]"
                        />
                      </div>

                    </div>


                    <div className="transform-style-preserve-3d">
                      <div className='flex justify-between px-4 pt-4 pb-2'>
                        <div className='flex flex-col gap-0'>
                          <div className='text-[15.08px] font-[600] text-black md:text-[14.08px] xl:text-[16.08px] 2xl:text-[19.08px] 3xl:text-[23.08px]'>
                            {entry.title}
                          </div>
                          <div className='text-[11.39px] font-[400] text-[#918C8C]'>
                            {entry.hashTags?.map((tag, index) => (
                              <span key={index}>#{tag.replace(/^#/, '')} </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          {entry.Seller && entry.Seller.length > 0 && (
                            <Image
                              src={entry.Seller[0].logo || ''}
                              alt="logo"
                              width={36}
                              height={36}
                              className='rounded-full bg-[#73C255]'
                            />
                          )}
                        </div>
                      </div>

                      <div className='flex items-center gap-0 px-2 pt-1 pb-2 lg:pb-0'>
                        {entry.icons?.map((item, index) => (
                          <div key={index} className="relative flex size-[36px] items-center justify-center">
                            <Image
                              src={item?.chain || ''}
                              alt="icon"
                              width={30}
                              height={25}
                              className="h-[25px] w-[30px]"
                            />
                          </div>
                        ))}
                      </div>


                      <div className='flex items-center justify-between px-4 pb-2 2xl:pt-4 3xl:pt-8'>
                        <div className='flex items-center gap-[2vw]'>
                          <div className='flex items-center gap-2 md:gap-2 xl:gap-2 2xl:gap-2 3xl:gap-2'>
                            <div className='text-[14px] font-[500] text-[#1C1C1C]'>{entry.likes}</div>
                            <Image
                              src='/images/appStore/svg/likes.svg'
                              alt='likes'
                              width={19}
                              height={17}
                              className='h-[17px] w-[19px]'
                            />
                          </div>
                          <div className='flex items-center gap-2 md:gap-2 xl:gap-2 2xl:gap-2 3xl:gap-2'>
                            <div className='text-[14px] font-[500] text-[#1C1C1C]'>{entry.users}</div>
                            <Image
                              src='/images/appStore/svg/followers.svg'
                              alt='likes'
                              width={19}
                              height={17}
                              className='h-[17px] w-[19px]'
                            />
                          </div>
                        </div>
                        <div className='flex items-center gap-2 md:gap-1 xl:gap-1 2xl:gap-2 3xl:gap-2'>
                          <span className='text-[18px] font-[500]'>{entry.apy}%</span>
                          <span className='text-[14px] font-[300]'>APY</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


              </motion.div>
            </div>
          ))}
        </div>
      </section>
      {/* Undeployment */}


      <section className="mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          viewport={{ once: true }}
          className=" md:text-xl text-lg lg:text-2xl font-bold text-gray-900 mb-6">
          Your Undeployed Apps ({undeploymentData.length})
        </motion.h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {undeploymentData.map((entry) => (
            <div key={entry.id}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.25 }}
                viewport={{ once: true }}
                className="relative">

                <div className="my-2 flex cursor-pointer  flex-col justify-center rounded-xl bg-[#F6FAFF] p-2 
                                        perspective-1000"
                  style={{ transformStyle: 'preserve-3d' }}
                  onClick={() => handleClick(entry.id)}
                >

                  <div className="transform-style-preserve-3d group transition-all duration-500 ease-in-out 
                                           hover:rotate-x-[10deg] hover:rotate-y-[10deg] hover:translate-z-10">

                    <div className="relative rounded-xl">
                      <div
                        className="absolute inset-0 z-0 h-[245px] w-full p-2 opacity-50 3xl:h-[275px]"
                        style={{
                          backgroundImage: `url(${entry.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          filter: 'blur(40px)',
                          transform: 'scale(0.8)',
                        }}
                      />
                      <div className='overflow-hidden rounded-xl'>
                        <Image
                          src={entry.image || ''}
                          alt="title"
                          width={390}
                          height={235}
                          priority={true}
                          blurDataURL={entry.image}
                          className="transition-transform  duration-1000 group-hover:scale-105  relative z-20 h-[190px] md:h-[150px] lg:h-[150px] xl:h-[170px] 2xl:h-[190px] w-full rounded-xl  ease-in-out 3xl:h-[235px]"
                        />
                      </div>

                    </div>


                    <div className="transform-style-preserve-3d">
                      <div className='flex justify-between px-4 pt-4 pb-2'>
                        <div className='flex flex-col gap-0'>
                          <div className='text-[15.08px] font-[600] text-black md:text-[14.08px] xl:text-[16.08px] 2xl:text-[19.08px] 3xl:text-[23.08px]'>
                            {entry.title}
                          </div>
                          <div className='text-[11.39px] font-[400] text-[#918C8C]'>
                            {entry.hashTags?.map((tag, index) => (
                              <span key={index}>#{tag.replace(/^#/, '')} </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          {entry.Seller && entry.Seller.length > 0 && (
                            <Image
                              src={entry.Seller[0].logo || ''}
                              alt="logo"
                              width={36}
                              height={36}
                              className='rounded-full bg-[#73C255]'
                            />
                          )}
                        </div>
                      </div>

                      <div className='flex items-center gap-0 px-2 pt-1 pb-2 lg:pb-0'>
                        {entry.icons?.map((item, index) => (
                          <div key={index} className="relative flex size-[36px] items-center justify-center">
                            <Image
                              src={item?.chain || ''}
                              alt="icon"
                              width={30}
                              height={25}
                              className="h-[25px] w-[30px]"
                            />
                          </div>
                        ))}
                      </div>


                      <div className='flex items-center justify-between px-4 pb-2 2xl:pt-4 3xl:pt-8'>
                        <div className='flex items-center gap-[2vw]'>
                          <div className='flex items-center gap-2 md:gap-2 xl:gap-2 2xl:gap-2 3xl:gap-2'>
                            <div className='text-[14px] font-[500] text-[#1C1C1C]'>{entry.likes}</div>
                            <Image
                              src='/images/appStore/svg/likes.svg'
                              alt='likes'
                              width={19}
                              height={17}
                              className='h-[17px] w-[19px]'
                            />
                          </div>
                          <div className='flex items-center gap-2 md:gap-2 xl:gap-2 2xl:gap-2 3xl:gap-2'>
                            <div className='text-[14px] font-[500] text-[#1C1C1C]'>{entry.users}</div>
                            <Image
                              src='/images/appStore/svg/followers.svg'
                              alt='likes'
                              width={19}
                              height={17}
                              className='h-[17px] w-[19px]'
                            />
                          </div>
                        </div>
                        <div className='flex items-center gap-2 md:gap-1 xl:gap-1 2xl:gap-2 3xl:gap-2'>
                          <span className='text-[18px] font-[500]'>{entry.apy}%</span>
                          <span className='text-[14px] font-[300]'>APY</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


              </motion.div>
            </div>
          ))}
        </div>
      </section>
      {/* Personal Servers */}
      <section className="mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
          viewport={{ once: true }}

          className="md:text-xl text-lg lg:text-2xl font-bold text-gray-900 mb-6">
          Your personal servers ({personalServers.length})
        </motion.h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
          {mockXNodes.map((server, index) => {
            const ramUsedGB = formatGB(server?.heartbeatData?.ramMbUsed)
            const ramTotalGB = formatGB(server?.heartbeatData?.ramMbTotal)
            const ramUsagePercent = (server?.heartbeatData?.ramMbUsed / server?.heartbeatData?.ramMbTotal) * 100

            const storageUsedGB = formatGB(server?.heartbeatData?.storageMbUsed)
            const storageTotalGB = formatGB(server?.heartbeatData?.storageMbTotal)
            const storageUsagePercent = (server?.heartbeatData?.storageMbUsed / server?.heartbeatData?.storageMbTotal) * 100
            return (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                onClick={() => { router.push(`/xnode?uuid=${server?.id}`) }}
                key={server?.id} className="border-[1px] border-[#EBEBEB] cursor-pointer rounded-[12px]">
                <div className="md:p-6 p-2">


                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-3">
                    <div className="flex items-start gap-3 ">

                      <div className=" rounded flex items-center justify-center">
                        <img src="/images/viewDeployment/xnode.svg" alt="" />
                      </div>


                      <div className='flex flex-col'>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-gray-900">{server.name}</h3>

                          <div className="rounded-full flex items-center justify-center">
                            <img src="/images/viewDeployment/ollama.svg" alt="" />
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 font-mono mb-3">{server.address}</p>
                      </div>
                    </div>


                    {server?.expiringIn && (
                      <div className="bg-[#FBEFEF] text-[#C73A3A] px-3 py-1 rounded-lg flex items-center gap-2  ">
                        <div className="w-4 h-4 border-[1px] border-[#C73A3A] rounded-full flex items-center justify-center">
                          <span className="text-[#C73A3A] text-xs ">i</span>
                        </div>
                        <span className="text-[8px] font-medium">Expiring in {server?.expiringIn} days!</span>
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-700 mb-6">
                    Staking revenue <span className="font-bold text-gray-900">{server?.stakingRevenue}</span>
                  </div>


                  <div className=' border-[#EBEBEB] p-2 border-[1px] rounded-[12px]'>
                    <div className="space-y-2 mb-4 ">
                      <div className="text-sm text-gray-700 font-medium">CPU Usage</div>
                      <div className="flex gap-1">
                        {[...Array(7)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-8 h-6  ${i < Math.ceil((server?.heartbeatData?.cpuPercent / 100) * 7) ? 'bg-[#56A23A]' : 'bg-gray-200'
                              }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="text-sm text-gray-700 font-medium">Memory Usage</div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-[#EBF2FF] rounded-full h-2">
                          <div
                            className="bg-[#0059FF] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${ramUsagePercent}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-500">
                          {ramUsedGB}GB/{ramTotalGB}GB
                        </span>
                      </div>
                    </div>


                    <div className="space-y-2">
                      <div className="text-sm text-gray-700 font-medium">Disk Usage</div>
                      <div className="text-sm text-gray-700 mb-2">Disk 0</div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${storageUsagePercent}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-500">
                          {storageUsedGB}GB/{storageTotalGB}GB
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
