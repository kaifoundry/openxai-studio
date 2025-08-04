'use client'

interface ModelHeaderProps {
    title: string
    subtitle: string
}

export function ModelHeader({ title, subtitle }: ModelHeaderProps) {
    return (
        <>
            <div className="relative  text-white overflow-hidden mt-10 md:mx-8 mx-2 ">

                <img src="/images/project/hero/Rectangle.png" alt="" className="w-full h-full absolute" />

                <div className="relative  mx-auto px-4 sm:px-2 lg:px-8 py-8 sm:py-12 lg:py-16">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

                        <div className="flex-1 max-w-2xl text-center lg:text-left">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 leading-tight">
                                {title}
                            </h1>
                            <p className="text-base sm:text-lg lg:text-xl text-gray-300">
                                {subtitle}
                            </p>
                        </div>

                    </div>
                </div>

            </div>

        </>
    )
} 