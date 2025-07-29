import React from 'react'
import Image from 'next/image'

const Banner = () => {
  return (
    <div className="relative h-[100px] w-full md:h-[150px] xl:h-[200px] 2xl:h-[216px] 3xl:h-[216px]  ">
       
      <div className="rounded-2xl">
        <Image
          src="/images/appStore/banner-mask.png"
          alt="Mask Images"
          fill
          className="h-[216px] max-w-[1782px] rounded-2xl object-cover"
        />
      </div>
        
      <div className="absolute left-0 top-0 z-10 size-full rounded-2xl bg-[#0997FF] opacity-65"></div>
        
      <div className="absolute top-0 z-20 h-full px-5">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-4 xl:gap-14 2xl:gap-28 3xl:gap-28">
            <div className="text-[12px] font-[600] text-white md:text-[24px] md:leading-8 xl:text-[30px] xl:leading-8 2xl:text-[36px] 2xl:leading-10 3xl:text-[44.7px] 3xl:leading-tight">
              The First AI App Store on Bitcoin
            </div>
            <div className="text-[10px] font-[400] text-white md:text-[14px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[24px]">
              Own, Monetize, and Scale on the Hardest Network Ever Built.
            </div>
          </div>
          <div className="relative -right-6 -top-6 max-w-[467px]">
            <Image
              src="/images/appStore/banner-item.png"
              alt="AppStore"
              width={467}
              height={239}
              className="-top-6 right-0 h-[100px] w-[550px] md:h-[174px]  md:w-[430px] xl:h-[224px] 2xl:h-[239px] 3xl:h-[239px] 3xl:w-[467px]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
