
'use client';
import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

interface TokenizationProps {
  selected: {
    Token: string;
    Legal: string;
    isAgree: boolean;
    AI_Data: string;
    Token_label:string;
    Address:string;
    Amount:number;
    label:string;
  } | null;
  onSelect: (option: {
    Token: string;
    Legal: string;
    isAgree: boolean;
    AI_Data: string;
    Token_label:string;
    Address:string;
    Amount:number;
    label:string;
  }) => void;
  setFinalAmount: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Tokenization({ selected, onSelect,setFinalAmount }: TokenizationProps) {
  const { push } = useRouter();
  const { address, isConnected, status } = useAccount();
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenData, setIsOpenData] = useState(false)
  const Legal_Structure=[
    {
      option:"Use Smart Contract Instead"
    },{
      option : "Yes, Smart contract"
    }
  ]
  const AI_Data =[
    {
      option : 'It’s 100% Yours. No middleman'
    },
    {
      option: 'Unfortunately, we can’t change it :)'
    }
  ]
  const [tokenizationOption, setTokenizationOption] = useState({
    Token : 'sellEntireMonetization',
    Legal: Legal_Structure[0]?.option,
    isAgree:false,
    AI_Data:AI_Data[0]?.option,
    Token_label:'ERC-721 (NFT)',
    Address:address,
    Amount:'150.00 USDT',
    label:'Sell entire service to someone',
  });
  const [iAgree, setIAgree] = useState(false);

  useEffect(() => {
    
    if (selected) {
      if (selected.Token === "ERC-721 (NFT)") { 
        setTokenizationOption(prev => ({
          ...prev,
          Token: 'sellEntireMonetization',
          label:'Sell entire service to someone',
          Token_label:selected.Token
        }));
      } else if (selected.Token === "On-chain SaaS") { 
        setTokenizationOption(prev => ({
          ...prev,
          Token: 'buildChainOnSaaS',
          label:'Sell entire service to On-chain SaaS',
          Token_label:selected.Token
        }));
      }
    } 
   
  }, [selected]); 

  useEffect(()=>{
    onSelect(tokenizationOption)
  },[tokenizationOption])

  const handleTokenizationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log("Value ==>",value)
    setTokenizationOption(prev => ({
      ...prev,
      Token: value
    }));
    
  };

  const handleSelectLegal =(option:string)=>{
    setTokenizationOption(prev => ({
      ...prev,
      Legal: option
    }));
    setIsOpen(false)
  }

  const handleSelectData =(option:string)=>{
    setTokenizationOption(prev => ({
      ...prev,
      AI_Data: option
    }));
    setIsOpenData(false)
  }

const handleOptionSelect = () => {
  
    onSelect(tokenizationOption);
    setFinalAmount(true)
  
};
  const handleIAgreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIAgree(event.target.checked);
  };

  const pressWalletButton = () => {
    if (window.location.pathname.endsWith('login')) {
   
      return;
    }
    push('/login');
  };

  useEffect(()=>{

  },[address])



  return (
    <div className=" font-inter">
      <div className=" mx-auto">

        <h1 className="mb-6 text-2xl font-bold text-gray-800">Tokenization & Monetization</h1>


        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">

              <img
                src="/images/appStore/svg/chains/ollama.svg"
                alt="Base Icon"
                className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2"
              />

              <select className="appearance-none rounded-md border border-gray-300 bg-white py-2  pl-10 pr-8 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Base</option>
              </select>


              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 ">
                <img src="/images/arrow.svg" alt="arrow" className='size-4' />
              </div>
            </div>

            <div className="">
              {isConnected ? (
                <button
                  type="button"
                  className="flex h-10 w-full items-center rounded bg-primary px-3 text-sm text-background"
                  // onClick={pressWalletButton}
                >
                  {address && status === 'connected' && (
                    <span className="w-full">{formatAddress(address)}</span>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  className="flex h-10 items-center gap-1.5 rounded bg-primary px-4 text-base font-semibold tracking-tighter text-background max-hdplus:h-8 max-hdplus:text-sm"
                  onClick={pressWalletButton}
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>

        </div>

        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-[#000000]">Tokenization</h2>
          <div className="grid gap-6 md:grid-cols-2">

            <label className="flex cursor-pointer items-start rounded-md p-4 ">
              <input
                type="radio"
                name="tokenization"
                value="sellEntireMonetization"
                checked={tokenizationOption.Token === 'sellEntireMonetization'}
                onChange={(e)=>{handleTokenizationChange(e)}}
                className="form-radio mt-0.5 size-4  accent-blue-600"
              />
              <div className="ml-3">
                <span className="block font-medium text-[#000000]">Sell entire app service to someone <span className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#757575] text-xs font-semibold text-white">
                  ?
                </span></span>
                <p className="mt-1  text-sm text-[#8E8E8E]">
                  You can sell, data, infra & to someone in one go using ERC-721 standards
                </p>
              </div>
            </label>


            <label className="flex cursor-pointer items-start rounded-md p-4 ">
              <input
                type="radio"
                name="tokenization"
                value="buildChainOnSaaS"
                checked={tokenizationOption.Token === 'buildChainOnSaaS'}
                onChange={(e)=>{handleTokenizationChange(e)}}
                className="form-radio mt-0.5 size-4 text-blue-600"
              />
              <div className="ml-3">
                <span className="block font-medium text-[#000000]">Build on-chain SaaS</span>
                <p className="mt-1  text-sm text-[#8E8E8E]">
                  Instead of using a bank accounts, credit cards, use smart contracts. ERC-4337 - Service Subscription Earn ongoing royalties (licensed, rented, or resold)
                </p>
              </div>
            </label>
          </div>
        </div>

        <div className="mb-14">
          <h2 className="mb-4 text-xl font-medium text-[#000000]">Monetization</h2>

          {tokenizationOption.Token === 'sellEntireMonetization' ? (

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-4">

                <div className="flex flex-col">
                  <label htmlFor="token-type" className="block text-sm font-medium text-[#000000]">
                    Enter the token type & amount you want to sell to
                  </label>
                  <p className="text-sm text-[#8E8E8E]">How would you charge from your users</p>
                </div>


                <div className="flex items-center space-x-3 rounded-md border border-gray-300 px-3 py-2 ">
                  <div>
                    <input
                      type="number"
                      id="token-amount"
                      className="w-16 text-sm text-[#000000] outline-none"
                      placeholder="0.00"
                    />
                  </div>

                  <div className='flex gap-2'>
                    <span className="text-sm font-medium text-[#000000]">OPENX</span>

                    <img
                      src="/images/appStore/svg/chains/ollama.svg"
                      alt="Token Icon"
                      className="size-4"
                    />


                    <img src="/images/arrow.svg" alt="arrow" className='size-4' />


                  </div>


                </div>
              </div>
            </div>


          ) : (

            <div>
              <div className="mb-4 grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="revenue-model" className="block text-sm font-medium text-[#000000]">
                    Your revenue model
                  </label>
                  <p className="mb-2 text-sm text-[#8E8E8E]">How would you charge from your users</p>
                </div>
                <div className="flex gap-2 rounded-md p-1">
                  <button className="flex-1 rounded-md border p-2 text-gray-700  hover:bg-gray-300">Free</button>
                  <button className="flex-1 rounded-md bg-blue-600 p-2 text-white shadow-sm">Paid</button>
                </div>
              </div>

              <div className="mb-4 grid items-center justify-between gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="price-access" className="block text-sm font-medium text-[#000000]">
                    Price per access
                  </label>
                  <p className="mb-2 text-sm text-[#8E8E8E]">How would you charge from your users (1k Tokens)</p>
                </div>
                <div className="flex w-1/2   items-center justify-end  space-x-3 rounded-md border border-gray-300 px-3 py-2 ">
                  <div>
                    <input
                      type="number"
                      id="token-amount"
                      className="w-16 text-sm text-[#000000] outline-none"
                      placeholder="0.00"
                    />
                  </div>

                  <div className='flex gap-2'>
                    <span className="text-sm font-medium text-[#000000]">OPENX</span>

                    <img
                      src="/images/appStore/svg/chains/ollama.svg"
                      alt="Token Icon"
                      className="size-4"
                    />


                    <img src="/images/appStore/svg/arrow.svg" alt="arrow" className='size-4' />


                  </div>


                </div>
              </div>

              <div className="grid items-center gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="fund-wallet" className="block text-sm font-medium text-[#000000]">
                    Fund receiving wallet (Bank account)
                  </label>
                  <p className="mb-2 text-sm text-[#8E8E8E]">This acts like your bank account</p>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    id="fund-wallet-address"
                    className="grow rounded-md border border-gray-300 p-2 text-blue-500 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="0x8464...7456"
                  />

                  <button className="whitespace-nowrap text-sm font-medium text-[#8E8E8E]">+ Add another</button>
                </div>
              </div>
            </div>
          )}
        </div>


        <div className="mb-16 ">
          <h2 className="mb-8 text-xl font-semibold text-[#000000]">Privacy, Owner & IP</h2>
          <div className="mb-10 grid items-center gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="ai-data-ip" className="block text-sm font-medium text-[#000000]">
                Your AI, Data & All Intellectual Property
              </label>
              <p className="text-sm text-[#8E8E8E]">Other providers keep data & own infra</p>
            </div>
            <div className="w-[80%] rounded-lg border bg-white px-8 py-2 shadow-sm transition-all duration-700 delay-300 ease-in-out">
            <div
              className="flex  cursor-pointer items-center justify-between"
              onClick={() => setIsOpenData(!isOpenData)}
            >
              <div className="flex items-center justify-center gap-3">
                <span>{tokenizationOption?.AI_Data || AI_Data[0].option }</span>
              </div>
             
                <div className={`${isOpenData ?'rotate-180':'rotate-0'} transition-all duration-700 `}>
                <Image  src='/images/arrow.svg' alt='' width={15} height={15}/>
                </div>
              
            </div>

           
            {isOpenData && (
              <div className={`overflow-hidden transition-all duration-700 ease-in-out ${
                isOpenData ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
              }`}>
                {AI_Data?.filter(
                  (node) => node.option !== tokenizationOption.AI_Data
                ).map((node, idx) => (
                  <div
                    key={idx}
                    onClick={()=>{handleSelectData(node?.option)}}
                    className="flex cursor-pointer items-center gap-10 py-2 rounded "
                  
                  >
                    {node.option}
                  </div>
                ))}
                
              </div>
            )}
          </div>
          </div>

          <div className="grid items-center gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="company-structure" className="block text-sm font-medium text-[#000000]">
                Company, Entity & Legal Structure
              </label>
              <p className="text-sm text-[#8E8E8E]">Use smart contracts instead of lawyers and entity</p>
            </div>
            <div className="w-[80%] rounded-lg border bg-white px-8 py-2 shadow-sm transition-all duration-200 delay-700 ease-in-out">
            <div
              className="flex  cursor-pointer items-center justify-between"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="flex items-center justify-center gap-3">
                <span>{tokenizationOption?.Legal || Legal_Structure[0].option }</span>
              </div>
             
                <div className={`${isOpen ?'rotate-180':'rotate-0'} transition-all duration-700 `}>
                <Image  src='/images/arrow.svg' alt='' width={15} height={15}/>
                </div>
              
            </div>

           
            {isOpen && (
              <div className="mt-2 space-y-2 transition-all duration-200 delay-700 ease-in-out ">
                {Legal_Structure?.filter(
                  (node) => node.option !== tokenizationOption.Legal
                ).map((node, idx) => (
                  <div
                    key={idx}
                    onClick={()=>{handleSelectLegal(node?.option)}}
                    className="flex cursor-pointer items-center gap-10 py-2 rounded "
                  
                  >
                    {node.option}
                  </div>
                ))}
                
              </div>
            )}
          </div>
            
          </div>
        </div>


        <div className="mb-8">
          <p className="mb-4 text-[#000000]">
            You will receive your funds to <span className="font-medium underline">0x8464...7456</span> & cannot be undone
          </p>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={iAgree}
              onChange={handleIAgreeChange}
              className="form-checkbox size-5 rounded text-blue-600"
            />
            <span className="ml-2 text-[#000000]">I agree</span>
          </label>
        </div>


        <div className="mb-16 text-[#000000]">
          <p className="mb-2 flex items-center">
            Estimate gas fees <span className="mx-2 font-bold ">$0.12</span>
            <img src="/images/appStore/svg/ollama.svg" alt="" />
          </p>
          <p>Estimate time for execution <span className="font-bold">~20s</span></p>
        </div>

        <div className="text-left">
          <button
            className="rounded-md bg-blue-600 px-10 py-3 font-semibold text-white shadow-md hover:bg-blue-700"
            onClick={() => {
              if (iAgree) {
              
                handleOptionSelect(); 
              } else {
                alert('Please agree to continue.');
              }
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}