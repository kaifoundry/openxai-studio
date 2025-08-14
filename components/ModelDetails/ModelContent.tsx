'use client'

import { motion } from 'framer-motion'
import { CardContent } from '@/components/ui/card'
import { useState, useEffect, useRef } from 'react'

interface ModelContentProps {
  description: string
  concept: string
  howItWorks: {
    step: number
    description: string
  }[]
}

// Hook to split text into lines based on container width
function useTextLines(text: string, containerRef: React.RefObject<HTMLElement>, prefix: string = '') {
  const [lines, setLines] = useState<string[]>([])

  useEffect(() => {
    if (!containerRef.current || !text) return

    const container = containerRef.current
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    
    if (!context) return

    // Get computed styles
    const styles = window.getComputedStyle(container)
    const fontSize = styles.fontSize
    const fontFamily = styles.fontFamily
    const fontWeight = styles.fontWeight
    
    context.font = `${fontWeight} ${fontSize} ${fontFamily}`
    
    const containerWidth = container.offsetWidth
    const words = text.split(' ')
    const textLines: string[] = []
    let currentLine = ''
    let isFirstLine = true

    words.forEach((word) => {
      const testLine = currentLine ? `${currentLine} ${word}` : word
      // Include prefix width for first line calculation
      const testLineWithPrefix = isFirstLine && prefix ? `${prefix}${testLine}` : testLine
      const testWidth = context.measureText(testLineWithPrefix).width
      
      if (testWidth > containerWidth - 32 && currentLine) { // 32px for padding
        textLines.push(currentLine)
        currentLine = word
        isFirstLine = false
      } else {
        currentLine = testLine
      }
    })
    
    if (currentLine) {
      textLines.push(currentLine)
    }
    
    setLines(textLines)
  }, [text, containerRef, prefix])

  return lines
}

// Component for line-by-line animated text
function AnimatedText({ 
  text, 
  className, 
  initialDelay = 0,
  prefix = ''
}: { 
  text: string
  className: string
  initialDelay?: number
  prefix?: string
}) {
  const containerRef = useRef<HTMLParagraphElement>(null)
  const lines = useTextLines(text, containerRef, prefix)

  return (
    <motion.p
      ref={containerRef}
      className={className}
      initial={{ opacity: 1 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {lines.map((line, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: initialDelay + (index * 0.15)
          }}
          viewport={{ once: true }}
          className="block"
        >
          {index === 0 && prefix && (
            <span>{prefix}</span>
          )}
          {line}
        </motion.span>
      ))}
    </motion.p>
  )
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
          <AnimatedText
            text={description}
            className="text-sm leading-relaxed text-[#393939] sm:text-base"
            initialDelay={0.3}
          />
        </div>
        
        <div className="space-y-3 sm:space-y-4">
          <AnimatedText
            text={concept}
            className="text-sm leading-relaxed text-[#393939] sm:text-base"
            initialDelay={0.6}
            prefix="Concept: "
          />
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
                transition={{ duration: 0.8, delay: 0.6 + (i * 0.1) }}
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