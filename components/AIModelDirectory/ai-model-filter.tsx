"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { tagsData, ChainData } from '@/utils/constants';
import ModelDefinitions from '../../utils/model-definitions.json';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '500', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

interface CategoryChainProps {
  selectedChains: string[];
  selectedCategories: string[];
  onToggleChain: (chain: string) => void;
  onToggleCategory: (category: string) => void;
}

const Fillter = ({ selectedChains, selectedCategories, onToggleChain, onToggleCategory }: CategoryChainProps) => {
  const [visibleCount, setVisibleCount] = useState(6);

  const handleShowMore = () => {
    setVisibleCount(prev => Math.min(prev + 2, tagsData.length));
  };

  const showMoreAvailable = visibleCount < tagsData.length;

 function formatIndNumber(num: number) {
    return num.toLocaleString("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 20,
    });
  }

  return (
    <div className='my-14 flex flex-col justify-between md:flex-row'>
      
      <div className='flex max-w-[80%] flex-col gap-4'>
        <div className='flex items-center gap-10 md:h-6 xl:h-6 2xl:h-10 3xl:h-10 '>
          <div className='font-[700] text-[#1F1F1F] md:text-[12px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[18px]'>
            By Categories
          </div>
          <div className='font-[500] text-[#434343] md:text-[10px] xl:text-[13px] 2xl:text-[13px] 3xl:text-[13px]'>
            {formatIndNumber(Number(ModelDefinitions.length))} items
          </div>
        </div>

        <div className='flex flex-wrap  gap-4 md:flex-row md:gap-2 xl:gap-4 2xl:gap-4 3xl:gap-8'>
          {tagsData.slice(0, visibleCount).map((tag, index) => {
            const isSelected = selectedCategories.includes(tag.label);
            return(
              <div
                key={index}
                onClick={() => onToggleCategory(tag.label)}
                className={`flex cursor-pointer items-center gap-4 rounded-xl bg-[#F6FAFF] px-4 py-3 shadow-sm md:gap-2 md:px-6 xl:gap-2 xl:py-2 2xl:gap-2 2xl:py-2 3xl:gap-2 3xl:py-2 ${
                  isSelected ? 'border border-blue-500 bg-blue-50' : 'border border-transparent bg-[#F6FAFF]'
                }`}
              >
                <div className='flex items-center justify-center rounded-full bg-white px-3 py-2 md:p-1 xl:p-1 2xl:p-1 3xl:p-2'>
                  <Image
                    src={tag.icon}
                    width={25}
                    height={24}
                    alt={tag.label}
                    className='md:size-[20px] xl:h-[19px] xl:w-[20px] 2xl:h-[24px] 2xl:w-[25px] 3xl:h-[24px] 3xl:w-[25px]'
                  />
                </div>
                <div
                  className={`font-[500] text-[#9B9DA0] md:text-[10px] xl:text-[14px] 2xl:text-[13px] 3xl:text-[13px] ${poppins.className}`}
                >
                  {tag.label}
                </div>
              </div>
            )
          })}

         
          {showMoreAvailable && (
            <div
              onClick={handleShowMore}
              className='cursor-pointer self-center font-[500] text-[#434343] md:text-[10px] xl:text-[13px] 2xl:text-[13px] 3xl:text-[13px]'
            >
              More
            </div>
          )}
        </div>
      </div>

     
      <div className='mt-10 flex flex-col gap-6 md:mt-0'>
        <div className='font-[700] text-[#1F1F1F] md:text-[12px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[18px]'>
          By chain
        </div>
        <div className='flex gap-4 rounded-xl bg-[#F6FAFF] p-2 px-3 md:gap-2 md:py-1 xl:gap-4 xl:py-2 2xl:gap-4 2xl:py-2 3xl:gap-10 3xl:py-2'>
          {ChainData.map((chain, index) => {
            const isSelected = selectedChains.includes(chain.name);
            return(
            <div
              key={index}
              className={`flex cursor-pointer items-center justify-center rounded-full  bg-white md:p-1 xl:p-1 2xl:p-1 3xl:p-2 ${
                isSelected ? 'border border-blue-500' : 'border border-transparent'
              }`}
              onClick={() => onToggleChain(chain.name)}
            >
              <Image
                src={chain.icon}
                width={25}
                height={25}
                alt='icon'
                className='md:size-[20px] xl:size-[20px] 2xl:size-[30px] 3xl:size-[25px]'
              />
            </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Fillter;
