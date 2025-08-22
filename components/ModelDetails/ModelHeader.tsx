'use client'
import Image from "next/image"
interface ModelHeaderProps {
    image: string
    title: string
    subtitle: string
}
import { motion } from "framer-motion";

export function ModelHeader({ image, title, subtitle }: ModelHeaderProps) {
    return (
        <div className="px-3">
            <motion.div
                initial={{ opacity: 0, scale: 0.87, x: 30 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.5 }}
                className="relative group rounded-2xl  lg:mx-2 mt-10 overflow-hidden text-white md:mx-8 
              aspect-[5/3] lg:aspect-[5/2] ">

                <Image
                    src={image}
                    alt={title}
                    fill
                    priority
                    className="absolute transition-transform duration-1000  ease-in-out group-hover:scale-105   lg:h-full lg:w-full" />

                <div className="relative flex items-end  px-2 py-8  sm:py-12 lg:px-8 lg:py-16  h-full">
                    <div className="flex flex-col gap-8 ">

                        <div className=" ">
                            <motion.h1
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="lg:mb-2 text-2xl font-bold leading-tight sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl">
                                {title}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="text-base text-gray-300  lg:text-xl">
                                {subtitle}
                            </motion.p>
                        </div>

                    </div>
                </div>

            </motion.div>

        </div>
    )
} 