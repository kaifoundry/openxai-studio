'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Edit } from 'lucide-react'
import { useAccount } from 'wagmi'

import EditProfile from '@/components/UserProfile/edit-profile'

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
  const { address, isConnected } = useAccount()

  const displayAddress = isConnected ? address : ''
  function formatAddress(address?: string): string {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="mb-6 w-full px-2 lg:px-6">
      <div className="mb-10 text-xl font-medium text-[#525252]">
        User Profile
      </div>
      <div className="flex justify-between">
        <div className="flex items-start gap-4 lg:gap-12">
          {currentImage ? (
            <Image
              src={currentImage}
              alt={displayName}
              width={200}
              height={200}
              className="size-28 rounded-xl bg-[#73C255] object-cover md:size-32 lg:size-40 xl:size-44 2xl:size-52 3xl:size-80"
            />
          ) : (
            <div className="relative size-28 overflow-hidden rounded-xl bg-[#73C255] md:size-32 lg:size-40 xl:size-44 2xl:size-52 3xl:size-80">
              <div className="flex size-full items-center justify-center text-2xl font-semibold text-green-900">
                {displayName.charAt(0)}
              </div>
            </div>
          )}

          <div className="flex flex-col justify-start">
            <div className="text-lg font-semibold leading-6 text-[#1F1F1F] lg:text-xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl">
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
          // setCurrentName(name)
          // setCurrentImage(imageUrl ?? undefined)
          if (!address) return
            const res = await fetch('/api/users', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                address,
                name,
                profilePic: imageUrl,
              }),
            })
            const data = await res.json()
            if (data.success && data.user) {
              setCurrentName(data.user.name)
              setCurrentImage(data.user.profilePic)
            }
        }}
      />
    </div>
  )
}

export default UserProfileDetails
