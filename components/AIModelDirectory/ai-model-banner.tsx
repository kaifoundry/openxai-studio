import React from 'react'
import Image from 'next/image'
import { motion } from "framer-motion";
import { ChainData } from '@/utils/constants'

interface BannerProps {
  selectedChain?:string,
}

const Banner = ({selectedChain}:BannerProps) => {
 
  const chain = ChainData.find(c => c.name === selectedChain);
const image = chain?.icon;
  return (
    <motion.div 
    initial={{ opacity: 0.3, x: 10 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.3 }}
  viewport={{ once: true }}
    
    className="relative mt-8  lg:mt-4 h-[172px] w-full  md:h-[150px] xl:h-[200px]   2xl:h-[216px] 3xl:h-[216px]">
      <div className="relative size-full rounded-tr-2xl rounded-br-2xl ">
        <Image
          src="/images/appStore/banner-mask.png"
          alt="Mask Images"
          fill
          className="rounded-2xl object-cover hidden opacity-70  lg:block"
          
        />
        <Image
          src="/images/appStore/banner-mask-mobile.png"
          alt="Mask Images"
          fill
          className="rounded-2xl object-container opacity-70  lg:hidden block"
        />
      </div>
      <div className="absolute left-0 top-0 z-10 size-full rounded-2xl bg-[#0997FF] mix-blend-multiply "></div>
      {image && (
    <div className=" overflow-hidden  "> 
      <Image src={image} alt="" width={60} height={60} className="absolute  z-20 size-[30px] lg:size-[25px] 2xl:size-[40px] 3xl:size-[60px] opacity-60 blur:[1.2px] lg:blur-[1.5px] -top-0 left-20 rotate-[21.95deg]" />
      <Image src={image} alt="" width={60} height={60} className="absolute z-20 size-[30px] lg:size-[30px] 2xl:size-[60px] 3xl:size-[80px] opacity-60 blur:[1.2px] lg:blur-[1.5px] top-0 right-1/4 -rotate-[16.16deg]" />
      <Image src={image} alt="" width={60} height={60} className="absolute z-20 size-[30px] lg:size-[30px] 2xl:size-[60px] 3xl:size-[80px] opacity-60 blur:[1.2px] lg:blur-[1px] -bottom-0 left-1/2 -rotate-[16.16deg]" />
    </div>
  )}
      
      
      <div className="absolute -top-4 z-20 h-full px-5 lg:top-0">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:gap-4 xl:gap-14 2xl:gap-28 3xl:gap-28">
            <div className="text-[14px] font-[600] leading-5 text-white max-[420px]:text-[16px] sm:text-[18px] md:text-[24px] md:leading-8 xl:text-[30px] xl:leading-8 2xl:text-[36px] 2xl:leading-10 3xl:text-[44.7px] 3xl:leading-tight">
              The First AI App Store on Bitcoin
            </div>
            <div className="leading-2 text-[8px] font-[400] text-white max-[420px]:text-[10px] sm:text-[10px] md:text-[14px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[24px]">
              Own, Monetize, and Scale on the Hardest Network Ever Built.
            </div>
          </div>
          <div className="relative -right-5 -top-3  h-full md:-top-2 lg:-right-6 lg:-top-6 3xl:-right-5">
            <Image
              src="/images/appStore/banner-item.png"
              alt="AppStore"
              width={467}
              height={239}
              className="-top-6 right-0 h-[200px] w-[500px]  rounded-2xl object-fill lg:object-container md:h-[174px] md:w-[430px] lg:w-[600px] xl:h-[224px] 2xl:h-[239px] 3xl:h-[239px] 3xl:w-[467px]"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Banner
