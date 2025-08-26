"use client"
import Image from 'next/image'
import { useAccount } from 'wagmi';
import React, { useEffect, useState } from 'react'
import ModelPopup from '@/components/ModelDetails/ModelPopup';

import DeploymentPage from './deployment-page'
const MOBILE_BREAKPOINT = 1024


export default function DeploymentsPage() {
  const [showDialog, setShowDialog] = useState(false);
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
  const { isConnected } = useAccount();

  return (
    <>
      {showDialog ? (
        <div className='h-screen lg:h-full'>
          <ModelPopup show={showDialog} title={"Switch to desktop for deploying the app"} route={`/`} />
        </div>
      )
        : (
          <div className="  my-12 lg:my-6 w-full md:px-8 px-2">
            {!isConnected ? (

              <div className="flex items-center justify-center w-full">
                <div className="bg-[#F5F8FF] border-2 border-dashed border-[#99BDFF] rounded-lg p-12 text-center w-full">
                  <div className="mb-4">
                    <Image src="/images/deployments/deployment.svg" alt="" width={200} height={200} className="mx-auto" />
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
