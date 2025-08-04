'use client'
import { Edit } from 'lucide-react'
import { Button } from '../ui/button'

interface ModelStatsProps {
    likes: string | number;
    users: string | number;
    trending: string | boolean;
    apy: string | number;
    deploy?: boolean;
    setDeploy?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ModelStats({ likes, users, trending, apy, deploy, setDeploy }: ModelStatsProps) {

    return (
        <>

            <div className='relative mb-2  flex justify-start md:px-6 px-4 '>


                {/* {!deploy && (<div className="flex items-center gap-6 p-6 ml-[-8]">

                    <button className="flex items-center gap-2 bg-[#0059FF] text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                        onClick={() => { setDeploy(true) }}
                    >
                        <span className="bg-[#669bff] text-white rounded-sm w-5 h-5 flex items-center justify-center text-sm font-bold">
                            +
                        </span>
                        Deploy Now (2 min)
                    </button>

                    <a
                        href="#"
                        className="text-black underline text-sm font-medium hover:text-gray-700"
                    >
                        Test the app
                    </a>
                </div>)}
                {deploy && (
                    <div className="  mb-4 self-end flex justify-end w-full mr-4 ">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-black text-xs sm:text-sm hover:underline hover:underline-offset-1 "
                        >
                            Edit
                        </Button>
                    </div>
                )} */}


            </div>
            <div className="bg-white md:mx-2 mx-0">
                <div className=" relative mx-auto px-0 md:px-0 lg:px-8 md:py-6 py-4">


                    <div className="flex flex-col sm:flex-row items-left justify-between gap-4 sm:gap-6">
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 lg:gap-8">


                            <div className="flex items-center space-x-4 rounded-xl px-4 py-2 bg-[#F1F7FF]">
                                <span className="text-base sm:text-lg font-semibold text-[#313131]">{likes}</span>
                                <div className="text-red-500">

                                    <img
                                        src="/images/project/hero/heart.svg"
                                        alt="Heart icon"
                                        className="w-5 h-5 text-red-500"
                                    />
                                </div>

                            </div>


                            <div className="flex items-center space-x-4 rounded-xl px-4 py-2 bg-[#F1F7FF]">
                                <span className="text-base sm:text-lg font-semibold text-[#313131]">{users}</span>
                                <div className="text-blue-500">
                                    <img
                                        src="/images/project/hero/person.svg"
                                        alt="Heart icon"
                                        className="w-5 h-5 text-red-500"
                                    />
                                </div>

                            </div>


                            <div className="flex items-center space-x-4 rounded-xl px-4 py-2 bg-[#F1F7FF]">
                                <span className="text-base sm:text-lg font-semibold text-[#313131]">{trending}</span>
                                <div className="text-purple-500">

                                    <img
                                        src="/images/project/hero/trending.svg"
                                        alt="Heart icon"
                                        className="w-5 h-5 text-red-500"
                                    />
                                </div>

                            </div>


                            <div className="flex items-center">
                                <button className="bg-[#8CD417] text-white text-sm sm:text-base lg:text-lg px-3 sm:px-4 py-1 sm:py-2 font-bold whitespace-nowrap rounded">
                                    {apy} % APY
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
