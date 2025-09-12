'use client'

import React, { useCallback, useState } from 'react'
import Image from 'next/image'
import { ChainData, tagsData } from '@/utils/constants'
import { motion } from 'framer-motion'

const UI_CONSTANTS = {
  INITIAL_VISIBLE_COUNT: 6,
  INCREMENT_COUNT: 2,
  DROPDOWN_WIDTH: 250,
  DROPDOWN_MAX_HEIGHT: 400,
  CHAIN_DROPDOWN_MAX_HEIGHT: 200,
  ANIMATION_DURATION: 0.4,
  ANIMATION_DELAY: 0.2,
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

interface FilterItem {
  label?: string
  name?: string
  icon: string
}

const getItemKey = (item: FilterItem): string => item.label || item.name || ''

export const CategoryTag: React.FC<{
  tag: FilterItem
  isSelected?: boolean
  onToggle?: (label: string) => void
  index: number
}> = ({ tag, isSelected, onToggle, index }) => {
  const handleClick = useCallback(() => {
    onToggle?.(getItemKey(tag))
  }, [tag, onToggle])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onToggle?.(getItemKey(tag))
      }
    },
    [tag, onToggle]
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: UI_CONSTANTS.ANIMATION_DURATION,
        delay: 0.05 * index,
      }}
      viewport={{ once: true }}
      whileTap={{ scale: 0.95, transition: { duration: 0.2, delay: 0 } }}
      className={`flex cursor-pointer items-center gap-4 rounded-xl px-4 py-3 shadow-sm md:gap-2 md:px-6 lg:py-1 xl:gap-2 xl:py-2 2xl:gap-2 2xl:py-2 3xl:gap-2 3xl:py-2 ${
        isSelected
          ? 'border border-blue-500 bg-blue-50'
          : 'border border-transparent bg-[#F6FAFF]'
      }`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`${isSelected ? 'Remove' : 'Add'} ${getItemKey(
        tag
      )} category filter`}
    >
      <div className="flex items-center justify-center rounded-full bg-white px-3 py-2 md:p-1 xl:p-1 2xl:p-1 3xl:p-2">
        <Image
          src={tag.icon}
          width={20}
          height={20}
          alt=""
          className="md:size-[16px] xl:h-[19px] xl:w-[20px] 2xl:h-[20px] 2xl:w-[20px] 3xl:h-[24px] 3xl:w-[25px]"
          aria-hidden="true"
        />
      </div>
      <div className="font-[500] text-[#9B9DA0] md:text-[10px] xl:text-[13px] 2xl:text-[13px] 3xl:text-[13px]">
        {getItemKey(tag)}
      </div>
    </motion.div>
  )
}

export const ChainIcon: React.FC<{
  chain: FilterItem
  isSelected?: boolean
  onToggle?: (name: string) => void
  index: number
}> = ({ chain, isSelected, onToggle, index }) => {
  const handleClick = useCallback(() => {
    onToggle?.(getItemKey(chain))
  }, [chain, onToggle])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onToggle?.(getItemKey(chain))
      }
    },
    [chain, onToggle]
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: UI_CONSTANTS.ANIMATION_DURATION,
        delay: 0.05 * index,
      }}
      viewport={{ once: true }}
      className={`flex cursor-pointer items-center justify-between rounded-lg border border-[#EBF2FF] bg-[#F6F9FF] md:px-3 md:py-1 lg:p-1 xl:px-3 xl:py-1 2xl:px-2 2xl:py-1 3xl:px-4 3xl:py-3 ${isSelected ? 'border-blue-500' : 'border-transparent'}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`${isSelected ? 'Remove' : 'Add'} ${getItemKey(
        chain
      )} chain filter`}
    >
      <div className="rounded-full bg-[#FFFFFF] p-1">
        <Image
          src={chain.icon}
          width={20}
          height={20}
          alt=""
          className="md:size-[16px] xl:size-[20px] 2xl:size-[20px] 3xl:size-[25px]"
          aria-hidden="true"
        />
      </div>
    </motion.div>
  )
}

const Filter: React.FC<{
  selectedChains: string[]
  setSelectedChains: React.Dispatch<React.SetStateAction<string[]>>
  selectedCategories: string[]
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>
}> = ({
  selectedChains,
  setSelectedChains,
  selectedCategories,
  setSelectedCategories,
}) => {
  const [visibleCount, setVisibleCount] = useState(
    UI_CONSTANTS.INITIAL_VISIBLE_COUNT
  )
  const [lastVisibleCount, setLastVisibleCount] = useState(
    UI_CONSTANTS.INITIAL_VISIBLE_COUNT
  )

  const toggleChain = (name: string) => {
    setSelectedChains((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    )
  }

  const toggleCategory = (label: string) => {
    setSelectedCategories((prev) =>
      prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label]
    )
  }

  const handleShowMore = useCallback(() => {
    setLastVisibleCount(visibleCount)
    setVisibleCount((prev) =>
      Math.min(prev + UI_CONSTANTS.INCREMENT_COUNT, tagsData.length)
    )
  }, [visibleCount])

  const showMoreAvailable = visibleCount < tagsData.length

  return (
    <div className="transition delay-300 duration-700">
      <div className="mt-10 flex flex-col gap-2 md:mt-0">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: UI_CONSTANTS.ANIMATION_DURATION,
          }}
          viewport={{ once: true }}
          className="font-[600] text-[#141414] md:text-[10px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[16px]"
        >
          By chain
        </motion.h2>

        <motion.div
          variants={containerVariants}
          viewport={{ once: true }}
          initial="hidden"
          whileInView="visible"
          transition={{
            duration: UI_CONSTANTS.ANIMATION_DURATION,
          }}
          className="flex gap-4 rounded-xl p-2 px-3 md:gap-2 md:py-1 xl:gap-4 xl:py-2 2xl:gap-4 2xl:py-2 3xl:gap-10 3xl:py-2"
          role="group"
          aria-label="Chain filters"
        >
          {ChainData.map((chain, index) => (
            <ChainIcon
              key={chain.name}
              chain={chain}
              index={index}
              isSelected={selectedChains.includes(chain.name!)}
              onToggle={toggleChain}
            />
          ))}
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: UI_CONSTANTS.ANIMATION_DURATION,
        }}
        viewport={{ once: true }}
      >
        <hr className="my-5 w-[95%] bg-[#A3A3A3]" />
      </motion.div>
      <div className="mt-10 flex flex-col gap-2 md:mt-0">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: UI_CONSTANTS.ANIMATION_DURATION,
          }}
          viewport={{ once: true }}
          className="font-[600] text-[#141414] md:text-[10px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[16px]"
        >
          By category
        </motion.h2>
        <div
          className="flex flex-wrap gap-4 md:flex-row md:gap-2 xl:gap-4 2xl:gap-4 3xl:gap-8"
          role="group"
          aria-label="Category filters"
        >
          {tagsData.slice(0, visibleCount).map((tag, index) => {
            return (
              <CategoryTag
                key={tag.label}
                tag={tag}
                index={index}
                isSelected={selectedCategories.includes(tag.label!)}
                onToggle={toggleCategory}
              />
            )
          })}

          {showMoreAvailable && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: UI_CONSTANTS.ANIMATION_DURATION,
              }}
              viewport={{ once: true }}
              onClick={handleShowMore}
              className="cursor-pointer self-center rounded px-2 py-1 font-[500] text-[#434343] md:text-[10px] xl:text-[13px] 2xl:text-[13px] 3xl:text-[13px]"
              aria-label={`Show ${Math.min(
                UI_CONSTANTS.INCREMENT_COUNT,
                tagsData.length - visibleCount
              )} more categories`}
            >
              More..
            </motion.button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Filter
