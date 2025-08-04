import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import topseller from '../../utils/topSeller.json'



export const TopSeller = () => {
    return (
        <div className='mx-auto mt-4 flex w-full max-w-md flex-col justify-center gap-8 rounded-xl px-2 pb-10 pt-12 md:px-2 lg:px-4 xl:px-4 2xl:px-6 3xl:px-8'>
            <div className='flex justify-between px-0'>
                <div className='text-[15px] font-[700]  text-[#2C2C2C] md:text-[16px] xl:text-[20px] 2xl:text-[20px] 3xl:text-[24px] '>Top Sellers</div>
                <div className='text-[10px] text-[#70A2FF] md:text-[12px] xl:text-[14px] 2xl:text-[14px] 3xl:text-[16px]'>View all</div>
            </div>
            {topseller.map((item, index) => (
                <div key={index} className='flex  justify-between'>
                    <div className='flex gap-3'>
                        <div>
                            <Image
                                src={item.logo}
                                alt='profile pic'
                                width={48}
                                height={48}
                            />
                        </div>
                        <div className='flex flex-col justify-center '>
                            <div className='text-[12px] font-[700] md:text-[12px] xl:text-[13px] 2xl:text-[14px] 3xl:text-[18px]'>{item.name}</div>
                            <div className='text-[14px] font-[400] text-[#9B9DA0]'>{item.username}</div>
                        </div>
                    </div>
                    <Button className={`flex w-24 cursor-pointer items-center justify-center rounded-lg border py-2 ${item.following ? 'border-blue500 bg-transparent text-blue500' : 'border-blue500 bg-blue500 text-white'} `}>
                        {item.following ? 'Following' : 'Follow'}
                    </Button>
                </div>
            ))}
        </div>
    )
}
