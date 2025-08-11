"use client";

import React,{useState,useEffect} from 'react'
import Image from 'next/image'
import { useRouter } from "next/navigation";


interface cardProps {
    id?:string,
    image?:string,
    title?:string,
    hashTags?:string[],
    logo?:string,
    icons?:{ chain?: string }[],
    likes?:string
    followers?:number
    apy?:string
    Seller?:[{
        name:string
        logo?:string}
    ]
}



const Card = ({id,image,title,hashTags,logo,icons,likes,followers,apy,Seller}:cardProps) => {
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    
  useEffect(() => {
  
    setCollapsed(localStorage.getItem('nav-collapsed') === 'true');
    
  
    const handler = (e: CustomEvent) => {
      setCollapsed(e.detail.collapsed);
    };
    
    window.addEventListener('nav-collapsed-change', handler as EventListener);
    return () => window.removeEventListener('nav-collapsed-change', handler as EventListener);
  }, []);
   
  const handleClick = () => {
    router.push(`/app-store/${id}`);
  };
  return (
    <div className={`duration-800 delay-800 my-2 flex cursor-pointer flex-col justify-center rounded-xl bg-[#F6FAFF] p-2 transition-all ease-in-out`}
    onClick={handleClick}
    >
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
        >
            
        </div>
    

        <Image
          src={image}
          alt="title"
          width={390}
          height={235}
          priority={true}
          className="duration-800 delay-800 relative z-20 h-[190px] w-full rounded-xl transition-all ease-in-out 3xl:h-[235px]"
        />
      </div>
        <div className='flex justify-between px-4 pt-4 pb-2'>
                <div className='flex flex-col gap-0'>
                    <div className='text-[15.08px] font-[600] text-black md:text-[14.08px] xl:text-[16.08px] 2xl:text-[19.08px] 3xl:text-[23.08px]'>{title}</div>
                    <div className='text-[11.39px] font-[400] text-[#918C8C]'>{hashTags?.map((tag, index) => (
                <span key={index}>#{tag.replace(/^#/, '')}</span>
            ))}</div>
                </div>
                <div>
                {Seller && Seller.length > 0 && (
                <Image
                src={Seller[0]?.logo}
                alt="logo"
                width={36}
                height={36}
                />)}
                </div>    
           
        </div>
        <div className='flex items-center gap-0 px-2 pt-1 pb-0'>
            {icons.map((item,index)=>(
                <div key={index} className="relative flex size-[36px] items-center justify-center">
                <Image
                    src={item.chain}
                    alt="icon"
                    width={50}
                    height={20}
                    className="h-[30px] w-[60px] "
                />
                </div>
            ))}
        </div>
        <div className='flex items-center justify-between   px-4 pb-2 2xl:pt-4 3xl:pt-8 '>
            <div className=' flex items-center gap-[2vw]  '>
            <div className='flex items-center gap-2 md:gap-2 xl:gap-2 2xl:gap-2 3xl:gap-2'>
                <div className='text-[14px] font-[500] text-[#1C1C1C]'>{likes}</div>
                <Image
                src='/images/appStore/svg/likes.svg'
                alt='likes'
                width={19}
                height={17}
                className='h-[17px] w-[19px]'
                />
            </div>
            <div className='flex items-center gap-2 md:gap-2 xl:gap-2 2xl:gap-2 3xl:gap-2'>
                <div className='text-[14px] font-[500] text-[#1C1C1C]'>{followers}</div>
                <Image
                src='/images/appStore/svg/followers.svg'
                alt='likes'
                width={19}
                height={17}
                className='h-[17px] w-[19px]'
                />
            </div>
            </div>
            <div className='flex items-center  gap-2 md:gap-1 xl:gap-1 2xl:gap-2 3xl:gap-2'>
                <span className='text-[18px] font-[500]'>{apy}%</span>
                <span className='text-[14px] font-[300]'>APY</span>
            </div>
        </div>
    </div>
  )
}

export default Card