'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import ModelDefinition from "../../utils/model-definitions.json"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import AIModels from './AIModels'
import Amount from './Amount' 
import Hosting from './Hosting'
import Tokenization from './Tokenization'

interface ServicesProps {
  id: String
}

export const Services = ({ id }: ServicesProps) => {
  const [expandedItem, setExpandedItem] = useState<string >('0')
  const [final_amount,setFinalAmount]=useState(false);
  const [selectedAIModel, setSelectedAIModel] = useState<{
    ModelName: string
    cpu: string
    name: string
    ollamaCommand: string
    ram: string
    size: string
    storage: string
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
  } | null>(null)

  const [selectedProvider, setSelectedProvider] = useState<{
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
  } | null>(null)
  const [selectedTokenization, setSelectedTokenization] = useState<{
    Token: string;
    Legal: string;
    isAgree: boolean;
    AI_Data: string;
    Token_label:string;
    Address:string;
    Amount:string;
    label:string;
  } | null>(null)

  const modelDefinition = ModelDefinition.find(m => m.id === id)
  const handleModelSelect = (option: any) => {
    setSelectedAIModel(option)
    setExpandedItem(null) 
  }
  const handleProviderSelect = (option: any) => {
    setSelectedProvider(option) 
  }
  const handleTokenizationSelect = (option: any) => {
    setSelectedTokenization(option)
   
  }
  const accordionData = [
    {
      id: 'item1',
      title: 'AI Model',
      component: (
        <AIModels
          Modelid={id}
          selectedModel={selectedAIModel}
          onSelectOption={handleModelSelect}
        />
      ),
    },
    {
      id: 'item2',
      title: 'Compute & Hosting',
      component: (
        <Hosting selected={selectedProvider} onSelect={handleProviderSelect} setExpandedItem={setExpandedItem} />
      ),
    },
    {
      id: 'item3',
      title: 'Tokenization & Monetization',
      component: (
        <Tokenization
          selected={selectedTokenization}
          onSelect={handleTokenizationSelect}
          setFinalAmount={setFinalAmount}
          setExpandedItem={setExpandedItem}
        />
      ),
    },
  ]

  return (
    <div className="grid grid-cols-[70%_30%] ">
      <div className="mx-auto flex w-full pl-8 pr-12 py-6 ">
        <Accordion
          type="single"
          collapsible
          value={expandedItem}
          onValueChange={setExpandedItem}
          className="w-full"
        >
          {accordionData.map((accordion, index) => {
            const isAIModel = index === 0
            const isHosting = index === 1
            const isTokenization = index === 2
            const isCollapsed = expandedItem !== String(index)
            return (
              <AccordionItem
                key={index}
                value={String(index)}
                className={`relative mb-4 rounded-[20px] border border-[#0058FF] p-3 ${
                  expandedItem === String(index)
                    ? 'bg-transparent'
                    : 'bg-[#F2F6FF]'
                }`}
              >
                {isAIModel && selectedAIModel && (
                  <div className="absolute -right-2 top-2 z-10">
                    <Image
                      src="/images/tick.svg"
                      alt=""
                      width={15}
                      height={15}
                      className="z-10"
                    />
                  </div>
                )}
                {isHosting && selectedProvider && (
                  <div className="absolute -right-2 top-2 z-10">
                    <Image
                      src="/images/tick.svg"
                      alt=""
                      width={15}
                      height={15}
                      className="z-10"
                    />
                  </div>
                )}
                {isTokenization && selectedTokenization && (
                  <div className="absolute -right-2 top-2 z-10">
                    <Image
                      src="/images/tick.svg"
                      alt=""
                      width={15}
                      height={15}
                      className="z-10"
                    />
                  </div>
                )}

                <AccordionTrigger className="flex w-full flex-col items-start justify-start gap-4 px-4 py-3 hover:no-underline [&>svg]:hidden">
                  <div className="text-left text-[18px] font-[600] text-[#000000] 3xl:text-[32px]">
                    {accordion.title}
                  </div>
                  <div className="w-full">
                    {isAIModel && selectedAIModel && isCollapsed && (
                      <div className="flex items-center justify-between py-2">
                        <label className="flex items-center gap-3">
                          <input
                            type="radio"
                            checked
                            readOnly
                            className="size-4"
                          />{' '}
                          LLM
                        </label>
                        <span className="text-[14px] font-[500] text-black 2xl:text-[16px] 3xl:text-[20px]">
                          {selectedAIModel?.ModelName}
                        </span>
                        <span className="text-[14px] font-[500] text-black 2xl:text-[16px] 3xl:text-[20px]">
                          {selectedAIModel?.name}
                        </span>
                      </div>
                    )}
                    {isHosting && selectedProvider && isCollapsed && (
                      <div className="flex items-center justify-between py-2">
                        <label className="flex items-center gap-3">
                          <input
                            type="radio"
                            checked
                            readOnly
                            className="size-4"
                          />{' '}
                          <Image
                            src={selectedProvider?.icon || ''}
                            alt=""
                            width={30}
                            height={30}
                          />
                          {selectedProvider?.name}
                        </label>
                        <span className="max-w-[250px] text-[14px] font-[500] text-black 2xl:text-[16px] 3xl:text-[20px]">
                          1-Core, 0.5GB RAM, 10GB Storage, 512GB Bandwidth
                        </span>
                        <span className="text-[14px] font-[500] text-black 2xl:text-[16px] 3xl:text-[20px]">
                          $12.78 Per/month
                        </span>
                      </div>
                    )}
                    {isTokenization && selectedTokenization && isCollapsed && (
                      <div className="flex w-full items-center justify-between py-2">
                        <label className="flex items-center gap-3">
                          <input
                            type="radio"
                            checked
                            readOnly
                            className="size-4"
                          />{' '}
                          <div className="flex flex-col items-start">
                            <span className="text-[12px] md:text-[14px] xl:text-[16px] 2xl:text-[16px] 3xl:text-[20px] font-[500]">
                              {selectedTokenization?.Token_label}
                            </span>
                            <span className="text-[12px] md:text-[14px] xl:text-[16px] 2xl:text-[16px] 3xl:text-[20px] font-[500]">
                              {selectedTokenization?.Token}
                            </span>
                          </div>
                        </label>

                        <span className="flex flex-col text-[14px] font-[500] text-black 2xl:text-[16px] 3xl:text-[20px]">
                          <span className=' text-[12px] md:text-[14px] xl:text-[16px] 2xl:text-[16px] 3xl:text-[20px] font-[500] '>Funds receive to</span>
                          {selectedTokenization?.Address && (
                            <a href="#" className="text-blue-500 truncate max-w-20 underline text-[12px] md:text-[14px] xl:text-[16px] 2xl:text-[16px] 3xl:text-[20px] font-[500]">
                              {selectedTokenization?.Address}
                            </a>
                          )}
                        </span>

                        <span className="flex items-center gap-1 whitespace-nowrap text-[14px] font-[500] text-black 2xl:text-[16px] 3xl:text-[20px]">
                          {selectedTokenization?.Amount}{' '}
                          
                          
                            <Image
                              src="/images/appStore/svg/chains/ollama.svg"
                              alt=""
                              width={25}
                              height={25}
                            />
                          
                        </span>
                      </div>
                    )}
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-4 pb-4">
                  {accordion.component}
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
      <div >
        <Amount
          selectedAIModel={selectedAIModel}
          selectedProvider={selectedProvider}
          selectedTokenization={selectedTokenization}
          final_amount={final_amount}
          templateId={modelDefinition?.nixName}
        />
      </div>
    </div>
  )
}
