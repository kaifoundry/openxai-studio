// import { cookies } from 'next/headers'
// import Link from 'next/link'

// import { DemoPool } from './demo-pool'

// // import DeploymentsList from './deployments-list'

// export default function DeploymentsPage() {
//   const sessionCookie = cookies().get('userSessionToken')

//   return (
//     <div className="container my-12 max-w-none">
//       {/* Demo Pool */}
//       <div>
//         <h1 className="mb-6 text-3xl font-bold">OpenxAI Launch Demo Pool</h1>

//         <p className="mb-3 text-lg">
//           During the{' '}
//           <Link
//             href="https://studio.openxai.org/global-accelerator-2025"
//             className="font-bold underline"
//           >
//             OpenxAI Deployable Demo App
//           </Link>
//           , test your AI applications on our demo nodes. Each node is available
//           for 30 minutes - check out our{' '}
//           <Link href="/app-store" className="text-primary hover:underline">
//             AI App Store
//           </Link>{' '}
//           to get started.
//         </p>

//         <DemoPool />
//       </div>

//       {/* Commented out for now - may add back later
//       {sessionCookie ? (
//         <div className="space-y-4">
//           <h2 className="text-xl font-bold">Deployed Nodes</h2>
//           <DeploymentsList sessionToken={sessionCookie.value} />
//         </div>
//       ) : (
//         <div className="text-center">
//           <a href="/login?redirect=/deployments" className="text-primary hover:underline">
//             Login to view your deployments
//           </a>
//         </div>
//       )} */}
//     </div>
//   )
// }

"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { DemoPool } from './demo-pool'

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
