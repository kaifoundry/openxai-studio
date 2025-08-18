'use client'

import Image from 'next/image'

interface ModelHeaderProps {
  image: string
  title: string
  subtitle: string
}

export function ModelHeader({ image, title, subtitle }: ModelHeaderProps) {
  return (
    <>
      <div className="relative mx-2 mt-10 overflow-hidden text-white md:mx-8">
        <Image
          src={image}
          alt={title}
          fill 
          priority
          className="absolute inset-0 h-full w-full rounded-2xl object-cover"
        />

        <div className="relative mx-auto px-4 py-8 sm:px-2 sm:py-12 lg:px-8 lg:py-16">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div className="max-w-2xl flex-1 text-center lg:text-left">
              <h1 className="mb-2 text-3xl font-bold leading-tight sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="text-base text-gray-300 sm:text-lg lg:text-xl">
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
