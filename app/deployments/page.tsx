"use client"
import Image from 'next/image'
import { useAccount } from 'wagmi';
import React, { useEffect, useState } from 'react'
import ModelPopup from '@/components/ModelDetails/ModelPopup';
import { Wallet } from 'lucide-react';
import DeploymentPage from './deployment-page'
const MOBILE_BREAKPOINT = 1024


export default function DeploymentsPage() {
  const [showDialog, setShowDialog] = useState(false);
  const { isConnected, status } = useAccount();
  useEffect(() => {
    if (window.visualViewport.width < MOBILE_BREAKPOINT) {
      setShowDialog(true)
    }
    const handleResize = () => {
      if (window.visualViewport.width > MOBILE_BREAKPOINT) {
        setShowDialog(false)
      } else {
        setShowDialog(true)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [window.visualViewport.width])


  const Loader = () => (
    <div className="relative flex justify-center items-center w-full h-screen lg:min-h-screen">
      <div className="w-12 h-12 rounded-full absolute border-2 border-solid border-gray-200"></div>
      <div className="w-12 h-12 rounded-full animate-spin absolute border-2 border-solid border-violet-500 border-t-transparent shadow-md"></div>
    </div>
  );

  return (
    <>
      {showDialog ? (
        <div className='h-screen lg:h-full'>
          <ModelPopup show={showDialog} title={"Switch to desktop for deploying the app"} route={`/`} />
        </div>
      )
        : (
          <div className="  my-12 lg:my-6 w-full md:px-8 px-2">
            {status === "connecting" ? (
              <Loader />
            ) : !isConnected ? (
              <div className="flex items-center justify-center w-full">
                <div className="bg-[#F5F8FF] border-2 border-dashed border-[#99BDFF] rounded-lg p-12 text-center w-full">
                  <div className="mb-4">
                    {/* <Image src="/images/deployments/deployment.svg" alt="" width={200} height={200} className="mx-auto" /> */}
                    <svg xmlns="http://www.w3.org/2000/svg"
                      width="180"
                      height="180"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="url(#walletGradient)"
                      stroke-width="0.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-wallet-icon lucide-wallet mx-auto">

                      <defs>
                        <linearGradient id="walletGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stop-color="#54C2FF" />
                          <stop offset="100%" stop-color="#5B69E8" />
                        </linearGradient>
                      </defs>

                      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
                      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
                    </svg>


                  </div>
                  <p className="text-[#525252] text-lg mb-6">
                    Connect your wallet to see your deployments
                  </p>
                  <div className="mt-4 flex justify-center">
                    <w3m-connect-button />
                  </div>
                </div>
              </div>
            ) : (

              <DeploymentPage />
            )}
          </div>)}
    </>
  )
}
