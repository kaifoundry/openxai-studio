
'use client';
import React, { useState,useEffect } from "react";
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { useDemoContext, useSetDemoContext } from '@/contexts/XnodeDemoContext'
import ModelDefinitions from '@/utils/model-definitions.json'
import {
  demoSession,
  reserveDemo,
  useDemosAvailable,
  useDeployModel,
  type DemoXnode,
} from '@/lib/xnode-demo'
import { LoadingOverlay } from "../ui/loading-overlay";
import { xnode } from '@openmesh-network/xnode-manager-sdk'
export default function Amount({ selectedAIModel, selectedProvider, selectedTokenization,final_amount,templateId }) {
  const [selectedServices, setSelectedServices] = useState([]);
  const [hourlyRate,setHourlyRate] = useState(0.00);
  const [monthlyRate,setMontlyRate]=useState(0.00);
  const [totalSavings,setTotalSavings]=useState(0.00)
  // const monthlyRate = (selectedServices.length * hourlyRate * 24 * 30).toFixed(2);
  const [deploying, setDeploying] = useState<boolean>(false)
  const router = useRouter();
  const { toast } = useToast()
  const demos = useDemosAvailable()
  const demoXnode = demos.data?.find((x) => !x.reservation)
   const reservedXnode = useDemoContext()
    const setReservedXnode = useSetDemoContext()
    const deployModel = useDeployModel()
  const getWorkingDaysInMonth = (year, month) => {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    let workingDays = 0;
  
    for (let day = startDate; day <= endDate; day.setDate(day.getDate() + 1)) {
      const dayOfWeek = day.getDay();
      
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        workingDays++;
      }
    }
    return workingDays;
  };

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const BASE_SUB_TOTAL = 276.97;
  const SAVINGS_WITH_MAGIC = 13.97;
  const APP_STAKING_REWARDS_PERCENTAGE = 142;
  const AVE_MONTHLY_REWARDS = 183.94;
  const GAS_FEES_REBATES = 11.12;
  const CHAIN_REWARDS = 3.14;
  const WORKING_HOURS_PER_DAY = 8;
  const TokenizationSubTotal= AVE_MONTHLY_REWARDS+GAS_FEES_REBATES+CHAIN_REWARDS

  const [discountCode, setDiscountCode] = useState("");
  useEffect(()=>{
    let newMonthlyRate ;
    if(selectedProvider){
      
      if(selectedTokenization){
        console.log("Yes selected")
        newMonthlyRate= Math.abs(monthlyRate - BASE_SUB_TOTAL)
      }else{
      newMonthlyRate = monthlyRate + BASE_SUB_TOTAL}
      setMontlyRate(newMonthlyRate);
    const now = new Date();
    const workingDays = getWorkingDaysInMonth(now.getFullYear(), now.getMonth());

   
    const totalWorkingHours = workingDays * WORKING_HOURS_PER_DAY;
    const calculatedHourlyRate = totalWorkingHours > 0 
      ? newMonthlyRate / totalWorkingHours 
      : 0;

    setHourlyRate(parseFloat(calculatedHourlyRate.toFixed(2)));
    }
  },[selectedProvider])

  useEffect(()=>{
    if(selectedTokenization){
      const newMonthlyRate = monthlyRate + TokenizationSubTotal;
      setMontlyRate(newMonthlyRate);
    const now = new Date();
    const workingDays = getWorkingDaysInMonth(now.getFullYear(), now.getMonth());

    const totalWorkingHours = workingDays * WORKING_HOURS_PER_DAY;
    const calculatedHourlyRate = totalWorkingHours > 0 
      ? newMonthlyRate / totalWorkingHours 
      : 0; 

    setHourlyRate(parseFloat(calculatedHourlyRate.toFixed(2)));
    }
    if(selectedProvider){
      setMontlyRate(BASE_SUB_TOTAL-TokenizationSubTotal)
    }
  },[selectedTokenization])





  const deployOnDemo = async () => {
    const activeReservation =
      reservedXnode.xnode &&
      reservedXnode.xnode.reservation.reserved_until > Date.now() / 1000
    let deployOnXnode: DemoXnode

    if (!activeReservation && !demoXnode) {
      const nextFreeXnode = demos.data
        ?.map((x) => x.reservation.reserved_until)
        .sort()
        .at(0)
      toast({
        title: 'Deployment failed',
        description: `No demo xnodes available. ${nextFreeXnode ? `Next xnode will be free in ${Math.round((nextFreeXnode - Date.now() / 1000) / 60)} minutes.` : ''}`,
        variant: 'destructive',
      })
      return
    }

    let dismiss = () => {}
    try {
      if (activeReservation) {
        deployOnXnode = reservedXnode.xnode
      } else {
        // dismiss = toast({
        //   title: 'Reserving Xnode...',
        //   description: 'This can take up to 1 minute..',
        //   duration: 60_000,
        // }).dismiss
        deployOnXnode = await reserveDemo({ xnode_id: demoXnode.id })
      }

      //console.log('Selected model:', step.modelSize)

      // Use templateId to find the correct model definition
      const selectedModel = ModelDefinitions.find(
        (m) => m.nixName === templateId
      )
      //console.log('Found model definition:', selectedModel)

      // Get the selected size from the UI
      const modelSize = selectedAIModel?.name
      //console.log('Model size:', modelSize)

      const ollamaCommand =
        selectedModel?.options[0].requirements[modelSize]?.ollamaCommand
      //console.log('Ollama command:', ollamaCommand)

      if (!ollamaCommand) {
        throw new Error('Selected model configuration not found')
      }

      const session = demoSession({ xnode_id: deployOnXnode.id })
      while (true) {
        // Wait until access is granted
        try {
          await xnode.usage.cpu({
            session,
            path: {
              scope: 'host',
            },
          })
          break
        } catch (e) {
          console.log('waiting for Xnode access...')
          await new Promise((resolve) => setTimeout(resolve, 1000))
        }
      }

      const deploymentId = await deployModel({
        session,
        model: ollamaCommand,
      }).then((data) => data.request_id)
      setReservedXnode({
        xnode: deployOnXnode,
        deploymentId,
        processes: ['open-webui', 'ollama', 'ollama-model-loader'],
      })
      
      router.push('/deployments')
    } catch (e) {
      console.error(e)
    } finally {
      dismiss()
    }
  }
  return (
    <div className="flex py-4 pl-0 pr-4">

<LoadingOverlay isVisible={deploying} />
     
      <div className=" flex w-full  py-4 pl-0 pr-4 ">
        <div className="w-full bg-white">
        {!final_amount &&(<div className="mb-6 rounded-md bg-[#EEEEEE] px-4 py-2 text-left text-[21px] font-[400]">
            Hosting costs
          </div>)}

          {!final_amount &&(<div
            
            className="flex cursor-pointer items-center justify-between border-b border-[#D4D4D4] py-3"
          >
            <span className="text-[14px] 2xl:text-[16px] 3xl:text-[18px] text-[#8E8E8E]">Service</span>
            {selectedAIModel &&( <span className="text-[14px] 2xl:text-[16px] 3xl:text-[18px] text-[#4D4D4D]">xx</span>)}
          </div>)}

          {((selectedProvider || selectedTokenization) && !final_amount) &&(
            <div>
              <div
              
              className="flex cursor-pointer items-center justify-between border-b border-[#D4D4D4] py-3"
            >
              <span className="text-[14px] 2xl:text-[16px] 3xl:text-[18px] text-[#8E8E8E]">Service</span>
              <span className="text-[14px] 2xl:text-[16px] 3xl:text-[18px] text-[#4D4D4D]">xx</span>
            </div>
            <div className="flex items-center justify-between py-8">
              <span className="text-[14px] 2xl:text-[16px] 3xl:text-[18px] text-[#8E8E8E]">Discount code</span>
              <div className="flex items-center border border-[#D4D4D4] px-4 py-1 max-w-30 rounded-full">
                <input
                  type="text"
                  className=" max-w-28 border-none focus:outline-none px-2 py-1"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
                <button
                  onClick={() => {}}
                  className="rounded-md  px-3 py-1 text-sm text-gray-700 "
                >
                  Apply              
                </button>
              </div>
            </div>
            <div className="flex flex-col items-start border-b border-[#D4D4D4] pb-8 ">
              <div className="flex items-center justify-between pt-4 w-full">
                <span className="text-xl font-medium text-darkGray">Sub Total</span>
                <span className="text-3xl font-bold text-darkGray">
                  ${BASE_SUB_TOTAL.toFixed(2)}/<span className="text-[24px]">mo</span>
                </span>
              </div>
              <p className="mt-1 text-right text-[16px] text-[#8E8E8E] self-end">
                That’s about ${(hourlyRate).toFixed(2)} hourly
              </p>
            </div>
            
           
          </div>
          )}
          {(selectedTokenization && !final_amount )&&(
            <>
            <div className="mb-6 mt-6 rounded-md bg-[#EEEEEE] px-4 py-2 text-left text-[21px] font-[400]">
              OpenXAI Magic
            </div>

            <div className="flex items-center justify-between py-2 border-b my-8 border-[#D4D4D4] ">
              <span className="text-[14px] 2xl:text-[16px] 3xl:text-[18px] text-[#8E8E8E]">App staking rewards <span className="text-gray-400">?</span></span>
              <span className="text-[14px] 2xl:text-[16px] 3xl:text-[18px] text-darkGray font-[700]">{APP_STAKING_REWARDS_PERCENTAGE}%</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b my-8 border-[#D4D4D4] ">
              <span className="text-[14px] 2xl:text-[16px] 3xl:text-[18px] text-[#8E8E8E]">Ave. monthly rewards</span>
              <span className="text-[14px] 2xl:text-[16px] 3xl:text-[18px] text-darkGray font-[700]">~${AVE_MONTHLY_REWARDS.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b my-8 border-[#D4D4D4] ">
              <span className="text-[14px] 2xl:text-[16px] 3xl:text-[18px] text-[#8E8E8E]">Gas fees rebates</span>
              <span className="text-[14px] 2xl:text-[16px] 3xl:text-[18px] text-[#4D4D4D] font-[700]">~${GAS_FEES_REBATES.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between border-b py-2 border-b my-8 border-[#D4D4D4] ">
              <span className="text-[14px] 2xl:text-[16px] 3xl:text-[18px] text-[#8E8E8E]">Chain rewards</span>
              <span className="text-[14px] 2xl:text-[16px] 3xl:text-[18px] text-[#4D4D4D] font-[700]">~${CHAIN_REWARDS.toFixed(2)}</span>
            </div>
         
            <div className="flex items-center justify-between border-b pt-2 pb-10 border-[#D4D4D4]">
              <span className="text-[14px] 2xl:text-[16px] 3xl:text-[18px] font-medium text-[#4D4D4D]">Sub Total</span>
              <span className="text-3xl font-[700] text-darkGray">
                ${(AVE_MONTHLY_REWARDS+GAS_FEES_REBATES+CHAIN_REWARDS).toFixed(2)}/<span className="text-[24px]">mo</span>
              </span>
            </div>
          </>
          )}
          {(selectedAIModel && selectedProvider && selectedTokenization && final_amount) &&(
            <>
            <div className="mb-6 mt-6 rounded-md bg-[#EEEEEE] px-4 py-2 text-left text-[21px] font-[400]">
              Summary
            </div>
            <div className="flex items-center justify-between py-2 border-b my-8 border-[#D4D4D4] ">
            
              <span className="text-[14px] 2xl:text-[16px] 3xl:text-[18px] text-[#8E8E8E]">Services</span>
             
              
              <span className="text-[14px] 2xl:text-[16px] 3xl:text-[18px] text-darkGray font-[700]">xxx</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b my-8 border-[#D4D4D4] ">
              
              <div className="flex justify-center items-center gap-2">
              <span className="text-[14px] 2xl:text-[16px] 3xl:text-[18px] text-[#8E8E8E]">App staking rewards</span>
              <span className="text-white bg-[#5A5A5A] w-5 h-5 rounded-full flex justify-center items-center text-xs">?</span>
              </div>
              
              <span className="text-[14px] 2xl:text-[16px] 3xl:text-[18px] text-darkGray font-[700]">{APP_STAKING_REWARDS_PERCENTAGE}%</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b my-8 border-[#D4D4D4] ">
            <div className="flex justify-center items-center gap-2">
              <span className="text-[14px] 2xl:text-[16px] 3xl:text-[18px] text-[#8E8E8E]">Tot. Montly rewards</span>
              <span className="text-white bg-[#5A5A5A] w-5 h-5 rounded-full flex justify-center items-center text-xs">?</span>
              </div>
              <span className="text-[14px] 2xl:text-[16px] 3xl:text-[18px] text-darkGray font-[700]">{APP_STAKING_REWARDS_PERCENTAGE}%</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b my-8 border-[#D4D4D4]">
            <p className="text-[14px] 2xl:text-[16px] 3xl:text-[18px] text-[#8E8E8E]">Total Savings</p>
            <p className="text-[14px] 2xl:text-[16px] 3xl:text-[18px] text-[#01CA1F]">$0.00/mo</p>
          </div>
         
            <div className="flex items-center justify-between border-b pt-2 pb-10 border-[#D4D4D4]">
              <span className="text-[14px] 2xl:text-[16px] 3xl:text-[18px] font-medium text-[#4D4D4D]">Sub Total</span>
              <span className="text-3xl font-[700] text-[#0058FF]">
                ${(AVE_MONTHLY_REWARDS+GAS_FEES_REBATES+CHAIN_REWARDS).toFixed(2)}/<span className="text-[24px] text-[#4D4D4D]">mo</span>
              </span>
            </div>
          </>
          )}

          {!final_amount &&(<div className="my-6 text-end border-b border-[#D4D4D4]">
            <p className="text-[24px] 2xl:text-[34px] 3xl:text-[44.91px] font-[700] text-[#0058FF]">
              ${(monthlyRate).toFixed(2)}/<span className="text-[24px] font-[700]">mo</span>
            </p>
            <p className="mt-1 text-[20px] text-[#236FFD]">
              That’s about ${(hourlyRate).toFixed(2)} hourly
            </p>
            <div className="flex items-center justify-end gap-14  pt-4 pb-8">
            <p className="text-sm font-medium text-[#8E8E8E]">Total Savings</p>
            <p className="text-lg font-[400] text-[#01CA1F]">$0.00/mo</p>
          </div>
          </div>)}

          <button className={`mt-6 w-full rounded-md  py-2 text-white transition  ${(selectedAIModel && selectedProvider && selectedTokenization && final_amount ) ?'bg-[#0058FF]':'bg-[#757575]'}`}
          onClick={() => {
            setDeploying(true)
            deployOnDemo()
              .catch(console.error)
              .finally(() => console.log("Deploying"))
          }}
          >
            Deploy
          </button>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}