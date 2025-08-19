'use client'

import Link from 'next/link'
import { Blocks, Cloud, IdCard, Server } from 'lucide-react'



import { SimpleTooltip } from '@/components/Common/SimpleTooltip'
import YouTube from 'react-youtube'

export default function Home() {
  return (
    <>
      <section className=" mb-12 lg:mt-24 mt-14 w-full px-4 md:px-6 lg:px-8  ">
        <div className="flex gap-12 flex-col items-center md:px-6 justify-between md:flex-row">
          <div className="w-full text-left lg:w-3/5 lg:text-left">
            <h1 className="text-balance text-3xl font-bold md:text-4xl lg:text-6xl">
              Build AI applications <span className="whitespace-nowrap">& agents in lightning</span> speed.
            </h1>
            <p className="mt-4 text-pretty text-xl font-medium md:text-xl lg:text-3xl">
              You own your model, data & infrastructure
            </p>
            <div className="mt-12 flex flex-row items-center gap-3 justify-start">
              <a
                href="/app-store"
                className="flex h-12 sm:h-14 items-center rounded-lg sm:rounded-xl bg-primary px-4 sm:px-8 text-sm font-medium text-background transition-colors hover:bg-primary/90"
              >
                Build for Free
              </a>
              <a
                href="/explore"
                className="flex h-12 sm:h-14 items-center rounded-lg sm:rounded-xl px-4 sm:px-8 text-sm font-medium underline transition-colors hover:bg-foreground/10"
              >
                Earn free server
              </a>
            </div>

          </div>
          <div className="relative w-full lg:w-2/5 overflow-hidden rounded-xl flex justify-center">
            <YouTube
              videoId="3wy3vgErmrk"
              className="rounded-xl p-3 bg-foreground/10 w-full  md:w-[500px] h-[280px]"
              opts={{
                width: "100%",
                height: "100%",
                playerVars: {
                  autoplay: 0,
                  modestbranding: 1,
                  rel: 0,
                },
              }}
            />
          </div>


        </div>
      </section>
      <section className="my-20 space-y-4 px-4 md:px-6 lg:px-8">
        <h2 className="text-xl font-bold md:text-2xl">Quick Access</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          <Link
            href="/claim"
            className="flex items-center gap-2 rounded-xl border p-4 text-sm font-semibold transition-colors hover:bg-foreground/5"
          >
            <IdCard className="size-8" strokeWidth={1.5} />
            Redeem an Xnode DVM
          </Link>
          <Link
            href="/app-store"
            className="flex items-center gap-2 rounded-xl border p-4 text-sm font-semibold transition-colors hover:bg-foreground/5"
          >
            <Server className="size-8" strokeWidth={1.5} />
            About Xnode One
          </Link>
          <Link
            href="/app-store"
            className="flex items-center gap-2 rounded-xl border p-4 text-sm font-semibold transition-colors hover:bg-foreground/5"
          >
            <Blocks className="size-8" strokeWidth={1.5} />
            Run a Node
          </Link>
          <SimpleTooltip tooltip="Coming Soon!">
            <Link
              href="/"
              className="flex cursor-default items-center gap-2 rounded border bg-foreground/10 p-4 text-sm font-semibold text-gray-400 transition-colors"
            >
              <Cloud className="size-8" strokeWidth={1.5} />
              Provide Resources
            </Link>
          </SimpleTooltip>
        </div>
      </section>
    </>
  )
}
