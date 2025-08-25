'use client'
import Image from "next/image"
import { motion } from "framer-motion";
import { Edit } from "lucide-react";

interface ModelHeaderProps {
    image: string
    title: string
    subtitle: string
}

export function ModelHeader({ image, title, subtitle }: ModelHeaderProps) {
    return (
        <div className="px-3">

            <motion.div
                initial={{ opacity: 0, scale: 0.87, x: 30 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.5 }}
                className="relative group rounded-2xl lg:mx-2 mt-10 overflow-hidden aspect-[5/3] lg:aspect-[5/2]"
            >
                <Image
                    src={image}
                    alt={title}
                    fill
                    priority
                    className="absolute transition-transform duration-1000 ease-in-out group-hover:scale-105 lg:h-full lg:w-full"
                />
            </motion.div>


            <div className="flex justify-between items-center mt-6 px-2 sm:px-4 lg:px-2 ">
                <div>
                    <motion.h1
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-2xl font-semibold text-[#1F1F1F] leading-tight sm:text-4xl md:text-5xl lg:text-5xl"
                    >
                        {title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-base text-[#8F8F8F] lg:text-xl"
                    >
                        {subtitle}
                    </motion.p>
                </div>


                <button className="p-2 rounded-full hover:bg-gray-100 transition">
                    <Edit className="h-5 w-5 text-[#3D3D3D] font-bold" />

                </button>

            </div>
        </div>
    )
}
