'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDemoContext, useSetDemoContext } from '@/contexts/XnodeDemoContext'
import ModelDefinitions from '@/utils/model-definitions.json'
import { xnode } from '@openmesh-network/xnode-manager-sdk'

import {
  demoSession,
  reserveDemo,
  useDemosAvailable,
  useDeployModel,
  type DemoXnode,
} from '@/lib/xnode-demo'
import { useToast } from '@/components/ui/use-toast'
import { motion } from 'framer-motion'
import { LoadingOverlay } from '../ui/loading-overlay'


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Adjust this value to control the delay between children
    },
  },
}

const itemVariants = (delay: number) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: delay,
    },
  },
});

export default function Amount({
  selectedAIModel,
  selectedProvider,
  selectedTokenization,
  final_amount,
  templateId,
}) {
  const [selectedServices, setSelectedServices] = useState([])
  const [hourlyRate, setHourlyRate] = useState(0.0)
  const [monthlyRate, setMontlyRate] = useState(0.0)
  const [totalSavings, setTotalSavings] = useState(0.0)

  const [deploying, setDeploying] = useState<boolean>(false)
  const router = useRouter()
  const { toast } = useToast()
  const demos = useDemosAvailable()
  const demoXnode = demos.data?.find((x) => !x.reservation)
  const reservedXnode = useDemoContext()
  const setReservedXnode = useSetDemoContext()
  const deployModel = useDeployModel()
  const getWorkingDaysInMonth = (year, month) => {
    const startDate = new Date(year, month, 1)
    const endDate = new Date(year, month + 1, 0)
    let workingDays = 0

    for (let day = startDate; day <= endDate; day.setDate(day.getDate() + 1)) {
      const dayOfWeek = day.getDay()

      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        workingDays++
      }
    }
    return workingDays
  }

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    )
  }

  const BASE_SUB_TOTAL = 276.97
  const SAVINGS_WITH_MAGIC = 13.97
  const APP_STAKING_REWARDS_PERCENTAGE = 142
  const AVE_MONTHLY_REWARDS = 183.94
  const GAS_FEES_REBATES = 11.12
  const CHAIN_REWARDS = 3.14
  const WORKING_HOURS_PER_DAY = 8
  const TokenizationSubTotal =
    AVE_MONTHLY_REWARDS + GAS_FEES_REBATES + CHAIN_REWARDS

  const [discountCode, setDiscountCode] = useState('')
  useEffect(() => {
    let newMonthlyRate
    if (selectedProvider) {
      if (selectedTokenization) {
        console.log('Yes selected')
        newMonthlyRate = Math.abs(monthlyRate - BASE_SUB_TOTAL)
      } else {
        newMonthlyRate = monthlyRate + BASE_SUB_TOTAL
      }
      setMontlyRate(newMonthlyRate)
      const now = new Date()
      const workingDays = getWorkingDaysInMonth(
        now.getFullYear(),
        now.getMonth()
      )

      const totalWorkingHours = workingDays * WORKING_HOURS_PER_DAY
      const calculatedHourlyRate =
        totalWorkingHours > 0 ? newMonthlyRate / totalWorkingHours : 0

      setHourlyRate(parseFloat(calculatedHourlyRate.toFixed(2)))
    }
  }, [selectedProvider])

  useEffect(() => {
    if (selectedTokenization) {
      const newMonthlyRate = monthlyRate + TokenizationSubTotal
      setMontlyRate(newMonthlyRate)
      const now = new Date()
      const workingDays = getWorkingDaysInMonth(
        now.getFullYear(),
        now.getMonth()
      )

      const totalWorkingHours = workingDays * WORKING_HOURS_PER_DAY
      const calculatedHourlyRate =
        totalWorkingHours > 0 ? newMonthlyRate / totalWorkingHours : 0

      setHourlyRate(parseFloat(calculatedHourlyRate.toFixed(2)))
    }
    if (selectedProvider) {
      setMontlyRate(BASE_SUB_TOTAL - TokenizationSubTotal)
    }
  }, [selectedTokenization])

  const deployOnDemo = async () => {
    const activeReservation =
      reservedXnode.xnode &&
      reservedXnode.xnode.reservation.reserved_until > Date.now() / 1000
    let deployOnXnode: DemoXnode

    if (!activeReservation && !demoXnode) {
      const nextFreeXnode = demos.data
        ?.map((x) => x.reservation.reserved_until)
        .sort()
        .at(0)
      toast({
        title: 'Deployment failed',
        description: `No demo xnodes available. ${nextFreeXnode ? `Next xnode will be free in ${Math.round((nextFreeXnode - Date.now() / 1000) / 60)} minutes.` : ''}`,
        variant: 'destructive',
      })
      return
    }

    let dismiss = () => {}
    try {
      if (activeReservation) {
        deployOnXnode = reservedXnode.xnode
      } else {
        
        deployOnXnode = await reserveDemo({ xnode_id: demoXnode.id })
      }

      
      const selectedModel = ModelDefinitions.find(
        (m) => m.nixName === templateId
      )
      
      const modelSize = selectedAIModel?.name
     

      const ollamaCommand =
        selectedModel?.options[0].requirements[modelSize]?.ollamaCommand
     
      if (!ollamaCommand) {
        throw new Error('Selected model configuration not found')
      }

      const session = demoSession({ xnode_id: deployOnXnode.id })
      while (true) {
        // Wait until access is granted
        try {
          await xnode.usage.cpu({
            session,
            path: {
              scope: 'host',
            },
          })
          break
        } catch (e) {
          console.log('waiting for Xnode access...')
          await new Promise((resolve) => setTimeout(resolve, 1000))
        }
      }

      const deploymentId = await deployModel({
        session,
        model: ollamaCommand,
      }).then((data) => data.request_id)
      setReservedXnode({
        xnode: deployOnXnode,
        deploymentId,
        processes: ['open-webui', 'ollama', 'ollama-model-loader'],
      })

      router.push('/deployments')
    } catch (e) {
      console.error(e)
    } finally {
      dismiss()
    }
  }
  return (
    <div className="flex py-4 pl-0 pr-4">
      <LoadingOverlay isVisible={deploying} />

      <motion.div
      // variants={containerVariants}
      // initial="hidden"
      // whileInView="visible"
      className="flex w-full py-4 pl-0 pr-4">
        <div className="w-full bg-white">
          {!final_amount && (
            <motion.div
            variants={itemVariants(0.2)}
             initial="hidden"
            whileInView="visible"
            viewport={{once:true}}
            className="mb-6 rounded-md bg-[#EEEEEE] px-4 py-2 text-left lg:text-[16px] 3xl:text-[21px] font-[400]">
              Hosting costs
            </motion.div>
          )}

          {!final_amount && (
            <motion.div
            variants={itemVariants(0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{once:true}}
            className="flex cursor-pointer items-center justify-between border-b border-[#D4D4D4] py-3">
              <span className="text-[14px]  2xl:text-[16px] 3xl:text-[18px]">
                --
              </span>
              {selectedAIModel && (
                <span className="text-[14px]  2xl:text-[16px] 3xl:text-[18px]">
                  $00.00
                </span>
              )}
            </motion.div>
          )}

          {(selectedProvider || selectedTokenization) && !final_amount && (
            <div>
              <motion.div
              variants={itemVariants(0.05)}
               initial="hidden"
            whileInView="visible"
            viewport={{once:true}}
              className="flex cursor-pointer items-center justify-between border-b border-[#D4D4D4] py-3">
                <span className="text-[14px]  2xl:text-[16px] 3xl:text-[18px]">
                  --
                </span>
                <span className="text-[14px]  2xl:text-[16px] 3xl:text-[18px]">
                 $00.00
                </span>
              </motion.div>
              <motion.div 
              variants={itemVariants(0.1)}
               initial="hidden"
            whileInView="visible"
            viewport={{once:true}}
              className="flex items-center justify-between py-6">
                <span className="text-[14px]  2xl:text-[14px] 3xl:text-[18px]">
                  Discount code
                </span>
                <div className="max-w-30 flex items-center rounded-full border border-[#D4D4D4] px-4 py-1">
                  <input
                    type="text"
                    className="max-w-28 border-none px-2 py-1 focus:outline-none"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                  />
                  <button
                    onClick={() => {}}
                    className="rounded-md px-3 py-1 text-sm text-gray-700"
                  >
                    Apply
                  </button>
                </div>
              </motion.div>
              <motion.div 
              variants={itemVariants(0.2)}
               initial="hidden"
            whileInView="visible"
            viewport={{once:true}}
              className="flex flex-col items-start border-b border-[#D4D4D4] pb-8">
                <div className="flex w-full items-center justify-between pt-4">
                  <span className="text-[16px] font-medium text-darkGray">
                    Sub Total
                  </span>
                  <span className="text-2xl font-bold text-darkGray">
                    ${BASE_SUB_TOTAL.toFixed(2)}/
                    <span className="text-[16px]">mo</span>
                  </span>
                </div>
                <p className="mt-1 self-end text-right text-[14px] ">
                  That’s about ${hourlyRate.toFixed(2)} hourly
                </p>
              </motion.div>
            </div>
          )}
          {selectedTokenization && !final_amount && (
            <>
              <motion.div 
              variants={itemVariants(0.1)}
               initial="hidden"
            whileInView="visible"
            viewport={{once:true}}
              className="mb-6 mt-6 rounded-md bg-[#EEEEEE] px-4 py-2 text-left text-[16px] 3xl:text-[21px]  font-[400]">
                OpenXAI Magic
              </motion.div>

              <motion.div
              variants={itemVariants(0.15)}
               initial="hidden"
            whileInView="visible"
            viewport={{once:true}}
              className="my-8 flex items-center justify-between border-b border-[#D4D4D4] py-1">
                <span className="text-[14px]  2xl:text-[14px] 3xl:text-[18px]">
                  App staking rewards <span className="text-gray-400">?</span>
                </span>
                <span className="text-[14px] font-[700] text-darkGray 2xl:text-[14px] 3xl:text-[18px]">
                  {APP_STAKING_REWARDS_PERCENTAGE}%
                </span>
              </motion.div>
              <motion.div
              variants={itemVariants(0.2)}
               initial="hidden"
            whileInView="visible"
            viewport={{once:true}}
              className="my-8 flex items-center justify-between border-b border-[#D4D4D4] py-1">
                <span className="text-[14px]  2xl:text-[16px] 3xl:text-[18px]">
                  Ave. monthly rewards
                </span>
                <span className="text-[14px] font-[700] text-darkGray 2xl:text-[14px] 3xl:text-[18px]">
                  ~${AVE_MONTHLY_REWARDS.toFixed(2)}
                </span>
              </motion.div>
              <motion.div 
              variants={itemVariants(0.25)}
               initial="hidden"
            whileInView="visible"
            viewport={{once:true}}
              className="my-8 flex items-center justify-between border-b border-[#D4D4D4] py-1">
                <span className="text-[14px]  2xl:text-[16px] 3xl:text-[18px]">
                  Gas fees rebates
                </span>
                <span className="text-[14px] font-[700] text-darkGray 2xl:text-[14px] 3xl:text-[18px]">
                  ~${GAS_FEES_REBATES.toFixed(2)}
                </span>
              </motion.div>
              <motion.div 
              variants={itemVariants(0.3)}
               initial="hidden"
            whileInView="visible"
            viewport={{once:true}}
              className="my-8 flex items-center justify-between border-b border-[#D4D4D4] py-1">
                <span className="text-[14px]  2xl:text-[14px] 3xl:text-[18px]">
                  Chain rewards
                </span>
                <span className="text-[14px] font-[700] text-darkGray 2xl:text-[14px] 3xl:text-[18px]">
                  ~${CHAIN_REWARDS.toFixed(2)}
                </span>
              </motion.div>

              <motion.div
              variants={itemVariants(0.35)}
               initial="hidden"
            whileInView="visible"
            viewport={{once:true}}
              className="flex items-center justify-between border-b border-[#D4D4D4] pb-10 pt-1">
                <span className="text-[14px] font-medium  2xl:text-[14px] 3xl:text-[18px]">
                  Sub Total
                </span>
                <span className="text-2xl font-[700] text-darkGray">
                  $
                  {(
                    AVE_MONTHLY_REWARDS +
                    GAS_FEES_REBATES +
                    CHAIN_REWARDS
                  ).toFixed(2)}
                  /<span className="text-[16px]">mo</span>
                </span>
              </motion.div>
            </>
          )}
          {selectedAIModel &&
            selectedProvider &&
            selectedTokenization &&
            final_amount && (
              <>
                <motion.div variants={itemVariants(0.05)} 
                 initial="hidden"
            whileInView="visible"
            viewport={{once:true}}
                className="mb-6 mt-6 rounded-md bg-[#EEEEEE] px-4 py-2 text-left text-[16px] 3xl:text-[21px] font-[400]">
                  Summary
                </motion.div>
                <motion.div
                variants={itemVariants(0.1)}
                 initial="hidden"
            whileInView="visible"
            viewport={{once:true}}
                className="my-8 flex items-center justify-between border-b border-[#D4D4D4] py-2">
                  <span className="text-[14px]  2xl:text-[14px] 3xl:text-[18px]">
                    --
                  </span>

                  <span className="text-[14px] font-[700] text-darkGray 2xl:text-[14px] 3xl:text-[18px]">
                    $00.00
                  </span>
                </motion.div>

                <motion.div
                variants={itemVariants(0.15)}
                 initial="hidden"
                 viewport={{once:true}}
            whileInView="visible"
                className="my-8 flex items-center justify-between border-b border-[#D4D4D4] py-2">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-[14px]  2xl:text-[14px] 3xl:text-[18px]">
                      App staking rewards
                    </span>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5A5A5A] text-xs text-white">
                      ?
                    </span>
                  </div>

                  <span className="text-[14px] font-[700] text-darkGray 2xl:text-[14px] 3xl:text-[18px]">
                    {APP_STAKING_REWARDS_PERCENTAGE}%
                  </span>
                </motion.div>
                <motion.div
                 variants={itemVariants(0.2)}
                  initial="hidden"
            whileInView="visible"
            viewport={{once:true}}
                className="my-8 flex items-center justify-between border-b border-[#D4D4D4] py-1">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-[14px]  2xl:text-[14px] 3xl:text-[18px]">
                      Tot. Montly rewards
                    </span>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5A5A5A] text-xs text-white">
                      ?
                    </span>
                  </div>
                  <span className="text-[14px] font-[700] text-darkGray 2xl:text-[14px] 3xl:text-[18px]">
                    {APP_STAKING_REWARDS_PERCENTAGE}%
                  </span>
                </motion.div>
                <motion.div
                 variants={itemVariants(0.25)}
                  initial="hidden"
            whileInView="visible"
            viewport={{once:true}}
                className="my-8 flex items-center justify-between border-b border-[#D4D4D4] py-1">
                  <p className="text-[14px]  2xl:text-[14px] 3xl:text-[18px]">
                    Total Savings
                  </p>
                  <p className="text-[14px] text-[#01CA1F] 2xl:text-[14px] 3xl:text-[18px]">
                    $0.00/mo
                  </p>
                </motion.div>

                <motion.div 
                 variants={itemVariants(0.3)}
                  initial="hidden"
            whileInView="visible"
            viewport={{once:true}}
                className="flex items-center justify-between border-b border-[#D4D4D4] pb-10 pt-2">
                  <span className="text-[14px] font-medium  2xl:text-[16px] 3xl:text-[18px]">
                    Sub Total
                  </span>
                  <span className="text-2xl font-[700] text-[#0058FF]">
                    $
                    {(
                      AVE_MONTHLY_REWARDS +
                      GAS_FEES_REBATES +
                      CHAIN_REWARDS
                    ).toFixed(2)}
                    /<span className="text-[20px] text-[#4D4D4D]">mo</span>
                  </span>
                </motion.div>
              </>
            )}

          {!final_amount && (
            <div className="my-6 border-b border-[#D4D4D4] text-end">
              <motion.p
               variants={itemVariants(0.35)}
                initial="hidden"
            whileInView="visible"
            viewport={{once:true}}
               className="text-[20px] font-[700] text-[#0058FF] 2xl:text-2xl 3xl:text-[44.91px]">
                ${monthlyRate.toFixed(2)}/
                <span className="text-[20px] font-[700]">mo</span>
              </motion.p>
              <motion.p
               variants={itemVariants(0.4)}
                initial="hidden"
            whileInView="visible"
            viewport={{once:true}}
               className="mt-1 text-[14px] text-[#236FFD]">
                That’s about ${hourlyRate.toFixed(2)} hourly
              </motion.p>
              <motion.div
               variants={itemVariants(0.45)}
                initial="hidden"
            whileInView="visible"
            viewport={{once:true}}
              className="flex items-center justify-end gap-14 pb-8 pt-4">
                <p className="text-sm font-medium text-[#8E8E8E]">
                  Total Savings
                </p>
                <p className="text-[16px] font-[400] text-[#01CA1F]">$0.00/mo</p>
              </motion.div>
            </div>
          )}

          <motion.button
           variants={itemVariants(0.5)}
            initial="hidden"
            whileInView="visible"
          
            viewport={{once:true}}
            className={`mt-6 w-full rounded-md py-2 text-white  ${selectedAIModel && selectedProvider && selectedTokenization && final_amount ? 'bg-[#0058FF]' : 'bg-[#0058FF]/50 opacity-10 cursor-not-allowed'}`}
            onClick={() => {
              setDeploying(true)
              deployOnDemo()
                .catch(console.error)
                .finally(() => console.log('Deploying'))
            }}
          >
            Deploy
          </motion.button>
        </div>
      </motion.div>
      
    </div>
  )
}
