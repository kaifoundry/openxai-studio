'use client'

import React, { useState } from 'react'

import Deployed_models from './Deployed_models'
import Filter from './filter'

interface DeployedAppsProps{
 userAddress?:string
 userId?:string
}

const DeployedApps = ({userAddress,userId}:DeployedAppsProps) => {
  const [show, setShow] = useState(true)
  const [selectedChains, setSelectedChains] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  return (
    <div className="flex h-full w-full">
      <div
        className={`transition-all duration-700 ease-in-out ${
          show ? 'w-[35%] opacity-100' : 'w-0 opacity-0'
        } overflow-hidden`}
      >
        <Filter
          selectedChains={selectedChains}
          setSelectedChains={setSelectedChains}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      </div>

      <div
        className={`pr-6 transition-all duration-700 ease-in-out ${
          show ? 'w-[65%]' : 'w-full'
        }`}
      >
        <Deployed_models
          setShow={setShow}
          show={show}
          selectedChains={selectedChains}
          selectedCategories={selectedCategories}
          userAddress={userAddress}
          userId={userId}
        />
      </div>
    </div>
  )
}

export default DeployedApps
