'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { TopSeller } from '../AIModelDirectory/ai-model-top-seller'


interface ModelProps {
  deploy?: boolean
  setDeploy?: React.Dispatch<React.SetStateAction<boolean>>
  claims?: {
    time: string
    address: string
    amount: string
  }[]
}

export function ModelSidebar({ deploy, setDeploy, claims }: ModelProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-4 bg-[#F6FAFF] h-full p-2 sm:space-y-6 md:px-4">

      {!deploy && (
        <div>
        <Card className="m-4 mb-10 rounded-xl bg-white">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-[16px] font-[500] text-[#1B1A1E] sm:text-lg">
              Your Balance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-5">

            <div className="flex flex-col space-y-2">
              <div className="text-[#0A0A0A] text-[36px] font-[700]">$350,000.20</div>
              <div className='text-[18px] text-[#212121] font-[500]'>BTC 3.1</div>
            </div>

            <div className='flex justify-between'>
              <Input
                value="https://1b4d28a4...openxai.org/"
                readOnly
                className="flex-1 border-none text-sm focus:outline-none"
              />
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-2 text-white"
                onClick={() =>
                  copyToClipboard('https://1b4d28a4...openxai.org/')
                }
              >
                <img
                  src="/images/project/hero/copy.svg"
                  alt="Copy"
                  className="h-4 w-4"
                />
              </Button>

            </div>



          </CardContent>
        </Card>
        <TopSeller/>
        </div>
      )}
      {deploy && (
        <Card className="m-4 mb-10 rounded-xl bg-white">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base font-semibold text-[#1B1A1E] sm:text-lg">
              Your Balance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-5">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-[#424242]">URL</p>
                <Input
                  value="https://1b4d28a4...openxai.org/"
                  readOnly
                  className="flex-1 border-none text-sm focus:outline-none"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-2 text-white"
                  onClick={() =>
                    copyToClipboard('https://1b4d28a4...openxai.org/')
                  }
                >
                  <img
                    src="/images/project/hero/copy.svg"
                    alt="Copy"
                    className="h-4 w-4"
                  />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-[#424242]">
                  Tokenization ID
                </p>
                <Input
                  value="https://1b4d28a4...openxai.org/"
                  readOnly
                  className="flex-1 border-none text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#424242]">
                Revenue Wallet
              </Label>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#424242]">
                APP ID
              </Label>
              <div className="pt-1">
                <Input
                  value="https://1b4d28a4...openxai.org/"
                  readOnly
                  className="border-none text-sm focus:outline-none"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}


      {deploy && (
        <Card className="m-4 mb-10 rounded-xl bg-white">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base font-semibold text-gray-800 sm:text-lg">
              Deploy This App
            </CardTitle>
          </CardHeader>

          <CardContent className="mb-10 space-y-6 rounded-xl sm:space-y-4">
            <Link href='/resource-demo' className="flex w-full items-center justify-center gap-2 bg-[#0059FF] py-3 rounded-md text-sm text-white hover:bg-blue-700 sm:text-base md:py-3" >

              <img
                src="/images/project/hero/play.svg"
                alt="Access Icon"
                className="h-5 w-5"
              />
              Access the app
            </Link>

            <Link href='/resource-demo' className="flex w-full items-center justify-center gap-2  bg-[#00B515] rounded-lg py-3 text-sm text-white hover:bg-green-700 sm:text-base md:py-3" >
              <img
                src="/images/project/hero/circle.svg"
                alt="Stake Icon"
                className="h-5 w-5"
              />
              Stake the app
            </Link>
          </CardContent>
        </Card>
      )}


      {deploy && (
        <Card className="m-4 rounded-xl bg-white p-4">
          <CardHeader className="mb-10 p-0">
            <CardTitle className="text-base font-semibold text-gray-800 sm:text-lg">
              Your Claims
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {claims.map((claim, index) => (
              <div key={index} className="border-b pb-2 last:border-b-0">
                <div className="flex flex-col gap-1 text-xs text-gray-800 sm:flex-row sm:justify-between sm:gap-2 sm:text-sm">
                  <span className="text-[#262626]">{claim.time}</span>
                  <span className="truncate text-[#262626]">
                    {claim.address}
                  </span>
                  <span className="text-[#262626]">{claim.amount}</span>
                </div>
              </div>
            ))}

            <div>
              <a
                href="#"
                className="text-sm font-medium text-green-600 hover:underline"
              >
                View All
              </a>
            </div>


            <div className="flex items-center gap-3 pt-2">
              <img
                src="/images/project/hero/claim.png"
                alt="OpenX"
                className="h-10 w-10 rounded-xl"
              />
              <p className="text-xs leading-snug text-gray-500">
                Main website with high conversion optimization, featuring clear
                messaging, CTAs, and viral engagement strategies.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
