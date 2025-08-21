"use client"
import Image from 'next/image'
import { useAccount } from 'wagmi';


import DeploymentPage from './deployment-page'



export default function DeploymentsPage() {

  const { isConnected } = useAccount();

  return (
    <div className=" my-12 w-full md:px-8 px-2">
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
    </div>
  )
}
