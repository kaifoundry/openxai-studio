import React from 'react'
import { motion } from 'framer-motion'

import { type Xnode } from '@/types/node'

import { HealthChartItem } from '../dashboard/health-data'

interface XNodeResourcesProps {
  xNode: Xnode
  lastUpdated: string
}

const container = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delayChildren: 0.05,
      staggerChildren: 0.05,
    },
  },
}

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
})

const formatGB = (mb: number | undefined): string => {
  if (!mb || mb <= 0) return '0'
  return (mb / 1024).toFixed(2)
}
type HealthType = 'cpu' | 'ram' | 'storage'

const ResourceCard = ({
  title,
  subtitle,
  type,
  value,
  delay = 0,
}: {
  title: string
  subtitle: React.ReactNode
  type: HealthType
  value: number
  delay?: number
}) => (
  <motion.div
    variants={fadeUp(delay)}
    whileHover={{ scale: 1.05}}
    whileTap={{ scale: 0.95 }}
    viewport={{ once: true}}
    className="flex flex-col items-center gap-2 rounded-2xl border-[1.2px] border-[#E0E0E0] px-4 pb-0 pt-4"
  >
    <div className="text-center">
      <p className="font-bold">{title}</p>
      <p className="text-sm text-[#8F8F8F]">{subtitle}</p>
    </div>
    <HealthChartItem className="size-34" type={type} healthData={value} />
  </motion.div>
)

const Resources = ({ xNode, lastUpdated }: XNodeResourcesProps) => {
  const {
    cpuPercent = 0,
    ramMbUsed = 0,
    ramMbTotal = 1,
    storageMbUsed = 0,
    storageMbTotal = 1,
  } = xNode.heartbeatData ?? {}

  const ramUsedGB = formatGB(ramMbUsed)
  const ramTotalGB = formatGB(ramMbTotal)
  const ramUsagePercent = (ramMbUsed / ramMbTotal) * 100

  const storageUsedGB = formatGB(storageMbUsed)
  const storageTotalGB = formatGB(storageMbTotal)
  const storageUsagePercent = (storageMbUsed / storageMbTotal) * 100

  const cards = [
    {
      key: 'cpu',
      title: 'CPU',
      subtitle: 'Current CPU utilization',
      type: 'cpu' as HealthType,
      value: cpuPercent,
    },
    {
      key: 'ram',
      title: 'RAM',
      subtitle: `${ramUsedGB} GB / ${ramTotalGB} GB`,
      type: 'ram' as HealthType,
      value: ramUsagePercent,
    },
    {
      key: 'storage',
      title: 'Storage',
      subtitle: `${storageUsedGB} GB / ${storageTotalGB} GB`,
      type: 'storage' as HealthType,
      value: storageUsagePercent,
    },
  ]

  const base = 0.8
  const step = 0.5

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      
      className="mt-6 py-4"
    >
      <div className="flex items-center cursor-pointer justify-between  cursor-pointer gap-4">
        <div>
          <motion.h2 variants={fadeUp(0.1)} className="text-xl font-bold">
            Resources
          </motion.h2>
          <motion.p variants={fadeUp(0.15)} className="text-xs text-[#8F8F8F]">
            Last updated {lastUpdated} ago
          </motion.p>
        </div>
      </div>

      <motion.div 
       variants={container}
       
      className="mt-6 grid grid-cols-1 gap-14 lg:grid-cols-3">
        {cards.map((c, i) => (
          <ResourceCard
            key={c.key}
            title={c.title}
            subtitle={c.subtitle}
            type={c.type}
            value={c.value}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

export default Resources
