'use client'

import React, { useState,useEffect } from 'react'
import Image from 'next/image'
import { formatAddress } from '@/utils/functions'
import { Check, X } from 'lucide-react'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Dialog, DialogContent } from '@/components/ui/dialog'

import DeploymentProvider from '../../app/deploy/deployment-provider'

type Provider = {
  name?: string
  icon?: string
  features?: string[]
  action?: {
    label?: string
    price?: string
  }
  disabled?: boolean
  comingSoon?: boolean
  isDecentralized?: boolean
  address?: string
  Base?: string
}

interface ProviderSelectorProps {
  selected?: Provider
  showAll?: boolean
  onSelect: (provider: Provider) => void
  setExpandedItem: (value: string | null) => void
}

const Hosting = ({ selected, onSelect,setExpandedItem }: ProviderSelectorProps) => {
  const [showExtendedOptions, setShowExtendedOptions] = useState(false)
  const { address, isConnected, status } = useAccount()
  const { push } = useRouter()
  const providers: Provider[] = [
    {
      name: 'Xnode',
      icon: '/images/xnode-logo/xnode-cube.png',
      features: ['Web3 Ready', 'No KYC'],
      action: { label: 'Try for Free' },
      isDecentralized: true,
    },
    {
      name: 'Xnode DVM',
      icon: '/images/xnode-card/silvercard-front.webp',
      features: ['Web3 Ready', 'No KYC'],
      action: { label: '500 OPENX' },
      disabled: true,
      isDecentralized: false,
    },
    {
      name: 'Vultr (Washington)',
      icon: '/images/providers/vultr.svg',
      features: ['Web3 Ready', 'No KYC'],
      action: { label: '$655p/m' },
      disabled: true,
      isDecentralized: false,
    },
    {
      name: 'AWS EC2 (HK)',
      icon: '/images/cloudLogo/aws.png',
      features: ['Web3 Ready', 'No KYC'],
      action: { label: '$1,321p/m' },
      disabled: true,
      isDecentralized: false,
    },
    {
      name: 'Google Cloud (NYC)',
      icon: '/images/cloudLogo/google-cloud.png',
      features: ['Web3 Ready', 'No KYC'],
      action: { label: '$1,745p/m' },
      disabled: true,
      isDecentralized: false,
    },
    {
      name: 'Xnode One (Hardware)',
      icon: '/images/xnode-one/back.png',
      features: ['Web3 Ready', 'No KYC'],
      action: { label: '$0p/m' },
      disabled: true,
      comingSoon: true,
      isDecentralized: true,
    },
  ]

  const XNODEDVMs = [
    {
      name: 'Xnode DVM 1',
      icon: '/images/xnode-card/silvercard-front.webp',
      address:address && formatAddress(address),
      Base: '/images/appStore/svg/chains/ollama.svg',
    },
    {
      name: 'Xnode DVM 2',
      icon: '/images/xnode-card/silvercard-front.webp',
      address:address && formatAddress(address),
      Base: '/images/appStore/svg/chains/ollama.svg',
    },
  ]

  const [selectedNode, setSelectedNode] = useState<Provider | null>(
    isConnected && address ? XNODEDVMs[0] : null
  )
  const [isOpen, setIsOpen] = useState(false)

  useEffect(()=>{
    onSelect(selectedNode)
  },[selectedNode])

  const handleSelect = (node) => {
    setSelectedNode(node)
    setIsOpen(false)
    setExpandedItem(null)
  }


  const pressWalletButton = () => {
    if (window.location.pathname.endsWith('login')) {
      // If we are already on the login page, they probably want the wallet popup
      open()
      return
    }

    push('/login')
  }

  return (
    <div className="grid w-full grid-cols-[20%_10%_70%]">
      <div className="flex flex-col">
        <div className="text-[12px] font-[500] leading-[113%] 2xl:text-[15px] 3xl:text-[20px]">
          I have already a GPU form OpenxAI
        </div>
        <div className="mt-4">
          {isConnected ? (
            <button
              type="button"
              className="flex h-10 w-full items-center rounded bg-primary px-3 text-sm text-background"
              // onClick={pressWalletButton}
            >
              {address && status === 'connected' && (
                <span className="w-full">{formatAddress(address)}</span>
              )}
            </button>
          ) : (
            <button
                type="button"
                className="flex h-10 items-center gap-1.5 rounded bg-primary px-4 text-base font-semibold tracking-tighter text-background max-hdplus:h-8 max-hdplus:text-sm"
                onClick={pressWalletButton}
              >
                Connect Wallet
              </button>
          )}
        </div>
      </div>
      <div className="text-center text-[12px] font-[500] 2xl:text-[15px] 3xl:text-[20px]">
        or
      </div>
      <div className="flex flex-col gap-4">
        {!isConnected ? (
          <div className="grid grid-cols-2 gap-4">
            {providers.map((provider) => (
              <div
                key={provider.name}
                onClick={() =>{setExpandedItem(null); !provider.disabled && onSelect(provider) }}
                className={cn(
                  'relative flex cursor-pointer flex-col rounded-lg border p-6 max-[1550px]:p-4 max-[1350px]:p-3 max-[1250px]:p-2 max-[992px]:p-1.5',
                  'h-[128px] max-[1550px]:h-[120px] max-[1350px]:h-[115px] max-[1250px]:h-[110px] max-[992px]:h-[100px]',
                  selected?.name === provider.name &&
                    'border-primary bg-primary/5',
                  provider.disabled && 'cursor-not-allowed opacity-50'
                )}
              >
                <div
                  className={cn(
                    'mb-6 flex items-center justify-between max-[1550px]:mb-4 max-[1350px]:mb-3 max-[1250px]:mb-2 max-[992px]:mb-1'
                  )}
                >
                  <div className="flex items-center gap-3 max-[1550px]:gap-2.5 max-[1350px]:gap-2 max-[1250px]:gap-1.5 max-[992px]:gap-1">
                    <div
                      className={cn(
                        'max-[1550px]:size-2.75 size-3 rounded-full max-[1350px]:size-2.5 max-[1250px]:size-2 max-[992px]:size-1.5',
                        selected?.name === provider.name
                          ? 'bg-primary'
                          : 'border border-muted-foreground'
                      )}
                    ></div>
                    <div className="max-[1550px]:gap-1.75 flex items-center gap-2 max-[1350px]:gap-1.5 max-[1250px]:gap-1 max-[992px]:gap-0.5">
                      {provider.icon && (
                        <div className="max-[1550px]:size-5.5 relative flex size-6 items-center justify-center max-[1350px]:size-5 max-[1250px]:size-4 max-[992px]:size-3">
                          <Image
                            src={provider.icon}
                            alt={provider.name}
                            width={24}
                            height={24}
                            className="object-contain"
                          />
                        </div>
                      )}
                      <div className="whitespace-nowrap text-lg font-medium max-[1550px]:text-base max-[1350px]:text-sm max-[1250px]:text-xs max-[992px]:text-[10px]">
                        {provider.name}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {provider.name === 'Xnode' ? (
                      <div className="inline-flex overflow-hidden rounded-md max-[1250px]:rounded-[3px] max-[992px]:rounded-[2px]">
                        <div
                          style={{
                            padding: '1px',
                            background:
                              'linear-gradient(to right, #ef4444, #eab308)',
                          }}
                        >
                          <div className="max-[1550px]:py-0.75 max-[992px]:py-0.25 rounded-[0.3rem] bg-white px-3 py-1 dark:bg-black max-[1550px]:px-2.5 max-[1350px]:px-2 max-[1350px]:py-0.5 max-[1250px]:rounded-[0.2rem] max-[1250px]:px-1.5 max-[1250px]:py-0.5 max-[992px]:rounded-[0.15rem] max-[992px]:px-1">
                            <span className="whitespace-nowrap text-sm font-medium text-green-500 max-[1550px]:text-sm max-[1350px]:text-xs max-[1250px]:text-[10px] max-[992px]:text-[8px]">
                              {provider.action.label}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : provider.name === 'Xnode DVM' ? (
                      <div
                        className="max-[1550px]:py-0.75 max-[992px]:py-0.25 whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium text-black max-[1550px]:px-2.5 max-[1550px]:text-sm max-[1350px]:px-2 max-[1350px]:py-0.5 max-[1350px]:text-xs max-[1250px]:rounded-[3px] max-[1250px]:px-1.5 max-[1250px]:py-0.5 max-[1250px]:text-[10px] max-[992px]:rounded-[2px] max-[992px]:px-1 max-[992px]:text-[8px]"
                        style={{
                          background:
                            'linear-gradient(to right, #bef264, #22c55e)',
                        }}
                      >
                        {provider.action.label}
                      </div>
                    ) : (
                      <span className="whitespace-nowrap text-sm max-[1550px]:text-sm max-[1350px]:text-xs max-[1250px]:text-[10px] max-[992px]:text-[8px]">
                        {provider.action.label}
                      </span>
                    )}
                  </div>
                </div>

                {provider.comingSoon && (
                  <div className="absolute left-0 top-0 rounded-br-md rounded-tl-md bg-green-500 px-2 py-0.5 text-[10px] font-medium text-white max-[1550px]:text-[9px] max-[1250px]:text-[8px] max-[992px]:text-[7px]">
                    Coming soon
                  </div>
                )}

                <div className="mt-auto flex items-center justify-between">
                  <div className="flex gap-x-4 max-[1550px]:gap-x-3.5 max-[1350px]:gap-x-3 max-[1250px]:gap-x-2 max-[992px]:gap-x-1.5">
                    <div className="max-[1550px]:gap-0.75 max-[992px]:gap-0.25 flex items-center gap-1 max-[1250px]:gap-0.5">
                      {provider.isDecentralized ? (
                        <Check className="size-4 text-green-500 max-[1550px]:size-3.5 max-[1350px]:size-3 max-[1250px]:size-2.5 max-[992px]:size-2" />
                      ) : (
                        <X className="size-4 text-red-500 max-[1550px]:size-3.5 max-[1350px]:size-3 max-[1250px]:size-2.5 max-[992px]:size-2" />
                      )}
                      <span className="text-sm text-gray-400 max-[1550px]:text-xs max-[1350px]:text-[11px] max-[1250px]:text-[10px] max-[992px]:text-[8px]">
                        Decentralized
                      </span>
                    </div>

                    <div className="max-[1550px]:gap-0.75 max-[992px]:gap-0.25 flex items-center gap-1 max-[1250px]:gap-0.5">
                      <Check className="size-4 text-green-500 max-[1550px]:size-3.5 max-[1350px]:size-3 max-[1250px]:size-2.5 max-[992px]:size-2" />
                      <span className="text-sm text-gray-400 max-[1550px]:text-xs max-[1350px]:text-[11px] max-[1250px]:text-[10px] max-[992px]:text-[8px]">
                        Web3 Ready
                      </span>
                    </div>

                    <div className="max-[1550px]:gap-0.75 max-[992px]:gap-0.25 flex items-center gap-1 max-[1250px]:gap-0.5">
                      {provider.features.includes('No KYC') ? (
                        <Check className="size-4 text-green-500 max-[1550px]:size-3.5 max-[1350px]:size-3 max-[1250px]:size-2.5 max-[992px]:size-2" />
                      ) : (
                        <X className="size-4 text-red-500 max-[1550px]:size-3.5 max-[1350px]:size-3 max-[1250px]:size-2.5 max-[992px]:size-2" />
                      )}
                      <span className="text-sm text-gray-400 max-[1550px]:text-xs max-[1350px]:text-[11px] max-[1250px]:text-[10px] max-[992px]:text-[8px]">
                        No KYC
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-[80%] rounded-lg border bg-white px-8 pt-8 pb-2 shadow-sm">
            <div
              className="flex  cursor-pointer items-center justify-between"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="flex items-center justify-center gap-3">
                <div className='flex gap-10 items-center'>
                  <div className='flex gap-2'>
                    <input type="radio" checked readOnly />
                    <img
                      src={selectedNode?.icon}
                      alt="icon"
                      className="h-6 w-10 object-cover"
                    />
                  </div>
                
                  <div className='flex gap-20  '>
                    <div className=''>
                      <div className="font-medium">{selectedNode?.name}</div>
                      <div className="text-sm text-blue-600">
                        {selectedNode?.address}
                      </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                          <img src={selectedNode?.Base} alt="base" className="ml-2 h-5 w-5" />
                          <span className="ml-1 text-xs">Base</span>
                    </div>
                  </div>
                </div>
              </div>
             
                <div className={`${isOpen ?'rotate-180':'rotate-0'} transition-all duration-700 `}>
                <svg
                  width="17"
                  height="15"
                  viewBox="0 0 17 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.47762 14.6246L0.295813 0.831004L16.3324 0.642172L8.47762 14.6246Z"
                    fill="#383CFF"
                  />
                </svg>
                </div>
              
            </div>

           
            {isOpen && (
              <div className="mt-2 space-y-2 ">
                {XNODEDVMs?.filter(
                  (node) => node.name !== selectedNode?.name
                ).map((node, idx) => (
                  <div
                    key={idx}
                    className="flex cursor-pointer items-center gap-10 py-2 rounded "
                    onClick={() => handleSelect(node)}
                  ><div className='flex gap-2'>
                    <input type="radio" readOnly />
                    <img
                      src={node.icon}
                      alt="icon"
                      className="h-6 w-10 object-cover"
                    />
                    </div>
                    <div className='flex gap-20  '>
                    <div>
                      <div className="font-medium">{node.name}</div>
                      <div className="text-sm text-blue-600">
                        {node.address}
                      </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                      <img src={node.Base} alt="base" className="ml-2 h-5 w-5" />
                      <span className="ml-1 text-xs">Base</span>
                    </div>
                   </div>
                  </div>
                ))}
                <div className="mt-2 pt-4 cursor-pointe cursor-pointer text-[12px] 2xl:text-[14px] 3xl:text-[16px] text-[#8E8E8E] ">
                  + Buy a Xnode DVM
                </div>
              </div>
            )}
          </div>
        )}
        <button
          onClick={() => setShowExtendedOptions(true)}
          className="flex w-full flex-col items-start justify-center gap-2 py-4 text-center text-sm max-[1250px]:text-xs"
        >
          <div className="text-[16px]">Not happy, Scan for more</div>
          <div className="flex cursor-pointer items-center justify-center rounded-md bg-[#383CFF] px-4 py-1 text-[14px] font-[400] text-white">
            Compute & GPUs Scanner
          </div>
        </button>
      </div>

      <Dialog open={showExtendedOptions} onOpenChange={setShowExtendedOptions}>
        <DialogContent className="max-w-[1200px]">
          <DeploymentProvider
            onSelect={(selectedProvider) => {
              if (selectedProvider) {
                onSelect({
                  name: selectedProvider.productName,
                  features: ['Web3 Ready', 'No KYC'],
                  action: {
                    label: `$${selectedProvider.price.monthly}p/m`,
                    price: `$${selectedProvider.price.monthly}`,
                  },
                  isDecentralized: false,
                })
              }
              setShowExtendedOptions(false)
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Hosting
