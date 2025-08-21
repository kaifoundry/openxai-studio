'use client'
import React from 'react'

import Image from 'next/image'
import { useRouter } from "next/navigation";

import deploymentsData from '@/utils/deployments-data.json'

export default function DeploymentPage() {
  const router = useRouter();
  const { summaryData, marketplaceEntries, personalServers } = deploymentsData as any
  const handleClick = (id: string) => {
    router.push(`/app-store/${id}?deploy=true`);
  };

  return (
    <div className="container mx-auto md:p-6 px-2">

      <section className="mb-8">
        <h2 className="md:text-xl text-lg lg:text-2xl font-bold text-gray-900 mb-6">Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryData.map((item, index) => (
            <div key={index} className="bg-[#F5F8FF] border border-[#EBEBEB] rounded-[16px]">
              <div className="p-6">
                <div className="text-xl  md:text-2xl lg:text-4xl bold text-[#0047CC]">{item.value}</div>
                <div className="text-sm text-[#666666] mt-2">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>


      <section className="mb-8">
        <h2 className=" md:text-xl text-lg lg:text-2xl font-bold text-gray-900 mb-6">
          Your Marketplace Entries ({marketplaceEntries.length})
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {marketplaceEntries.map((entry) => (
            <React.Fragment key={entry.id}>
              <div className="relative">
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
                          className="transition-transform  duration-1000 group-hover:scale-110 group-hover:-translate-x-5  relative z-20 h-[190px] md:h-[150px] lg:h-[150px] xl:h-[170px] 2xl:h-[190px] w-full rounded-xl  ease-in-out 3xl:h-[235px]"
                        />
                      </div>

                    </div>

                    {/* Content with 3D effect */}
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
                      <div className="space-y-2 mb-4 px-4 mt-4">
                        <div className="text-sm text-[#525252]">
                          Staking revenue <span className="font-semibold text-[#141414]">{entry.stakingRevenue}</span>
                        </div>
                        <div className="text-sm text-gray-700">
                          Marketplace revenue <span className="font-semibold">{entry.marketplaceRevenue}</span>
                        </div>
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


              </div>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Your personal servers */}
      <section className="mb-8">
        <h2 className="md:text-xl text-lg lg:text-2xl font-bold text-gray-900 mb-6">
          Your personal servers ({personalServers.length})
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {personalServers.map((server, index) => (
            <div key={server.id} className="border-[1px] border-[#EBEBEB] rounded-[12px]">
              <div className="md:p-6 p-2">


                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-3">
                  <div className="flex items-start gap-3">

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


                  {server.expiringIn && (
                    <div className="bg-[#FBEFEF] text-[#C73A3A] px-3 py-1 rounded-lg flex items-center gap-2">
                      <div className="w-4 h-4 border-[1px] border-[#C73A3A] rounded-full flex items-center justify-center">
                        <span className="text-[#C73A3A] text-xs ">i</span>
                      </div>
                      <span className="text-sm font-medium">Expiring in {server.expiringIn} days!</span>
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-700 mb-6">
                  Staking revenue <span className="font-bold text-gray-900">{server.stakingRevenue}</span>
                </div>

                {/* CPU  */}
                <div className=' border-[#EBEBEB] p-2 border-[1px] rounded-[12px]'>
                  <div className="space-y-2 mb-4 ">
                    <div className="text-sm text-gray-700 font-medium">CPU Usage</div>
                    <div className="flex gap-1">
                      {[...Array(7)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-8 h-6  ${i < Math.ceil((server.cpuUsage / 100) * 7) ? 'bg-[#56A23A]' : 'bg-gray-200'
                            }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* memory  */}
                  <div className="space-y-2 mb-4">
                    <div className="text-sm text-gray-700 font-medium">Memory Usage</div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-[#EBF2FF] rounded-full h-2">
                        <div
                          className="bg-[#0059FF] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(server.memoryUsage / server.memoryTotal) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-500">
                        {server.memoryUsage}GB/{server.memoryTotal}GB
                      </span>
                    </div>
                  </div>

                  {/* disk */}
                  <div className="space-y-2">
                    <div className="text-sm text-gray-700 font-medium">Disk Usage</div>
                    <div className="text-sm text-gray-700 mb-2">Disk 0</div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(server.diskUsage / server.diskTotal) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-500">
                        {server.diskUsage}GB/{server.diskTotal}GB
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
