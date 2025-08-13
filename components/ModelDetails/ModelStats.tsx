'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface ModelStatsProps {
  likes: string | number
  users: string | number
  trending: string | boolean
  apy: string | number
  deploy?: boolean
  setDeploy?: React.Dispatch<React.SetStateAction<boolean>>
}

export function ModelStats({
  likes,
  users,
  trending,
  apy,
  deploy,
  setDeploy,
}: ModelStatsProps) {
  return (
    <>
      <div className="mx-0 bg-white md:mx-2">
        <div className="relative mx-auto px-0 py-4 md:px-0 md:py-6 lg:px-8">
          <div className="items-left flex flex-col justify-between gap-4 sm:flex-row sm:gap-6">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start sm:gap-6 lg:gap-8">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex items-center space-x-4 rounded-xl bg-[#F1F7FF] px-4 py-2"
              >
                <motion.span
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-base font-semibold text-[#313131] sm:text-lg"
                >
                  {likes}
                </motion.span>

                <motion.img
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  src="/images/project/hero/heart.svg"
                  alt="Heart icon"
                  className="h-5 w-5 text-red-500"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex items-center space-x-4 rounded-xl bg-[#F1F7FF] px-4 py-2"
              >
                <motion.span
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-base font-semibold text-[#313131] sm:text-lg"
                >
                  {users}
                </motion.span>
                <div className="text-blue-500">
                  <motion.img
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    src="/images/project/hero/person.svg"
                    alt="Heart icon"
                    className="h-5 w-5 text-red-500"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex items-center space-x-4 rounded-xl bg-[#F1F7FF] px-4 py-2"
              >
                <motion.span
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-base font-semibold text-[#313131] sm:text-lg"
                >
                  {trending}
                </motion.span>
                <div className="text-purple-500">
                  <motion.img
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    src="/images/project/hero/trending.svg"
                    alt="Heart icon"
                    className="h-5 w-5 text-red-500"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex items-center"
              >
                <motion.span
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="whitespace-nowrap rounded bg-[#8CD417] px-3 py-1 text-sm font-bold text-white sm:px-4 sm:py-2 sm:text-base lg:text-lg"
                >
                  {apy} % APY
                </motion.span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
