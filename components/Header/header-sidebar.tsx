"use client"
import React, { useState, useEffect } from 'react'
import { Search, X, User2, } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { navItems, type NavItem } from '@/config/nav'
import { Input } from '../ui/input'
import { useAccount } from 'wagmi'
import { useDemoModeContext } from '../demo-mode'
import { formatAddress } from '@/utils/functions'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useXueNfts, useXuNfts } from '@/utils/nft'
import { useXnodes } from '@/app/dashboard/health-data'

import ActivateXNodeDialog from '../xnode/activate-dialog'
import {
  useSelectedXNode,
  type SelectedXnode,
} from '@/components/selected-xnode'

import { mockXNodes } from '@/config/demo-mode'
interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  sessionToken?: string
}

const Sidebar = ({ isOpen, onClose, sessionToken }: SidebarProps) => {

  const { address, status } = useAccount()
  const [search, setSearch] = useState('')
  const { data: activeXNodes } = useXuNfts(address)
  const { data: inactiveXNodes } = useXueNfts(address)
  const { data: deployedXnodes } = useXnodes(sessionToken)
  const { demoMode, setDemoMode } = useDemoModeContext()
  const pathname = usePathname()
  const { open } = useWeb3Modal()
  const { push } = useRouter()
  const pressWalletButton = () => {
    if (window.location.pathname.endsWith('login')) {

      open()
      return
    }

    push('/login')
  }
  const allXnodes: SelectedXnode[] = demoMode
    ? mockXNodes.map((xnode) => {
      return { type: 'Unit', id: BigInt(xnode.deploymentAuth) }
    })
    : (deployedXnodes ?? [])
      .filter(
        (xnode) =>
          !xnode.isUnit ||
          !activeXNodes?.includes(BigInt(xnode.deploymentAuth))
      )
      .map((xnode) => {
        if (xnode.isUnit) {
          return {
            type: 'Unit',
            id: BigInt(xnode.deploymentAuth),
          } as SelectedXnode
        }
        return { type: 'Custom', id: xnode.id } as SelectedXnode
      })
      .concat(
        (activeXNodes ?? []).map((nftId) => {
          return { type: 'Unit', id: nftId } as SelectedXnode
        })
      )

  const { selectedXNode, selectXNode } = useSelectedXNode()

  useEffect(() => {
    if (!allXnodes.length) {

      selectXNode(null)
      return
    }

    if (
      selectedXNode &&
      allXnodes.some(
        (xnode) =>
          xnode.type === selectedXNode.type && xnode.id === selectedXNode.id
      )
    ) {

      return
    }

    selectXNode(allXnodes.at(0))
  }, [selectedXNode, selectXNode, allXnodes])

  const totalNodes = (activeXNodes?.length ?? 0) + (inactiveXNodes?.length ?? 0)

  const [activationOpen, setActivationOpen] = useState<bigint | undefined>(
    undefined
  )

  return (
    <div >
      <ActivateXNodeDialog
        address={address}
        open={!!activationOpen}
        onOpenChange={() => setActivationOpen(undefined)}
        entitlementNft={activationOpen}
      />

      <div
        className={cn(
          "will-change-opacity fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-all duration-300 ease-in-out",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
      />

      <div
        className={cn(
          'hide-scrollbar fixed left-0 top-0 z-50 h-full w-80 overflow-y-scroll bg-white px-6 shadow-lg transition-all delay-200 duration-500 ease-in-out will-change-transform',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >


        <div className="flex items-center gap-2 py-8">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="size-5 text-[#1C1E2A]" />
          </button>
          <div className="shrink-0 text-[25px] font-[500] text-[#1C1E2A]">
            OpenxAI

            <sup className="relative -top-[8px] left-1 text-xs font-normal text-[#1C1E2A]">
              Studio
            </sup>
          </div>
        </div>

        <div className="mb-6 flex h-12 items-center rounded-[10px] border border-[#B8B8B8] px-4">
          <Search className="size-4 text-[#8F8F8F]" />
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border-none bg-transparent text-[16px] text-[#8F8F8F] outline-none placeholder:text-[#8F8F8F] focus:border-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Search apps.."
          />
        </div>

        <nav className="space-y-1">
          {navItems.main
            .filter((item) =>
              item.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((item) => {
              const isActive = item?.href === '/'
                ? pathname === item?.href || pathname.startsWith('/collection')
                : pathname.startsWith(item?.href)

              return (
                <Link
                  key={`${item.name}-${item.href}`}
                  href={item?.href}
                  target={item?.href.startsWith('https://') ? '_blank' : undefined}
                  className={cn(
                    "flex h-10 items-center gap-4 rounded-sm  py-6 text-foreground transition-colors"

                  )}
                >
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={25}
                    height={25}
                    className={cn(
                      'size-5 shrink-0 transition-colors',
                      isActive && 'filter-blue'
                    )}
                  />
                  <span className={cn('text-[16px] text-[#525252]',isActive ? 'text-blue-600':'text-[#525252]')}>{item.name}</span>
                </Link>
              )
            })}
        </nav>
        <div className="my-10 flex items-center  gap-4 text-left">
          <Image src='/images/heart.svg' alt="" width={10} height={10} className="size-5 shrink-0" />
          <div className="text-[16px] text-[#525252]">
            <div>Made & Powered by Xnode</div>

          </div>
        </div>
        <div className='flex items-center gap-4'>
          <Image src='/images/header/notification.svg' alt="" width={20} height={20} className='cursor-pointer' />
          <Image src='/images/header/help.svg' alt="" width={20} height={20} className='cursor-pointer' />
          <Image src='/images/header/settings.svg' alt="" width={20} height={20} className='cursor-pointer' />
        </div>
        {!address && status === 'disconnected' && !demoMode ? (
          <button
            type="button"
            className="my-8 flex h-fit items-center gap-0 rounded bg-primary px-4 text-base font-semibold tracking-tighter text-background max-hdplus:h-8 max-hdplus:text-sm lg:h-10 lg:gap-1.5"
            onClick={pressWalletButton}
          >
            Connect Wallet
          </button>
        ) : (
          <button
            type="button"
            className="my-8 flex h-10 items-center gap-1.5 rounded-lg bg-[#313449] px-10 text-sm text-background"
            onClick={pressWalletButton}
          >

            {demoMode ? (
              'DEMO'
            ) : address && status === 'connected' ? (
              formatAddress(address)
            ) : (
              <span className="h-6 w-20 animate-pulse rounded bg-white/20" />
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export default Sidebar