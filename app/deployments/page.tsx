"use client"
import Image from 'next/image'
import { useAccount } from 'wagmi';
import React, { useEffect, useState , useMemo, useRef} from 'react'
import ModelPopup from '@/components/ModelDetails/ModelPopup';
import { Wallet } from 'lucide-react';
import { useLoading } from '@/contexts/LoadingContext'
import DeploymentPage from './deployment-page'
const MOBILE_BREAKPOINT = 1024
import { Ansi } from '@/components/ui/ansi'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { xnode } from '@openmesh-network/xnode-manager-sdk'

import {
  useProcessLogs,
  useRequestCommandInfo,
  useRequestRequestInfo,
} from '@openmesh-network/xnode-manager-sdk-react'

import { useDemoContext } from '@/contexts/XnodeDemoContext'

import {
  useDemosAvailable,
  useDemoSession,
  type DemoXnode,
} from '@/lib/xnode-demo'


export default function DeploymentsPage() {
  const [showDialog, setShowDialog] = useState(false);
  const { isLoading, loadingMessage,completed } = useLoading()
  const { isConnected, status } = useAccount();

  let { xnode: reservedXnode, deploymentId, processes } = useDemoContext()
  if (reservedXnode?.reservation?.reserved_until < Date.now() / 1000) {
    reservedXnode = undefined
  }

  const xnode_id=reservedXnode?.id
  const request_id=deploymentId


  const session = useDemoSession({ xnode_id })
  const { data: deployment } = useRequestRequestInfo({
    session,
    request_id,
  })

  useEffect(() => {
    if (window.visualViewport.width < MOBILE_BREAKPOINT) {
      setShowDialog(true)
    }
    const handleResize = () => {
      if (window.visualViewport.width > MOBILE_BREAKPOINT) {
        setShowDialog(false)
      } else {
        setShowDialog(true)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [window.visualViewport.width])


  const Loader = () => (
    <div className="relative flex justify-center items-center w-full h-screen lg:min-h-screen">
      <div className="w-12 h-12 rounded-full absolute border-2 border-solid border-gray-200"></div>
      <div className="w-12 h-12 rounded-full animate-spin absolute border-2 border-solid border-violet-500 border-t-transparent shadow-md"></div>
    </div>
  );
  

  if(completed){
    return (
      reservedXnode && (
        <ReservedDemoXnode
          xnode_id={reservedXnode?.id}
          request_id={deploymentId}
          processes={processes}
        />
      )
    )
  
  }

  return (
    <>
      {showDialog ? (
        <div className='h-screen lg:h-full'>
          <ModelPopup show={showDialog} title={"Switch to desktop for deploying the app"} route={`/`} />
        </div>
      )
        : (
          <div className="  my-12 lg:my-6 w-full md:px-8 px-2">
            {status === "connecting" ? (
              <Loader />
            ) : !isConnected ? (
              <div className="flex items-center justify-center w-full">
                <div className="bg-[#F5F8FF] border-2 border-dashed border-[#99BDFF] rounded-lg p-12 text-center w-full">
                  <div className="mb-4">
                    {/* <Image src="/images/deployments/deployment.svg" alt="" width={200} height={200} className="mx-auto" /> */}
                    <svg xmlns="http://www.w3.org/2000/svg"
                      width="180"
                      height="180"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="url(#walletGradient)"
                      stroke-width="0.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-wallet-icon lucide-wallet mx-auto">

                      <defs>
                        <linearGradient id="walletGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stop-color="#54C2FF" />
                          <stop offset="100%" stop-color="#5B69E8" />
                        </linearGradient>
                      </defs>

                      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
                      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
                    </svg>


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
          </div>)}
    </>
  )
}

function ReservedDemoXnodeReady({
  session,
  processes,
}: {
  session?: xnode.utils.Session
  processes?: string[]
}) {
  const [selectedProcess, setSelectedProcess] = useState(processes?.at(0))

  const { data: logs } = useProcessLogs({
    session,
    scope: 'container:xnode-ai-chat',
    process: `${selectedProcess}.service`,
  })

  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const scrollToBottom = useMemo(() => {
    return () => {
      const scrollArea = scrollAreaRef.current?.querySelector(
        '[data-radix-scroll-area-viewport]'
      )
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight
      }
    }
  }, [scrollAreaRef])
  useEffect(() => {
    scrollToBottom()
  }, [logs, scrollToBottom])

  return (
    <div className="flex flex-col gap-1">
      
      <div className="flex flex-col">
        <div className="flex">
          {processes?.map((process) => (
            <Button
              key={process}
              className="w-full"
              onClick={() => setSelectedProcess(process)}
              disabled={process === selectedProcess}
            >
              {process}
            </Button>
          ))}
        </div>
        <div ref={scrollAreaRef}>
          <ScrollArea className="h-[500px] rounded border bg-black">
            <div className="flex flex-col px-3 py-2 font-mono text-muted">
              {logs?.map((log, i) =>
                'UTF8' in log.message ? (
                  <span key={i}>{log.message.UTF8.output}</span>
                ) : (
                  <Ansi key={i}>
                    {Buffer.from(log.message.Bytes.output).toString('utf-8')}
                  </Ansi>
                )
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}

function ReservedDemoXnodeDeployingCommand({
  session,
  request_id,
  command,
}: {
  session?: xnode.utils.Session
  request_id?: xnode.request.RequestId
  command?: string
}) {
  const { data: commandInfo } = useRequestCommandInfo({
    session,
    request_id,
    command,
  })

  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const scrollToBottom = useMemo(() => {
    return () => {
      const scrollArea = scrollAreaRef.current?.querySelector(
        '[data-radix-scroll-area-viewport]'
      )
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight
      }
    }
  }, [scrollAreaRef])
  useEffect(() => {
    scrollToBottom()
  }, [commandInfo?.stderr, scrollToBottom])

  return (
    commandInfo && (
      <div className="flex flex-col gap-1">
        <span>Executing: {commandInfo.command}</span>
        <div ref={scrollAreaRef}>
          <ScrollArea className="h-[500px] rounded border bg-black">
            <div className="flex flex-col px-3 py-2 font-mono text-muted">
              {'UTF8' in commandInfo.stderr
                ? commandInfo.stderr.UTF8.output
                    .split('\n')
                    .map((line, i) => <span key={i}>{line}</span>)
                : Buffer.from(commandInfo.stderr.Bytes.output)
                    .toString('utf-8')
                    .split('\n')
                    .map((line, i) => <Ansi key={i}>{line}</Ansi>)}
            </div>
          </ScrollArea>
        </div>
      </div>
    )
  )
}


function ReservedDemoXnode({
  xnode_id,
  request_id,
  processes,
}: {
  xnode_id?: string
  request_id?: xnode.request.RequestId
  processes: string[]
}) {
  const session = useDemoSession({ xnode_id })
  const { data: deployment } = useRequestRequestInfo({
    session,
    request_id,
  })

  return (
    <div className="flex flex-col gap-1 p-4">
      <span className="text-lg font-semibold">Your demo node</span>
      {deployment &&
        (deployment.result ? (
          <ReservedDemoXnodeReady session={session} processes={processes} />
        ) : (
          <ReservedDemoXnodeDeployingCommand
            session={session}
            request_id={request_id}
            command={deployment.commands.at(-1)}
          />
        ))}
    </div>
  )
}

