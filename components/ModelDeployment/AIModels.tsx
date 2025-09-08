'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'

import ModelDefinition from '../../utils/model-definitions.json'
import { Input } from '../ui/input'

interface ModelOption {
  name: string
  desc: string
  nixName: string
  type: string
  requirements: {
    [key: string]: {
      ram: number
      storage: number
      cpu: number
      ollamaCommand: string
    }
  }
  value?: string
}

interface AIModelsProps {
  Modelid: String
  selectedModel: ModelOption
  onSelectOption: (selectedOption: ModelSizeWithCommand) => void
}

type ModelSize = {
  name: string
  ram: string
  storage: string
  cpu: string
  size: string
}

const DEMO_POOL_SPECS = {
  cpuCores: 8,
  memoryGB: 16,
  storageGB: 310,
} as const

type ModelSizeWithCommand = {
  name: string
  ram: string
  storage: string
  cpu: string
  size: string
  ollamaCommand: string
  ModelName: string
}
const AIModels = ({
  Modelid,
  selectedModel,
  onSelectOption,
}: AIModelsProps) => {
  const handleSelect = (option: ModelSizeWithCommand) => {
    onSelectOption(option)
  }

  const modelDefinition = ModelDefinition.find((m) => m.id === Modelid)
  if (!modelDefinition) {
    console.error(`Model definition not found for template: ${Modelid}`)
    return null
  }

  const modelOption = modelDefinition.options[0] as ModelOption

  const modelSizes = modelOption?.requirements || {}
  const sizes = Object.entries(modelSizes).map(([name, specs]) => ({
    name,
    ram: `${specs.ram / 1000}GB`,
    storage: `${specs.storage / 1000}GB`,
    cpu: `${specs.cpu} cores`,
    size: `${name} parameters`,
    ollamaCommand: specs.ollamaCommand,
    ModelName: modelDefinition.name,
  }))

  const hardware = DEMO_POOL_SPECS

  return (
    <div className="grid grid-cols-3 gap-4">
      {sizes.map((size) => {
        const isAvailable =
          !hardware ||
          (modelSizes[size.name].ram <= hardware.memoryGB * 1000 &&
            modelSizes[size.name].storage <= hardware.storageGB * 1000 &&
            modelSizes[size.name].cpu <= hardware.cpuCores)

        return (
          <div
            key={size.name}
            onClick={() => {
              handleSelect(size)
            }}
            className={`flex h-[128px] cursor-pointer flex-col rounded-lg border p-6 hover:border-primary/50 max-[1550px]:h-[120px] max-[1550px]:p-5 max-[1350px]:h-[112px] max-[1350px]:p-4 max-[1250px]:h-[100px] max-[1250px]:p-3 max-[992px]:h-[90px] max-[992px]:p-2 ${selectedModel?.name === size.name ? 'border-primary bg-primary/5' : ''} `}
          >
            <div className="mb-4 flex items-center justify-between max-[1550px]:mb-3.5 max-[1350px]:mb-3 max-[1250px]:mb-2.5 max-[992px]:mb-2">
              <div className="flex items-center gap-3 max-[1550px]:gap-2.5 max-[1350px]:gap-2 max-[1250px]:gap-1.5 max-[992px]:gap-1">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="modelSize"
                    value={size.name}
                    checked={selectedModel?.name === size.name}
                    onChange={() => {
                      handleSelect(size)
                    }}
                    className="h-4 w-4"
                  />
                  <div className="text-lg font-medium max-[1550px]:text-base max-[1350px]:text-sm max-[1250px]:text-xs max-[992px]:text-[10px]">
                    {size.name}
                  </div>
                </label>
              </div>
              <div className="flex gap-3">
                {/* <Image
                  src={modelDefinition.image}
                  alt=""
                  width={30}
                  height={30}
                /> */}
                <div className="text-[10px] font-[500] 2xl:text-[15px] 3xl:text-[15.94px]">
                  {modelDefinition.name}
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-4 max-[1550px]:gap-3.5 max-[1350px]:gap-3 max-[1250px]:gap-2.5 max-[992px]:gap-2">
              <div className="max-[1550px]:gap-1.75 max-[992px]:gap-0.75 flex items-center gap-1 max-[1350px]:gap-1.5 max-[1250px]:gap-1">
                <Image
                  src="/images/modelDeployment/RAM.svg"
                  alt=""
                  width={7}
                  height={7}
                  className="max-[1550px]:w-4.5 max-[1550px]:h-4.5 size-5 shrink-0 text-gray-400 max-[1350px]:size-4 max-[1250px]:size-3.5 max-[992px]:size-3"
                />

                <div>
                  <div className="text-xs text-gray-400 max-[1550px]:text-[10px] max-[1350px]:text-[9px] max-[1250px]:text-[8px] max-[992px]:text-[7px]">
                    RAM
                  </div>
                  <div className="text-sm font-[500] max-[1550px]:text-xs max-[1350px]:text-[11px] max-[1250px]:text-[10px] max-[992px]:text-[9px]">
                    {size.ram}
                  </div>
                </div>
              </div>

              <div className="max-[1550px]:gap-1.75 max-[992px]:gap-0.75 flex items-center gap-1 max-[1350px]:gap-1.5 max-[1250px]:gap-1">
                <Image
                  src="/images/modelDeployment/storage.svg"
                  alt=""
                  width={7}
                  height={7}
                  className="max-[1550px]:w-4.5 max-[1550px]:h-4.5 size-5 shrink-0 text-gray-400 max-[1350px]:size-4 max-[1250px]:size-3.5 max-[992px]:size-3"
                />
                <div>
                  <div className="text-xs text-gray-400 max-[1550px]:text-[10px] max-[1350px]:text-[9px] max-[1250px]:text-[8px] max-[992px]:text-[7px]">
                    Storage
                  </div>
                  <div className="text-sm font-[500] max-[1550px]:text-xs max-[1350px]:text-[11px] max-[1250px]:text-[10px] max-[992px]:text-[9px]">
                    {size.storage} SSD
                  </div>
                </div>
              </div>

              <div className="max-[1550px]:gap-1.75 max-[992px]:gap-0.75 flex items-center gap-1 max-[1350px]:gap-1.5 max-[1250px]:gap-1">
                <Image
                  src="/images/modelDeployment/CPU.svg"
                  alt=""
                  width={8}
                  height={8}
                  className="max-[1550px]:w-4.5 max-[1550px]:h-4.5 size-5 shrink-0 text-gray-400 max-[1350px]:size-4 max-[1250px]:size-3.5 max-[992px]:size-3"
                />
                <div>
                  <div className="text-xs text-gray-400 max-[1550px]:text-[10px] max-[1350px]:text-[9px] max-[1250px]:text-[8px] max-[992px]:text-[7px]">
                    CPU
                  </div>
                  <div className="text-sm font-[500] max-[1550px]:text-xs max-[1350px]:text-[11px] max-[1250px]:text-[10px] max-[992px]:text-[9px]">
                    {size.cpu}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default AIModels
