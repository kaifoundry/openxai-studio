"use client";
import React from 'react'
import userDetails from '@/utils/user_details.json'
import UserProfileDetails from '@/components/UserProfile/user-profile-details'
import UserModelInfo from '@/components/UserProfile/user-model-info'
import { useSearchParams } from "next/navigation"
import { useParams } from 'next/navigation';


const Page = () => {
  


    const params = useParams();
    const userId = Array.isArray(params.id) ? params.id[0] : params.id;
    const data = userDetails.find((user: any) => user.id === Number(userId))
  

  if (!data) {
    return <div>User not found</div>
  }

  const name = data.name
  const image = data.profilePic

  

  return (
    <div className="mx-auto w-full px-4 py-6">
      <UserProfileDetails name={name} image={image} />
      <UserModelInfo />
      
    </div>
  )
}

export default Page
