'use client'

import React, { useState,useEffect,useMemo } from 'react'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import { ChainData, tagsData } from '@/utils/constants'
import { ChevronDown, Search } from 'lucide-react'
import { motion } from "framer-motion";
import ModelDefinitions from '../../utils/model-definitions.json'
import { Input } from '../ui/input'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '500', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

interface CategoryChainProps {
  selectedChains: string[]
  selectedCategories: string[]
  onToggleChain: (chain: string) => void
  onToggleCategory: (category: string) => void
}

const Fillter = ({
  selectedChains,
  selectedCategories,
  onToggleChain,
  onToggleCategory,
}: CategoryChainProps) => {
  const [visibleCount, setVisibleCount] = useState(6)
  const [isOpenCategory, setIsOpenCategory] = useState(false)
  const [isOpenChain, setIsOpenChain] = useState(false)
  const [categorySearch, setCategorySearch] = useState('')
  const [chainSearch, setChainSearch] = useState('')

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 2, tagsData.length))
  }

  const showMoreAvailable = visibleCount < tagsData.length

  function formatIndNumber(num: number) {
    return num.toLocaleString('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 20,
    })
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setIsOpenCategory(false)
        setIsOpenChain(false)
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);


  const filteredTags = useMemo(() => {
    return tagsData.filter(tag =>
      tag.label.toLowerCase().includes(categorySearch.toLowerCase())
    );
  }, [categorySearch]);
  
  const filteredChains = useMemo(() => {
    return ChainData.filter(chain =>
      chain.name.toLowerCase().includes(chainSearch.toLowerCase())
    );
  }, [chainSearch]);

  return (
    <>
      <div className="my-4 flex gap-6 lg:hidden">
        <div className="dropdown-container relative">
          <div
            className="relative flex cursor-pointer justify-between gap-4 rounded-xl border border-[#B8B8B8] px-4 py-2"
            onClick={() => {
              setIsOpenChain(false)
              setIsOpenCategory(!isOpenCategory)
            }}
          >
            <div className="text-[16px] font-[500] text-[#525252]">
              Category
            </div>
            <ChevronDown
              className={`cursor-pointer text-[#525252] ${isOpenCategory ? 'rotate-180' : 'rotate-0'}  transition-all delay-200 duration-500 ease-in-out`}
              
            />
          </div>
          
            <div
              className={`absolute z-50 w-[250px] ${isOpenCategory ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'} hide-scrollbar top-14 overflow-y-auto rounded-lg bg-white transition-all delay-300 duration-500 ease-in-out `}
              style={{ boxShadow: 'rgba(17, 17, 26, 0.1) 0px 0px 16px' }}
            >
              <div className="flex items-center gap-2 border-b border-[#EBEBEB] px-4 py-3">
                <Search className="text-[#8F8F8F]" />
                <Input
                  type="text"
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  className="w-full border-none bg-transparent text-[18px] text-[#8F8F8F] outline-none placeholder:text-[#8F8F8F] focus:border-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="Search Category"
                />
              </div>
              {filteredTags
                .map((tag, index) => {
                  const isSelected = selectedCategories.includes(tag.label)

                  return (
                    
                    <div   
                      key={index}
                      className="flex items-center gap-6 px-4 py-2"
                      onClick={() => onToggleCategory(tag.label)}
                    >
                      <Input
                        type="checkbox"
                        checked={isSelected}
                        readOnly
                        className="size-6 appearance-none rounded-md border border-gray-400 bg-white transition duration-200 checked:border-blue-500 checked:bg-white checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDA3OGZmIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTIwIDZsLTExIDEyLTUtNSIvPjwvc3ZnPg==')] checked:bg-[length:14px_14px] checked:bg-center checked:bg-no-repeat"
                      />
                      <div className="text-[18px] text-[#525252]">
                        {tag?.label}
                      </div>
                    </div>
                  )
                })}
            </div>
          
        </div>
        <div className="dropdown-container relative">
          <div
            className="relative flex cursor-pointer justify-between gap-4 rounded-xl border border-[#B8B8B8] px-4 py-2"
            onClick={() => {
              setIsOpenCategory(false)
              setIsOpenChain(!isOpenChain)
            }}
          >
            <div className="text-[16px] font-[500] text-[#525252]">Chain</div>
            <ChevronDown
              className={`cursor-pointer text-[#525252] ${isOpenChain ? 'rotate-180' : 'rotate-0'} transition-all delay-200 duration-500 ease-in-out`}
              
            />
          </div>

            <div
              className={`absolute z-50 w-[250px] ${isOpenChain ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'} hide-scrollbar  -right-10 top-14 overflow-y-auto rounded-lg bg-white transition-all delay-300 duration-500 ease-in-out `}
              style={{ boxShadow: 'rgba(17, 17, 26, 0.1) 0px 0px 16px' }}
            >
              <div className="flex items-center gap-2   border-b  border-[#EBEBEB] bg-white px-4 py-3">
                <Search className="text-[#8F8F8F]" />
                <Input
                  type="text"
                  value={chainSearch}
                  onChange={(e) => setChainSearch(e.target.value)}
                  className="w-full border-none bg-transparent text-[18px] text-[#8F8F8F] outline-none placeholder:text-[#8F8F8F] focus:border-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="Search Chain"
                />
              </div>
              {filteredChains.map((chain, index) => {
                const isSelected = selectedChains.includes(chain.name)
                return (
                  <div 
                        
                    key={index}
                    className="flex items-center gap-6 px-4 py-2"
                    onClick={() => onToggleChain(chain.name)}
                  >
                    <Input
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      className="size-6 appearance-none rounded-md border border-gray-400 bg-white transition duration-200 checked:border-blue-500 checked:bg-white checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDA3OGZmIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTIwIDZsLTExIDEyLTUtNSIvPjwvc3ZnPg==')] checked:bg-[length:14px_14px] checked:bg-center checked:bg-no-repeat"
                    />
                    <div className="text-[18px] text-[#525252]">
                      {chain?.name}
                    </div>
                  </div>
                )
              })}
            </div>
          
        </div>
      </div>
      <div className="my-14 hidden flex-col justify-between md:flex-row lg:flex">
        <div className="flex max-w-[80%] flex-col gap-4">
          <div className="flex items-center gap-10 md:h-6 xl:h-6 2xl:h-10 3xl:h-10">
            <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8,delay:0.3 }}
            viewport={{ once: true }}
            className="font-[700] text-[#1F1F1F] md:text-[12px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[18px]">
              By Categories
            </motion.div>
            <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8,delay:0.3 }}
            viewport={{ once: true }} 
            className="font-[500] text-[#434343] md:text-[10px] xl:text-[13px] 2xl:text-[13px] 3xl:text-[13px]">
              {formatIndNumber(Number(ModelDefinitions.length))} items
            </motion.div>
          </div>

          <div className="flex flex-wrap gap-4 md:flex-row md:gap-2 xl:gap-4 2xl:gap-4 3xl:gap-8">
            {tagsData.slice(0, visibleCount).map((tag, index) => {
              const isSelected = selectedCategories.includes(tag.label)
              return (
                <motion.div 
                      initial={{ opacity: 0,scale: 0.87, x: 30 }}
                      whileInView={{ opacity: 1,scale:1, x: 0 }}
                      transition={{ duration: 0.8,delay:0.5 }}
                      viewport={{ once: true }}
                      
                  key={index}
                  onClick={() => onToggleCategory(tag.label)}
                  className={`flex cursor-pointer items-center gap-4 rounded-xl bg-[#F6FAFF] px-4 py-3 shadow-sm md:gap-2 md:px-6 xl:gap-2 xl:py-2 2xl:gap-2 2xl:py-2 3xl:gap-2 3xl:py-2 ${
                    isSelected
                      ? 'border border-blue-500 bg-blue-50'
                      : 'border border-transparent bg-[#F6FAFF]'
                  }`}
                >
                  <div className="flex items-center justify-center rounded-full bg-white px-3 py-2 md:p-1 xl:p-1 2xl:p-1 3xl:p-2">
                    <Image
                      src={tag.icon}
                      width={25}
                      height={24}
                      alt={tag.label}
                      className="md:size-[20px] xl:h-[19px] xl:w-[20px] 2xl:h-[24px] 2xl:w-[25px] 3xl:h-[24px] 3xl:w-[25px]"
                    />
                  </div>
                  <div
                    className={`font-[500] text-[#9B9DA0] md:text-[10px] xl:text-[14px] 2xl:text-[13px] 3xl:text-[13px] ${poppins.className}`}
                  >
                    {tag.label}
                  </div>
                </motion.div>
              )
            })}

            {showMoreAvailable && (
              <motion.div 
              initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
                onClick={handleShowMore}
                className="cursor-pointer self-center font-[500] text-[#434343] md:text-[10px] xl:text-[13px] 2xl:text-[13px] 3xl:text-[13px]"
              >
                More
              </motion.div>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-6 md:mt-0">
          <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8,delay:0.3 }}
          viewport={{ once: true }}
          className="font-[700] text-[#1F1F1F] md:text-[12px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[18px]">
            By chain
          </motion.div>
          <div className="flex gap-4 rounded-xl bg-[#F6FAFF] p-2 px-3 md:gap-2 md:py-1 xl:gap-4 xl:py-2 2xl:gap-4 2xl:py-2 3xl:gap-10 3xl:py-2">
            {ChainData.map((chain, index) => {
              const isSelected = selectedChains.includes(chain.name)
              return (
                <motion.div 
                        initial={{ opacity: 0,scale: 0.87, x: 30 }}
                      whileInView={{ opacity: 1,scale: 1, x: 0 }}
                      transition={{ duration: 0.8,delay:0.5 }}
                      viewport={{ once: true }}
                      
                  key={index}
                  className={`flex cursor-pointer items-center justify-center rounded-full bg-white md:p-1 xl:p-1 2xl:p-1 3xl:p-2 ${
                    isSelected
                      ? 'border border-blue-500'
                      : 'border border-transparent'
                  }`}
                  onClick={() => onToggleChain(chain.name)}
                >
                  <Image
                    src={chain.icon}
                    width={25}
                    height={25}
                    alt="icon"
                    className="md:size-[20px] xl:size-[20px] 2xl:size-[30px] 3xl:size-[25px]"
                  />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Fillter
