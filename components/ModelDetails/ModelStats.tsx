'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface ModelStatsProps {
  likes: string | number
  users: string | number
  trending: string | number
  apy: string | number
  profileName?: string
  profileImage?: string
  modelId?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

interface StatItemProps {
  value: string | number
  icon: string
  iconAlt: string
  showInfo?: boolean
}

function StatItem({ value, icon, iconAlt, showInfo = false }: StatItemProps) {
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col items-center space-y-1 px-3 py-1.5 cursor-pointer "
    >
      <Image src={icon} alt={iconAlt} width={24} height={24} />
      <div className="flex flex-row items-center space-x-2 relative">
        <span className="text-sm font-medium text-[#3D3D3D] ">{value}</span>

        {showInfo && (
          <div className="relative group">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#4787FF] text-[10px] font-bold text-white cursor-pointer">
              i
            </span>

            <div className="absolute bottom-full left-0 mb-2 w-max max-w-xs rounded-[16px] bg-[#1C1E2A] text-white text-xs px-4 py-4 opacity-0 group-hover:opacity-100 transition-opacity">
              How many deployments
              <div className="absolute left-3 top-full border-4 border-transparent border-t-[#1C1E2A]"></div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export function ModelStats({ likes, users, trending, apy, profileName, profileImage, modelId }: ModelStatsProps) {
  return (
    <div className="p-4">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex items-center justify-between mb-4 px-3 "
      >
        <div className="flex items-center gap-4 my-2 cursor-pointer">
          <Link href={modelId ? `/userProfile/${modelId}` : { pathname: '/userProfile', query: { name: profileName, image: profileImage } }}>
            <Image
              src={profileImage || '/images/appStore/profile.png'}
              alt={profileName || 'Samuel Mens'}
              width={32}
              height={32}
              className="rounded-full object-cover cursor-pointer bg-[#73C255] "
            />
          </Link>
          <Link href={modelId ? `/userProfile/${modelId}` : { pathname: '/userProfile', query: { name: profileName, image: profileImage } }}>
            <span className="text-sm text-[#8F8F8F] underline underline-offset-2">
              {profileName || 'Samuel Mens'}
            </span>
          </Link>

        </div>


        <span className="whitespace-nowrap rounded-md bg-[#EBF2FF] px-3 py-1 text-sm font-bold text-gray-700">
          {apy}% <span className="font-normal">APY</span>
        </span>
      </motion.div>


      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-wrap items-center justify-start gap-4 md:gap-10"
      >
        <StatItem value={likes} icon="/images/project/hero/Frame.svg" iconAlt="Heart icon" />
        <StatItem value={users} icon="/images/project/hero/Frame (1).svg" iconAlt="User icon" showInfo />
        <StatItem value={trending} icon="/images/project/hero/Frame (2).svg" iconAlt="Trending icon" showInfo />
        <StatItem value="~$1,476.85" icon="/images/project/hero/Frame (3).svg" iconAlt="Lock icon" showInfo />
      </motion.div>
    </div>
  )
}
