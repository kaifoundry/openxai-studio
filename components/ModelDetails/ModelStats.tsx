'use client'

import { motion } from 'framer-motion'

interface ModelStatsProps {
  likes: string | number
  users: string | number
  trending: string | boolean
  apy: string | number
  deploy?: boolean
  setDeploy?: React.Dispatch<React.SetStateAction<boolean>>
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, 
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

interface StatItemProps {
  value: string | number | boolean
  icon: string
  iconAlt: string
  iconClass?: string
  containerClass?: string
}

function StatItem({
  value,
  icon,
  iconAlt,
  iconClass = 'h-5 w-5',
  containerClass = '',
}: StatItemProps) {
  return (
    <motion.div
      variants={itemVariants}
      className={`flex items-center space-x-4 rounded-md bg-[#F1F7FF] px-4 py-1 ${containerClass}`}
    >
      <span className="font-semibold text-[#313131] text-sm md:text-md lg:text-md">
        {value}
      </span>
      <img src={icon} alt={iconAlt} className={iconClass} />
    </motion.div>
  )
}

export function ModelStats({ likes, users, trending, apy }: ModelStatsProps) {
  return (
    <div className="mx-4 md:mx-2 pt-2">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative lg:mx-auto px-0 py-4 md:py-0 md:px-0 md:pt-4 mb:pb-2 lg:px-4"
      >
        <div className="items-left flex flex-col justify-between lg:gap-4 sm:flex-row gap-2">
          <div className="flex flex-wrap lg:items-center justify-start gap-4 sm:justify-start sm:gap-2 lg:gap-4">

            <StatItem value={likes} icon="/images/project/hero/heart.svg" iconAlt="Heart icon" />
            <StatItem value={users} icon="/images/project/hero/person.svg" iconAlt="User icon" />
            <StatItem value={trending} icon="/images/project/hero/trending.svg" iconAlt="Trending icon" />
            <StatItem value="~$1,456.85" icon="/images/project/hero/lock.svg" iconAlt="Lock icon" iconClass="size-4" />

            <motion.div variants={itemVariants} className="flex items-center">
              <span className="whitespace-nowrap rounded-md bg-[#8CD417] px-3 py-1 text-sm font-bold text-white sm:text-base lg:text-lg">
                {apy} % APY
              </span>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </div>
  )
}
