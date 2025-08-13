'use client'

import { motion } from 'framer-motion'

import { CardContent } from '@/components/ui/card'

interface ModelContentProps {
  description: string
  concept: string
  howItWorks: {
    step: number
    description: string
  }[]
}


export function ModelContent({
  description,
  concept,
  howItWorks,
}: ModelContentProps) {
  return (
    <div className="bg-transparent shadow-transparent">
      <CardContent className="space-y-4 p-2 sm:space-y-6 md:p-4">
        <div className="space-y-3 sm:space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-sm leading-relaxed text-[#393939] sm:text-base"
          >
            {description}
          </motion.p>
        </div>
        <div className="space-y-3 sm:space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-sm leading-relaxed text-[#393939] sm:text-base"
          >
            Concept: {concept}
          </motion.p>
        </div>
        <div className="space-y-3 sm:space-y-4">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg text-[#393939] sm:text-xl"
          >
            How It Works (for Users):
          </motion.h3>
          <div className="space-y-2 sm:space-y-3">
            {howItWorks.map((item, i) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                key={item.step}
                className="flex items-start space-x-3"
              >
                <div className="flex size-5 shrink-0 items-center justify-center rounded-full text-xs text-black sm:size-6 sm:text-sm">
                  {item.step}.
                </div>
                <p className="text-sm text-[#393939] sm:text-base">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </div>
  )
}
