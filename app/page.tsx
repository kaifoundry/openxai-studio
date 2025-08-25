'use client'

import Link from 'next/link'
import { Blocks, Cloud, IdCard, Server } from 'lucide-react'
import { motion } from 'framer-motion'
import { SimpleTooltip } from '@/components/Common/SimpleTooltip'
import YouTube from 'react-youtube'

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <section className="pb-12 lg:pt-24 mt-14 lg:mt-0 w-full">
        <div className="flex gap-12 lg:gap-0 xl:gap-0 2xl:gap-12 flex-col items-center px-4 md:px-6 xl:px-6 2xl:px-12 justify-between md:flex-row">

          <div className="w-full text-left xl:w-3/5">

            <motion.h1
              className="text-[43px] leading-snug xl:leading-tight font-bold md:text-[30px] lg:text-[4vw] xl:text-[65px]"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              Build AI applications <span>& agents in lightning</span> speed.
            </motion.h1>

            <motion.p
              className="text-lg mt-4 font-medium md:text-xl lg:text-[2vw] xl:text-3xl"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
            >
              You own your model, data & infrastructure
            </motion.p>

            <motion.div
              className="mt-12 flex flex-row items-center gap-3 justify-start"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { delayChildren: 0.3, staggerChildren: 0.15 }
                }
              }}
            >
              <motion.a
                variants={{
                  hidden: { y: 60, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                href="/app-store"
                className="whitespace-nowrap flex h-12 sm:h-14 items-center rounded-lg sm:rounded-xl bg-primary px-4 sm:px-8 text-sm font-medium text-background transition-colors hover:bg-primary/90"
              >
                Build for Free
              </motion.a>

              <motion.a
                variants={{
                  hidden: { y: 60, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                href="/explore"
                className="whitespace-nowrap flex h-12 sm:h-14 items-center rounded-lg sm:rounded-xl px-4 sm:px-8 text-sm font-medium underline transition-colors hover:bg-foreground/10"
              >
                Earn free server
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            className="relative w-full xl:w-2/5 overflow-hidden rounded-xl flex justify-center"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
          >
            <YouTube
              videoId="3wy3vgErmrk"
              className="rounded-xl p-3 bg-foreground/10 w-full md:max-w-[500px] lg:w-[500px] h-[280px]"
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
          </motion.div>
        </div>
      </section>

      <motion.section
        className="my-20 pb-10 space-y-4 px-4 md:px-6 lg:px-8"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-xl font-bold md:text-2xl">Quick Access</h2>

        <motion.div
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 lg:gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { delayChildren: 0.7, staggerChildren: 0.15 },
            },
          }}
        >
          {[
            { href: "/claim", icon: <IdCard className="size-8" strokeWidth={1.5} />, label: "Redeem an Xnode DVM" },
            { href: "/app-store", icon: <Server className="size-8" strokeWidth={1.5} />, label: "About Xnode One" },
            { href: "/app-store", icon: <Blocks className="size-8" strokeWidth={1.5} />, label: "Run a Node" },
            { href: "/", icon: <Cloud className="size-8" strokeWidth={1.5} />, label: "Provide Resources", tooltip: "Coming Soon!" }
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { y: 60, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {item.tooltip ? (
                <SimpleTooltip tooltip={item.tooltip}>
                  <Link
                    href={item.href}
                    className="flex cursor-default items-center gap-2 rounded border bg-foreground/10 p-4 text-sm font-semibold text-gray-400 transition-colors"
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </SimpleTooltip>
              ) : (
                <Link
                  href={item.href}
                  className="flex items-center gap-2 rounded-xl border p-4 text-sm font-semibold transition-colors hover:bg-foreground/5"
                >
                  {item.icon}
                  {item.label}
                </Link>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </motion.div>
  )
}