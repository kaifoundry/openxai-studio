'use client'
interface ModelHeaderProps {
    title: string
    subtitle: string
}
import { motion } from "framer-motion";

export function ModelHeader({ title, subtitle }: ModelHeaderProps) {
    return (
        <>
            <motion.div 
            initial={{ opacity: 0,scale:0.87, x: 30 }}
            whileInView={{ opacity: 1,scale:1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true,amount:0.5 }}
            className="relative group rounded-2xl  mx-2 mt-10 overflow-hidden text-white md:mx-8 ">

                <img src="/images/project/hero/Rectangle.png" alt="" className="absolute transition-transform duration-1000 ease-in-out group-hover:scale-110 group-hover:-translate-x-5  h-full w-full" />

                <div className="relative  mx-auto px-4 py-8 sm:px-2 sm:py-12 lg:px-8 lg:py-16">
                    <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">

                        <div className="max-w-2xl flex-1 text-center lg:text-left">
                            <motion.h1 
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="mb-2 text-3xl font-bold leading-tight sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl">
                                {title}
                            </motion.h1>
                            <motion.p 
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8,delay:0.2 }}
                            viewport={{ once: true }}
                            className="text-base text-gray-300 sm:text-lg lg:text-xl">
                                {subtitle}
                            </motion.p>
                        </div>

                    </div>
                </div>

            </motion.div>

        </>
    )
} 