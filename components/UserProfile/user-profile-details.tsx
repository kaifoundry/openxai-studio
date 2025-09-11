'use client'
import React from 'react'
import Image from 'next/image'
import { useAccount } from 'wagmi'

import { Edit } from "lucide-react";
import EditProfile from '@/components/UserProfile/edit-profile'
import { useState } from 'react'

interface UserProfileDetailsProps {
    name?: string
    image?: string
    walletShort?: string
    joined?: string
}

const UserProfileDetails = ({
    name,
    image,
    walletShort = '0x74...6504',
    joined = 'Joined Aug 24',
}: UserProfileDetailsProps) => {
    const [open, setOpen] = useState(false)
    const [currentName, setCurrentName] = useState<string>(name || 'Sam Lee')
    const [currentImage, setCurrentImage] = useState<string | undefined>(image)
    const displayName = currentName
    const { address, isConnected } = useAccount();

    const displayAddress = isConnected ? address : "";
    function formatAddress(address?: string): string {
        if (!address) return "";
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }


    return (
        <div className="w-full lg:px-6 px-2 ">
            <div className="mb-10 text-xl font-medium text-[#525252]">User Profile</div>
            <div className="flex justify-between">

                <div className="flex items-start lg:gap-12 gap-4">
                    {currentImage ? (
                        <Image
                            src={currentImage}
                            alt={displayName}
                            width={200}
                            height={200}
                            className="size-100 rounded-xl bg-[#73C255] object-cover"
                        />
                    ) : (
                        <div className="relative size-60 overflow-hidden bg-green-200">
                            <div className="flex size-full items-center justify-center text-2xl font-semibold text-green-900">
                                {displayName.charAt(0)}
                            </div>
                        </div>
                    )}


                    <div className="flex flex-col justify-start">
                        <div className="lg:text-3xl text-3xl xl:text-4xl 2xl:text-5xl font-semibold leading-6 text-[#1F1F1F]">
                            {displayName}
                        </div>
                        <div className="mt-6 flex items-center gap-6">
                            <span className="rounded-[10px] bg-[#EBF2FF] px-3 py-2 text-[16px] font-[400] text-[#3D3D3D]">
                                {isConnected ? formatAddress(address) : walletShort}
                            </span>


                            <span className="rounded-[10px] bg-[#EBF2FF] px-3 py-2 text-[16px] font-[400] text-[#3D3D3D]">
                                {joined}
                            </span>
                        </div>
                    </div>
                </div>

                <button
                    aria-label="Share profile"
                    className="inline-flex items-start justify-center text-[#111111]"
                    onClick={() => setOpen(true)}
                >
                    <Edit className="size-6" />
                </button>
            </div>
            <EditProfile
                open={open}
                onOpenChange={setOpen}
                defaultName={currentName}
                defaultImage={currentImage}
                onSave={async ({ name, imageUrl }) => {
                    setCurrentName(name)
                    setCurrentImage(imageUrl ?? undefined)
                }}
            />
        </div>
    )
}

export default UserProfileDetails