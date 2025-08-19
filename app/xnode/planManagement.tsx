'use client'

import { useCallback, useMemo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

import { type Xnode } from '@/types/node'

import planData from '../../utils/plan-data.json'
import PlanDetails from './planDetails'
import TransferNFT from './transferNft'

interface PlanManagementProps {
  xnode: Xnode
  delayStart: number
}

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay },
  },
})

const formatStorage = (bytes: number): string => {
  if (bytes >= 1024 ** 4) return `${(bytes / 1024 ** 4).toFixed(1)}PB`
  if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(0)}TB`
  return `${(bytes / 1024 ** 2).toFixed(0)}GB`
}

export default function PlanManagement({
  xnode,
  delayStart,
}: PlanManagementProps) {
  const { name, cores, ram = 0, storage = 0, gpu = 0 } = xnode

  const formattedSpecs = useMemo(() => {
    const ramGB = Math.round(ram / 1024 ** 3)
    const storageStr = formatStorage(storage)
    return `${cores} cores, ${ramGB}GB RAM, ${storageStr} Storage, ${gpu} GPU`
  }, [cores, ram, storage, gpu])

  const handleTransfer = useCallback((recipientAddress: string) => {
    
  }, [])

  return (
    <div className="">
     
      <motion.div
        variants={fadeUp(delayStart)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-10 flex items-start justify-between"
      >
        <div className="flex items-center gap-3">
          <Image
            src="/images/viewDeployment/xnode.svg"
            alt="XNode"
            width={56}
            height={56}
          />
          <div>
            <motion.h2
              variants={fadeUp(delayStart + 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex items-center gap-2 text-xl font-semibold text-[#000000]"
            >
              {name}
              <Image
                src="/images/viewDeployment/ollama.svg"
                alt="Ollama"
                width={24}
                height={24}
              />
            </motion.h2>
            <motion.p
              variants={fadeUp(delayStart + 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-sm text-[#8F8F8F]"
            >
              {formattedSpecs}
            </motion.p>
          </div>
        </div>

        <motion.button
          variants={fadeUp(delayStart + 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex cursor-not-allowed items-center rounded-md bg-blue-500 px-4 py-2 text-sm font-[500] text-white bg-opacity-50"
          disabled
        >
          Push to Marketplace
          <ArrowUpRight className="ml-2" />
        </motion.button>
      </motion.div>

      <div className="space-y-6">
        <motion.div
          variants={fadeUp(delayStart + 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <PlanDetails planData={planData.planDetails} />
        </motion.div>

        <motion.div
          variants={fadeUp(delayStart + 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <TransferNFT
            onTransfer={handleTransfer}
            currentWalletAddress={planData.planDetails.currentWalletAddress}
          />
        </motion.div>
      </div>
    </div>
  )
}
