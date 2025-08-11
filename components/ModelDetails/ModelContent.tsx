'use client'

import { CardContent } from '@/components/ui/card'

interface ModelContentProps {
    description: string
    concept: string
    howItWorks: {
        step: number
        description: string
    }[]
}

export function ModelContent({ description, concept, howItWorks }: ModelContentProps) {
    return (
        <div className="bg-transparent shadow-transparent">
            <CardContent className="p-2 md:p-4 space-y-4 sm:space-y-6">
                <div className="space-y-3 sm:space-y-4">

                    <p className="text-sm sm:text-base text-[#393939] leading-relaxed">{description}</p>
                </div>
                <div className="space-y-3 sm:space-y-4">

                    <p className="text-sm sm:text-base text-[#393939] leading-relaxed">Concept: {concept}</p>
                </div>
                <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-lg sm:text-xl text-[#393939]">How It Works (for Users):</h3>
                    <div className="space-y-2 sm:space-y-3">
                        {howItWorks.map((item) => (
                            <div key={item.step} className="flex items-start space-x-3">
                                <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 text-black rounded-full flex items-center justify-center text-xs sm:text-sm ">
                                    {item.step}.
                                </div>
                                <p className="text-sm sm:text-base text-[#393939]">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </div>
    )
} 