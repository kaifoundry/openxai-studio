'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import { ChainData, tagsData } from '@/utils/constants'
import { motion } from 'framer-motion'
import { ChevronDown, Search, X } from 'lucide-react'

import ModelDefinitions from '../../utils/model-definitions.json'
import { Input } from '../ui/input'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '500', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const UI_CONSTANTS = {
  INITIAL_VISIBLE_COUNT: 6,
  INCREMENT_COUNT: 2,
  DROPDOWN_WIDTH: 250,
  DROPDOWN_MAX_HEIGHT: 400,
  CHAIN_DROPDOWN_MAX_HEIGHT: 200,
  ANIMATION_DURATION: 0.4,
  ANIMATION_DELAY: 0.2,
}

const DROPDOWN_CLASSES = {
  container:
    'absolute z-50 overflow-y-auto rounded-lg bg-white transition-all delay-300 duration-500 ease-in-out hide-scrollbar',
  searchContainer:
    'flex items-center gap-2 border-b border-[#EBEBEB] px-4 py-3',
  item: 'flex items-center gap-6 px-4 py-2',
  checkbox:
    'size-6 appearance-none rounded-md border bg-white transition duration-200',
  checkedCheckbox:
    'border-gray-600 checked:border-blue-500 checked:bg-white checked:bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDA3OGZmIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTIwIDZsLTExIDEyLTUtNSIvPjwvc3ZnPg==")] checked:bg-[length:14px_14px] checked:bg-center checked:bg-no-repeat',
  uncheckedCheckbox: 'border-gray-400',
}

interface FilterItem {
  label?: string
  name?: string
  icon: string
}

interface CategoryChainProps {
  selectedChains: string[]
  selectedCategories: string[]
  onToggleChain: (chain: string) => void
  onToggleCategory: (category: string) => void
  onClearCategories: () => void
  onClearChain: () => void
}

interface DropdownSearchProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
  'aria-label': string
}

interface DropdownItemProps {
  item: FilterItem
  isSelected: boolean
  onToggle: (value: string) => void
  keyPrefix: string
}

interface AccessibleDropdownProps {
  isOpen: boolean
  onToggle: () => void
  onClear: () => void
  selectedCount: number
  title: string
  searchValue: string
  onSearchChange: (value: string) => void
  searchPlaceholder: string
  items: FilterItem[]
  selectedItems: FilterItem[]
  unselectedItems: FilterItem[]
  onItemToggle: (value: string) => void
  dropdownId: string
  maxHeight: number
  position?: 'left' | 'right'
}

const formatIndNumber = (num: number): string => {
  return num.toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 20,
  })
}

const getItemKey = (item: FilterItem): string => {
  return item.label || item.name || ''
}

const DropdownSearch: React.FC<DropdownSearchProps> = ({
  value,
  onChange,
  placeholder,
  'aria-label': ariaLabel,
}) => (
  <div className={DROPDOWN_CLASSES.searchContainer}>
    <Search className="text-[#8F8F8F]" aria-hidden="true" />
    <Input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border-none bg-transparent text-[18px] text-[#8F8F8F] outline-none placeholder:text-[#8F8F8F] focus:border-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      placeholder={placeholder}
      aria-label={ariaLabel}
    />
  </div>
)

const DropdownItem: React.FC<DropdownItemProps> = ({
  item,
  isSelected,
  onToggle,
  keyPrefix,
}) => {
  const itemKey = getItemKey(item)
  const handleClick = useCallback(() => {
    onToggle(itemKey)
  }, [onToggle, itemKey])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onToggle(itemKey)
      }
    },
    [onToggle, itemKey]
  )

  return (
    <div
      role="option"
      aria-selected={isSelected}
      className={`${DROPDOWN_CLASSES.item} cursor-pointer`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-describedby={`${keyPrefix}-${itemKey}-desc`}
    >
      <Input
        type="checkbox"
        checked={isSelected}
        readOnly
        className={`${DROPDOWN_CLASSES.checkbox} ${isSelected ? DROPDOWN_CLASSES.checkedCheckbox : DROPDOWN_CLASSES.uncheckedCheckbox}`}
        aria-hidden="true"
        tabIndex={-1}
      />
      <div
        className="text-[18px] text-[#525252]"
        id={`${keyPrefix}-${itemKey}-desc`}
      >
        {itemKey}
      </div>
    </div>
  )
}

const AccessibleDropdown: React.FC<AccessibleDropdownProps> = ({
  isOpen,
  onToggle,
  onClear,
  selectedCount,
  title,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  selectedItems,
  unselectedItems,
  onItemToggle,
  dropdownId,
  maxHeight,
  position = 'left',
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        onToggle()
        triggerRef.current?.focus()
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onToggle()
      }
    },
    [onToggle]
  )

  const handleClearClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      onClear()
    },
    [onClear]
  )

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      dropdownRef.current.scrollTop = 0
      const firstFocusableElement = dropdownRef.current.querySelector(
        '[tabindex="0"]'
      ) as HTMLElement
      firstFocusableElement?.focus({ preventScroll: true })
    }
  }, [isOpen])

  return (
    <div className="dropdown-container relative">
      <motion.div
        ref={triggerRef}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: UI_CONSTANTS.ANIMATION_DURATION,
          delay: UI_CONSTANTS.ANIMATION_DELAY,
        }}
        viewport={{ once: true }}
        className={`relative flex cursor-pointer justify-between gap-4 rounded-xl px-4 py-2 ${
          isOpen ? 'border-[2px] border-blue-700' : 'border border-[#B8B8B8]'
        }`}
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={dropdownId}
        aria-label={`${title} filter. ${selectedCount} items selected`}
        tabIndex={0}
      >
        <div className="flex items-center gap-2">
          <div className="text-[16px] font-[500] text-[#525252]">{title}</div>
          {selectedCount > 0 && (
            <div
              className="flex size-6 items-center justify-center rounded-full bg-blue-500 text-sm font-[500] text-white"
              aria-label={`${selectedCount} selected`}
            >
              {selectedCount}
            </div>
          )}
        </div>
        {selectedCount > 0 ? (
          <button
            className="flex items-center justify-center rounded focus:outline-none focus:ring-0 focus:ring-inset focus:ring-transparent"
            onClick={handleClearClick}
            aria-label={`Clear all ${title.toLowerCase()} selections`}
            tabIndex={0}
          >
            <X className="size-4 cursor-pointer font-[800] text-blue-500" />
          </button>
        ) : (
          <ChevronDown
            className={`cursor-pointer text-[#525252] transition-all delay-200 duration-500 ease-in-out ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
            aria-hidden="true"
          />
        )}
      </motion.div>

      <div
        ref={dropdownRef}
        id={dropdownId}
        role="listbox"
        aria-label={`Select ${title}`}
        className={`${DROPDOWN_CLASSES.container} w-[${UI_CONSTANTS.DROPDOWN_WIDTH}px] ${
          position === 'right' ? '-right-0' : ''
        } top-14 ${
          isOpen ? `max-h-[${maxHeight}px] opacity-100` : 'max-h-0 opacity-0'
        }`}
        style={{
          boxShadow: 'rgba(17, 17, 26, 0.1) 0px 0px 16px',
          width: UI_CONSTANTS.DROPDOWN_WIDTH,
        }}
        aria-hidden={!isOpen}
      >
        <DropdownSearch
          value={searchValue}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
          aria-label={`Search ${title.toLowerCase()}`}
        />

        {selectedItems.map((item) => (
          <DropdownItem
            key={`selected-${getItemKey(item)}`}
            item={item}
            isSelected={true}
            onToggle={onItemToggle}
            keyPrefix={`selected-${title.toLowerCase()}`}
          />
        ))}

        {selectedItems.length > 0 && unselectedItems.length > 0 && (
          <hr className="my-2 border-t border-gray-200" role="separator" />
        )}

        {unselectedItems.map((item) => (
          <DropdownItem
            key={`unselected-${getItemKey(item)}`}
            item={item}
            isSelected={false}
            onToggle={onItemToggle}
            keyPrefix={`unselected-${title.toLowerCase()}`}
          />
        ))}
      </div>
    </div>
  )
}

const CategoryTag: React.FC<{
  tag: FilterItem
  isSelected: boolean
  onToggle: (label: string) => void
  index: number
}> = ({ tag, isSelected, onToggle, index }) => {
  const handleClick = useCallback(() => {
    onToggle(getItemKey(tag))
  }, [tag, onToggle])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onToggle(getItemKey(tag))
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
      className={`flex cursor-pointer items-center gap-4 rounded-xl bg-[#F6FAFF] px-4 py-3 shadow-sm md:gap-2 md:px-6 xl:gap-2 xl:py-2 2xl:gap-2 2xl:py-2 3xl:gap-2 3xl:py-2 ${
        isSelected
          ? 'border border-blue-500 bg-blue-50'
          : 'border border-transparent bg-[#F6FAFF]'
      }`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`${isSelected ? 'Remove' : 'Add'} ${getItemKey(tag)} category filter`}
    >
      <div className="flex items-center justify-center rounded-full bg-white px-3 py-2 md:p-1 xl:p-1 2xl:p-1 3xl:p-2">
        <Image
          src={tag.icon}
          width={25}
          height={24}
          alt=""
          className="md:size-[20px] xl:h-[19px] xl:w-[20px] 2xl:h-[24px] 2xl:w-[25px] 3xl:h-[24px] 3xl:w-[25px]"
          aria-hidden="true"
        />
      </div>
      <div
        className={`font-[500] text-[#9B9DA0] md:text-[10px] xl:text-[14px] 2xl:text-[13px] 3xl:text-[13px] ${poppins.className}`}
      >
        {getItemKey(tag)}
      </div>
    </motion.div>
  )
}

const ChainIcon: React.FC<{
  chain: FilterItem
  isSelected: boolean
  onToggle: (name: string) => void
  index: number
}> = ({ chain, isSelected, onToggle, index }) => {
  const handleClick = useCallback(() => {
    onToggle(getItemKey(chain))
  }, [chain, onToggle])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onToggle(getItemKey(chain))
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
        delay: index ,
      }}
      viewport={{ once: true }}
      className={`flex cursor-pointer items-center justify-between rounded-lg border border-[#EBF2FF] bg-[#F6F9FF] md:px-3 md:py-1 xl:px-3 xl:py-1 2xl:px-3 2xl:py-1 3xl:px-4 3xl:py-3 ${
        isSelected ? 'border border-blue-500' : 'border border-transparent'
      }`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`${isSelected ? 'Remove' : 'Add'} ${getItemKey(chain)} chain filter`}
    >
      <div className="rounded-full bg-[#FFFFFF] p-1">
        <Image
          src={chain.icon}
          width={25}
          height={25}
          alt=""
          className="md:size-[20px] xl:size-[20px] 2xl:size-[30px] 3xl:size-[25px]"
          aria-hidden="true"
        />
      </div>
    </motion.div>
  )
}

const Filter: React.FC<CategoryChainProps> = ({
  selectedChains,
  selectedCategories,
  onToggleChain,
  onToggleCategory,
  onClearCategories,
  onClearChain,
}) => {
  const [visibleCount, setVisibleCount] = useState(
    UI_CONSTANTS.INITIAL_VISIBLE_COUNT
  )
  const [isOpenCategory, setIsOpenCategory] = useState(false)
  const [isOpenChain, setIsOpenChain] = useState(false)
  const [categorySearch, setCategorySearch] = useState('')
  const [chainSearch, setChainSearch] = useState('')
  const [lastVisibleCount, setLastVisibleCount] = useState(UI_CONSTANTS.INITIAL_VISIBLE_COUNT)
  const handleShowMore = useCallback(() => {
    setLastVisibleCount(visibleCount)
    setVisibleCount((prev) =>
      Math.min(prev + UI_CONSTANTS.INCREMENT_COUNT, tagsData.length)
    )
  }, [visibleCount])

  const handleToggleCategory = useCallback(() => {
    setIsOpenChain(false)
    setIsOpenCategory(!isOpenCategory)
  }, [isOpenCategory])

  const handleToggleChain = useCallback(() => {
    setIsOpenCategory(false)
    setIsOpenChain(!isOpenChain)
  }, [isOpenChain])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target) return

      const dropdownContainer = target.closest('.dropdown-container')
      if (dropdownContainer) return

      const dropdownItem = target.closest('[role="option"]')
      if (dropdownItem) return

      setIsOpenCategory(false)
      setIsOpenChain(false)
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const filteredTags = useMemo(() => {
    return tagsData.filter((tag) =>
      tag.label.toLowerCase().includes(categorySearch.toLowerCase())
    )
  }, [categorySearch])

  const filteredChains = useMemo(() => {
    return ChainData.filter((chain) =>
      chain.name.toLowerCase().includes(chainSearch.toLowerCase())
    )
  }, [chainSearch])

  const { selected: selectedTags, unselected: unselectedTags } = useMemo(() => {
    const selected = filteredTags.filter((tag) =>
      selectedCategories.includes(tag.label)
    )
    const unselected = filteredTags.filter(
      (tag) => !selectedCategories.includes(tag.label)
    )
    return { selected, unselected }
  }, [filteredTags, selectedCategories])

  const { selected: selectedChain, unselected: unselectedChain } =
    useMemo(() => {
      const selected = filteredChains.filter((chain) =>
        selectedChains.includes(chain.name)
      )
      const unselected = filteredChains.filter(
        (chain) => !selectedChains.includes(chain.name)
      )
      return { selected, unselected }
    }, [filteredChains, selectedChains])

  const showMoreAvailable = visibleCount < tagsData.length
  const modelCount = ModelDefinitions?.length || 0

  if (!tagsData || !ChainData) {
    return (
      <div role="alert" className="p-4 text-center text-red-600">
        Error loading filter data. Please try again.
      </div>
    )
  }

  return (
    <div>
      <div className="my-4  flex gap-4 pb-4 lg:hidden lg:pb-0">
        <AccessibleDropdown
          isOpen={isOpenCategory}
          onToggle={handleToggleCategory}
          onClear={onClearCategories}
          selectedCount={selectedCategories.length}
          title="Category"
          searchValue={categorySearch}
          onSearchChange={setCategorySearch}
          searchPlaceholder="Search Category"
          items={filteredTags}
          selectedItems={selectedTags}
          unselectedItems={unselectedTags}
          onItemToggle={onToggleCategory}
          dropdownId="category-mobile-list"
          maxHeight={UI_CONSTANTS.DROPDOWN_MAX_HEIGHT}
        />

        <AccessibleDropdown
          isOpen={isOpenChain}
          onToggle={handleToggleChain}
          onClear={onClearChain}
          selectedCount={selectedChains.length}
          title="Chain"
          searchValue={chainSearch}
          onSearchChange={setChainSearch}
          searchPlaceholder="Search Chain"
          items={filteredChains}
          selectedItems={selectedChain}
          unselectedItems={unselectedChain}
          onItemToggle={onToggleChain}
          dropdownId="chain-mobile-list"
          maxHeight={UI_CONSTANTS.CHAIN_DROPDOWN_MAX_HEIGHT}
          position="right"
        />
      </div>

      <div className="mt-14  hidden flex-col justify-between md:flex-row lg:flex">
        <div className="flex max-w-[80%] flex-col gap-4">
          <div className="flex items-center gap-10  md:h-6 xl:h-6 2xl:h-10 3xl:h-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: UI_CONSTANTS.ANIMATION_DURATION,
                delay: UI_CONSTANTS.ANIMATION_DELAY,
              }}
              viewport={{ once: true }}
              className="font-[700] text-[#1F1F1F] md:text-[12px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[18px]"
            >
              By Categories
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: UI_CONSTANTS.ANIMATION_DURATION,
                delay: UI_CONSTANTS.ANIMATION_DELAY,
              }}
              viewport={{ once: true }}
              className="font-[500] text-[#434343] md:text-[10px] xl:text-[13px] 2xl:text-[13px] 3xl:text-[13px]"
              aria-live="polite"
            >
              {formatIndNumber(modelCount)} items
            </motion.div>
          </div>

          <div
            className="flex flex-wrap gap-4 md:flex-row md:gap-2 xl:gap-4 2xl:gap-4 3xl:gap-8"
            role="group"
            aria-label="Category filters"
          >
            {tagsData.slice(0, visibleCount).map((tag, index) => {
              const delayIndex =
                index >= lastVisibleCount
                  ? index - lastVisibleCount
                  : index < 6
                    ? index
                    : 0

              return (
                <CategoryTag
                  key={tag.label}
                  tag={tag}
                  isSelected={selectedCategories.includes(tag.label)}
                  onToggle={onToggleCategory}
                  index={delayIndex}
                />
              )
            })}

            {showMoreAvailable && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: UI_CONSTANTS.ANIMATION_DURATION,
                  delay: 0.6,
                }}
                viewport={{ once: true }}
                onClick={handleShowMore}
                className="cursor-pointer self-center rounded px-2 py-1 font-[500] text-[#434343] md:text-[10px] xl:text-[13px] 2xl:text-[13px] 3xl:text-[13px]"
                aria-label={`Show ${Math.min(UI_CONSTANTS.INCREMENT_COUNT, tagsData.length - visibleCount)} more categories`}
              >
                More..
              </motion.button>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-6 md:mt-0">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: UI_CONSTANTS.ANIMATION_DURATION,
              delay: 0.65,
            }}
            viewport={{ once: true }}
            className="font-[700] text-[#1F1F1F] md:text-[12px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[18px]"
          >
            By chain
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: UI_CONSTANTS.ANIMATION_DURATION,
              delay: 0.2,
            }}
            viewport={{ once: true }}
            className="] flex justify-around gap-4 rounded-xl p-2 px-3 md:gap-2 md:py-1 xl:gap-4 xl:py-2 2xl:gap-4 2xl:py-2 3xl:gap-10 3xl:py-2"
            role="group"
            aria-label="Chain filters"
          >
            {ChainData.map((chain, index) => {
              const delayIndex = index === 0? 0.05 * lastVisibleCount : 0.1* lastVisibleCount;
              return(
              <ChainIcon
                key={chain.name}
                chain={chain}
                isSelected={selectedChains.includes(chain.name)}
                onToggle={onToggleChain}
                index={delayIndex}
              />)
            })}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Filter
