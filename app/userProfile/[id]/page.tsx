"use client"
import React, { useEffect, useState } from 'react'
import UserProfileDetails from '@/components/UserProfile/user-profile-details'
import UserModelInfo from '@/components/UserProfile/user-model-info'
import { useParams } from 'next/navigation'
import userDetails from '@/utils/user_details.json'
import { useAccount } from "wagmi";
interface User {
  id?: string
  _id?: string
  address: string
  name: string
  profilePic: string | null
  firstConnected?: string
  createdAt?: string
}

const Page = () => {
  const params = useParams()
  const userId = Array.isArray(params.id) ? params.id[0] : params.id
  // const [user, setUser] = useState<User | null>(null)
  // const [loading, setLoading] = useState(true)
  const {address,isConnected}=useAccount();
  
  useEffect(()=>{

  },[isConnected])
  // useEffect(() => {
  //   if (!userId) {
  //     setLoading(false)
  //     return
  //   }

  //   fetch(`/api/users/${userId}`)
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error('User not found')
  //       }
  //       return res.json()
  //     })
  //     .then((userData: User) => {
  //       setUser(userData)
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching user:', error)
  //       setUser(null)
  //     })
  //     .finally(() => {
  //       setLoading(false)
  //     })
  // }, [userId])
 
  const user = userDetails.find((user: any) => user.id === Number(userId))
  
//   if (loading) return (<div className="relative flex justify-center items-center w-full h-screen lg:min-h-screen">
//     <div className="w-12 h-12 rounded-full absolute border-2 border-solid border-gray-200"></div>
//     <div
//         className="w-12 h-12 rounded-full animate-spin absolute border-2 border-solid border-violet-500 border-t-transparent shadow-md">
//     </div>
// </div>)
  if (!user) return <div className="flex justify-center p-8">User not found</div>

  
  const isOwner =
  user?.address?.toLowerCase() === address?.toLowerCase();
  
  return (
    <div className="mx-auto w-full px-4 py-6">
      <UserProfileDetails
        name={user?.name}
        image={user?.profilePic}
        userAddress={user?.address}
        Joined={user?.firstConnected || user?.createdAt || 'Unknown'}
      />
      <UserModelInfo show={isOwner}  userAddress={user.address} userId={userId} />
    </div>
  )
}

export default Page