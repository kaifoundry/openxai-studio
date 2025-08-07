import {
  BookText,
  ChartLine,
  Cloud,
  Cpu,
  DatabaseZap,
  Gauge,
  Globe,
  Home,
  IdCard,
  PackageOpen,
  Rocket,
  Star,
  TestTubeDiagonal,
  Users,
  type LucideIcon,
} from 'lucide-react'

import { type Icon } from '@/components/Icons'


// *********************************************** v4 **********************************************************
// type NavCategory = 'main'
// export type NavItem = {
//   name: string
//   icon?: LucideIcon | Icon
// } & (
//   | {
//       type: 'item'
//       href: string
//     }
//   | {
//       type: 'category'
//       items: NavItem[]
//       disabled?: boolean
//     }
// )
// export const navItems: Record<NavCategory, NavItem[]> = {
//   main: [
//     {
//       type: 'item',
//       name: 'Home',
//       href: '/',
//       icon: Home,
//     },
//     {
//       type: 'item',
//       name: 'App Store',
//       href: '/app-store',
//       icon: PackageOpen,
//     },
//     {
//       type: 'item',
//       name: 'Deployments',
//       href: '/deployments',
//       icon: Rocket,
//     },
//     {
//       type: 'item',
//       name: 'Claims',
//       href: 'https://dashboard.openxai.org/claims',
//       icon: Star,
//     },
//     {
//       type: 'item',
//       name: 'Resources',
//       href: '/resources',
//       icon: DatabaseZap,
//     },
//     {
//       type: 'item',
//       name: 'Documentation',
//       href: 'https://docs.openxai.org/',
//       icon: BookText,
//     },
//     {
//       type: 'item',
//       name: 'Community',
//       href: 'https://community.openxai.org/',
//       icon: Users,
//     },
//   ],
// }

//****************************************************** v5 **************************************************
type NavCategory = 'main'
export type NavItem = {
  name: string
  icon?: string
} & (
  | {
      type: 'item'
      href: string
    }
  | {
      type: 'category'
      items: NavItem[]
      href: string
      disabled?: boolean
    }
)
export const navItems: Record<NavCategory, NavItem[]> = {
  main: [
    {
      type: 'item',
      name: 'Home',
      href: '/',
      icon: '/images/nav/Home.svg',
    },
    {
      type: 'item',
      name: 'App Store',
      href: '/app-store',
      icon: '/images/nav/appStore.svg',
    },
    {
      type: 'item',
      name: 'Deployments',
      href: '/deployments',
      icon: '/images/nav/speed.svg',
    },
    {
      type: 'item',
      name: 'Reward',
      href: 'https://dashboard.openxai.org/claims',
      icon: '/images/nav/Layer_1.svg',
    },
    {
      type: 'item',
      name: 'Resources',
      href: '/resources',
      icon: '/images/nav/Group 36633.svg',
    },
    {
      type: 'item',
      name: 'Documentation',
      href: 'https://docs.openxai.org/',
      icon: '/images/nav/document.svg',
    },
    {
      type: 'item',
      name: 'Community',
      href: 'https://community.openxai.org/',
      icon: '/images/nav/community.svg',
    },
    {
      type: 'item',
      name: 'Open Circle',
      href: 'https://community.openxai.org/',
      icon: '/images/nav/opencricle.svg',
    },
  ],
}