import { motion } from 'framer-motion'
import { CardContent } from '@/components/ui/card'
import { useState, useEffect, useRef, useCallback } from 'react'

interface ModelContentProps {
  description: string
  concept: string
  howItWorks: {
    step: number
    description: string
  }[]
}

function useTextLines(text: string, containerRef: React.RefObject<HTMLElement>, prefix: string = '') {
  const [lines, setLines] = useState<string[]>([])

  const calculateLines = useCallback(() => {
    if (!containerRef.current || !text) return

    const container = containerRef.current
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    
    if (!context) return

    const styles = window.getComputedStyle(container)
    const fontSize = styles.fontSize
    const fontFamily = styles.fontFamily
    const fontWeight = styles.fontWeight
    
    context.font = `${fontWeight} ${fontSize} ${fontFamily}`
    
    // Get current container width (important for responsiveness)
    const containerWidth = container.getBoundingClientRect().width
    const words = text.split(' ')
    const textLines: string[] = []
    let currentLine = ''
    let isFirstLine = true

    words.forEach((word) => {
      const testLine = currentLine ? `${currentLine} ${word}` : word
  
      const testLineWithPrefix = isFirstLine && prefix ? `${prefix}${testLine}` : testLine
      const testWidth = context.measureText(testLineWithPrefix).width
      
      
      const availableWidth = containerWidth - 0 
      
      if (testWidth > availableWidth && currentLine) { 
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
  }, [text, prefix])

  useEffect(() => {
    
    calculateLines()

  
    const handleResize = () => {
      calculateLines()
    }

  
    window.addEventListener('resize', handleResize)
    
 
    window.addEventListener('orientationchange', () => {
  
      setTimeout(calculateLines, 100)
    })


    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [calculateLines])

  
  useEffect(() => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        setTimeout(calculateLines, 50)
      })
    }
  }, [calculateLines])

  return lines
}

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
          key={`${line}-${index}`} 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: initialDelay + (index * 0.15)
          }}
          viewport={{ once: true }}
          className=" text-[12px] lg:text-[16px] w-full"
        >
          {index === 0 && prefix && (
            <span className="font-medium">{prefix}</span>
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
    <div className="bg-transparent shadow-transparent w-full">
      <CardContent className="space-y-4  sm:space-y-6 px-2 md:px-0 w-full">
        <div className="space-y-3 sm:space-y-4 w-full">
          
          <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8,  }}
          viewport={{ once: true }}
          className=" leading-relaxed text-[#393939] sm:text-[16px] md:text-md w-full break-words"
          >
            {description}
          </motion.div>
        </div>
        
        <div className="space-y-3 sm:space-y-4 w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8,  }}
          viewport={{ once: true }}
          className=" leading-relaxed text-[#393939] text-[16px] md:text-md w-full break-words"
          >
           Concept: {concept}
          </motion.div>
        </div>
        
        <div className="space-y-3 sm:space-y-4 w-full">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, }}
            viewport={{ once: true }}
            className="font-semibold text-[#393939] text-[16px] md:text-md"
          >
            How It Works (for Users):
          </motion.h3>
          <div className="space-y-2 sm:space-y-3 w-full">
            {howItWorks.map((item, i) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + (i * 0.1) }}
                viewport={{ once: true }}
                key={`step-${item.step}`}
                className="flex items-start space-x-3 w-full"
              >
                <div className="flex size-5 shrink-0 items-center justify-center rounded-full text-xs text-black sm:size-6 sm:text-sm">
                  {item.step}.
                </div>
                <p className=" text-[#393939] text-[16px] md:text-md">
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