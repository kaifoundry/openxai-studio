import React from 'react'
import ModelDefinitions from '@/utils/model-definitions.json'
import UserProfileDetails from '@/components/UserProfile/user-profile-details'
import UserModelInfo from '@/components/UserProfile/user-model-info'
interface PageProps {
    params: { id: string }
}

const Page = ({ params }: PageProps) => {
    const data = ModelDefinitions.find((m: any) => m.id === params.id) as any
    const name = data?.Seller?.[0]?.name || data?.name
    const image = data?.Seller?.[0]?.logo || data?.logo
    return (
        <div className="mx-auto w-full px-4 py-6">
            <UserProfileDetails name={name} image={image} />
            <UserModelInfo/>
        </div>
    )
}

export default Page


