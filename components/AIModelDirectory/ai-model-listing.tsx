'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

import ModelDefinitions from '../../utils/model-definitions.json'
import Card from './ai-model-card'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration:0.8,
      delay:1.5
    },
  },
}

interface AppContentProps {
  selectedChains: string[]
  selectedCategories: string[]
}
const ModelListing = ({
  selectedChains,
  selectedCategories,
}: AppContentProps) => {
  const [collapsed, setCollapsed] = useState(true)
  const [visibleCounts, setVisibleCounts] = useState<{ [key: string]: number }>(
    {}
  )
  const [lastVisibleCounts, setLastVisibleCounts] = useState<{
    [key: string]: number
  }>({})
  useEffect(() => {
//     const initialCollapsed = localStorage.getItem("nav-collapsed");
// if (initialCollapsed !== null) {
//   setCollapsed(initialCollapsed === "true"); 
// }

    console.log("collpased ==>",collapsed)

    const handler = (e: CustomEvent) => {
      setCollapsed(e.detail.collapsed)
    }

    window.addEventListener('nav-collapsed-change', handler as EventListener)
    return () =>
      window.removeEventListener(
        'nav-collapsed-change',
        handler as EventListener
      )
  }, [])

  const uniqueCategories = useMemo(() => {
    const categories = ModelDefinitions.map((item) => item.category)
    return [...new Set(categories)]
  }, [])

  const filterModels = (category: string) => {
    return ModelDefinitions.filter((item) => {
      const matchChain =
        selectedChains?.length > 0
          ? item?.chains?.some((c: any) => selectedChains.includes(c.name))
          : true
      const matchCategory =
        selectedCategories?.length > 0
          ? selectedCategories.includes(item.category)
          : true
      return matchChain && matchCategory && item.category === category
    })
  }

  const renderCards = (
    title: string,
    models: any[],
    showAll: boolean = false
  ) => {
    const getVisibleCount = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth
        if (width >= 1920) {
          return 4
        } else if (width >= 1000 && width <= 1300) {
          return 3
        } else if (width >= 768 && width < 1000) {
          return 2
        }
      }
      return collapsed ? 4 : 3
    }

    const visibleCount = visibleCounts[title] ?? getVisibleCount()
    const visibleModels = showAll ? models : models.slice(0, visibleCount)
    const hasMore = !showAll && visibleCount < models.length

    if (models.length === 0) return null

    return (
      <div
        key={title}
        className="hide-scrollbar overflow mb-6 flex flex-col lg:mb-0"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="hide-scrollbar mb-4  text-[18px] font-[700] text-[#1F1F1F] md:text-[16px] xl:text-[18px] 2xl:text-[20px] 3xl:text-[26px]"
        >
          {title} ({models?.length})
        </motion.div>

        <motion.div
           variants={containerVariants}
          className={`duration-800 grid grid-cols-1 gap-4 transition-all delay-700 md:grid-cols-2 3xl:gap-8 ${collapsed ? 'lg:grid-cols-3' : 'lg:grid-cols-3'} ${collapsed ? 'xl:grid-cols-3' : 'xl:grid-cols-3'} ${collapsed ? '2xl:grid-cols-4' : '2xl:grid-cols-3'} 3xl:grid-cols-4`}
        >
          {visibleModels.map((data: any, index) => {
            const prevCount = lastVisibleCounts[title] ?? 0
            let delayIndex = 0

            if (!lastVisibleCounts[title]) {
              delayIndex = index
            } else if (index >= prevCount) {
              delayIndex = index - prevCount
            }

            return (
              <Card
                key={data?.id}
                id={data?.id}
                delay={0.4 * delayIndex}
                image={data?.image}
                title={data?.name}
                hashTags={data?.tags}
                logo={data?.logo}
                icons={data?.chains}
                likes={data?.likes}
                followers={data?.followers}
                apy={data?.apy}
                Seller={data?.Seller}
              />
            )
          })}
        </motion.div>

        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="mt-4 w-fit cursor-pointer px-2 text-[13px] font-[500] text-[#434343] transition-all duration-100 hover:underline hover:underline-offset-1"
            onClick={() => {
              setLastVisibleCounts((prev) => ({
                ...prev,
                [title]: visibleCount,
              }))
              setVisibleCounts((prev) => ({
                ...prev,
                [title]: (prev[title] ?? (collapsed ? 4 : 3)) + 4,
              }))
            }}
            aria-label={`View more models in ${title}`}
          >
            View More
          </motion.div>
        )}
      </div>
    )
  }

  const allMatchingModels = useMemo(() => {
    return ModelDefinitions.filter((item) => {
      const matchChain =
        selectedChains.length > 0
          ? item.chains?.some((c: any) => selectedChains.includes(c.name))
          : true
      const matchCategory =
        selectedCategories.length > 0
          ? selectedCategories.includes(item.category)
          : true
      return matchChain && matchCategory
    })
  }, [selectedChains, selectedCategories])

  if (
    (selectedCategories.length > 0 || selectedChains.length > 0) &&
    allMatchingModels.length === 0
  ) {
    return (
      <div className="w flex h-[400px] items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center text-gray-400"
        >
          <Image src="/images/no-data-6.png" alt="" width={150} height={150} />
          <div>No Apps Found</div>
        </motion.div>
      </div>
    )
  }

  if (selectedCategories.length > 0 || selectedChains.length > 0) {
    const matchingCategories = uniqueCategories.filter((cat) => {
      const models = filterModels(cat)
      return models.length > 0
    })
    const categoriesToShow =
      selectedCategories.length > 0 ? selectedCategories : matchingCategories

    return (
      <div className="hide-scrollbar flex w-full flex-col overflow-x-auto overflow-y-hidden 2xl:gap-14 3xl:gap-20">
        {categoriesToShow.map((category) => {
          const models = filterModels(category)
          return renderCards(category, models, true)
        })}
      </div>
    )
  }

  return (
    <div className="hide-scrollbar flex w-full flex-col overflow-x-auto overflow-y-hidden 2xl:gap-14 3xl:gap-20">
      {uniqueCategories?.map((category) => {
        const models = filterModels(category)
        return models?.length > 0 ? renderCards(category, models, false) : null
      })}
    </div>
  )
}
export default ModelListing
