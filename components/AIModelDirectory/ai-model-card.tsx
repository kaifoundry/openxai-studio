"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useNavContext } from '@/contexts/NavContext'

interface cardProps {
    id?: string,
    image?: string,
    title?: string,
    hashTags?: string[],
    logo?: string,
    icons?: { chain?: string }[],
    likes?: number
    followers?: number
    apy?: number
    Seller?: { name: string; logo?: string }[]
    delay?: number
}

const Card = ({ id, image, title, hashTags, logo, icons, likes, followers, apy, Seller, delay }: cardProps) => {
    const router = useRouter();
    const { collapsed } = useNavContext()
    
    const handleClick = () => {
        router.push(`/app-store/${id}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay:delay,duration:0.4 }}
            viewport={{ once: true }}
            className="my-2 flex cursor-pointer  flex-col justify-center rounded-xl bg-[#F6FAFF] p-2 
                        perspective-1000"
            style={{ transformStyle: 'preserve-3d' }}
            onClick={handleClick}
        >

            <div className="transform-style-preserve-3d group transition-all duration-500 ease-in-out 
                           hover:rotate-x-[10deg] hover:rotate-y-[10deg] hover:translate-z-10">

                <div className="relative rounded-xl">
                    <div
                        className="absolute inset-0 z-0 h-[245px] w-full p-2 opacity-50 3xl:h-[275px]"
                        style={{
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'blur(40px)',
                            transform: 'scale(0.8)',
                        }}
                    />
                    <div className={`overflow-hidden rounded-xl aspect-[16/9] `}> 
                        <Image
                            src={image || ''} //max-h-[320px] lg:max-h-[200px] 3xl:max-h-[250px]
                            alt="title"
                            width={390}
                            height={235}
                            priority={true}
                            blurDataURL={image}
                            className="transition-transform  duration-1000 group-hover:scale-105 relative z-20 aspect-[4/3] w-full object-container rounded-xl  ease-in-out "
                        />
                    </div>

                </div>


                <div className="transform-style-preserve-3d">
                    <div className='flex justify-between px-4 pt-4 pb-2'>
                        <div className='flex flex-col gap-0'>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: delay * 0.1 }}
                                viewport={{ once: true }}
                                className='text-[15.08px] font-[600] text-black md:text-[14.08px] xl:text-[16.08px] 2xl:text-[19.08px] 3xl:text-[23.08px]'>
                                {title}
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: delay * 0.15 }}
                                viewport={{ once: true }}
                                className='text-[11.39px] font-[400] text-[#918C8C]'>
                                {hashTags?.map((tag, index) => (
                                    <span key={index}>#{tag.replace(/^#/, '')} </span>
                                ))}
                            </motion.div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: delay * 0.1 }}
                            viewport={{ once: true }}>
                            {Seller && Seller?.length > 0 && (
                                <Image
                                    src={Seller?.[0]?.logo || ''}
                                    alt="logo"
                                    width={36}
                                    height={36}
                                />
                            )}
                        </motion.div>
                    </div>

                    <div className='flex items-center gap-0 px-2 pt-1 pb-2 lg:pb-0'>
                        {icons?.map((item, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: delay * 0.25 }}
                                viewport={{ once: true }} key={index} className="relative flex size-[36px] items-center justify-center">
                                <Image
                                    src={item?.chain || ''}
                                    alt="icon"
                                    width={30}
                                    height={25}
                                    className="h-[25px] w-[30px]"
                                />
                            </motion.div>
                        ))}
                    </div>

                    <div className='flex items-center justify-between px-1 pb-2 2xl:pt-4 3xl:pt-8'>
                        <div className='flex items-center gap-[2vw]'>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: delay * 0.35 }}
                                viewport={{ once: true }} className='flex items-center gap-1'>
                                  <Image
                                    src='/images/appStore/svg/likes.svg'
                                    alt='likes'
                                    width={19}
                                    height={17}
                                    className='h-[17px] w-[19px]'
                                />
                                <div className='text-[14px] font-[500] text-[#1C1C1C]'>{likes}</div>

                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: delay * 0.45 }}
                                viewport={{ once: true }} className='flex items-center gap-0'>
                                <Image
                                    src='/images/appStore/svg/followers.svg'
                                    alt='likes'
                                    width={25}
                                    height={17}
                                    className='h-[17px] w-[25px]'
                                />
                                <div className='text-[14px] font-[500] text-[#1C1C1C]'>{followers}</div>

                            </motion.div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: delay * 0.55 }}
                            viewport={{ once: true }} className='flex items-center gap-2 md:gap-1 xl:gap-1 2xl:gap-2 3xl:gap-2'>
                            <span className='text-[18px] font-[500]'>{apy}%</span>
                            <span className='text-[14px] font-[300]'>APY</span>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Card;