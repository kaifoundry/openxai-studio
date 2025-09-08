import ScrollToTop from '@/components/ScrollToTop'

import '../styles/index.css'

import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'
import { prefix } from '@/utils/prefix'
import { NavProvider } from '@/contexts/NavContext'
import { cn } from '@/lib/utils'
import CTAHelp from '@/components/cta-help'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { NavLayout } from '@/components/SidebarNav/sibebar-nav'
import { LoadingOverlay } from '@/components/ui/loading-overlay'
import { Providers } from './providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'OpenxAI Studio',
  icons: {
    icon: `${prefix}/images/openxai-logo.png`,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const sessionCookie = cookies().get('userSessionToken')

  return (
    <html suppressHydrationWarning lang="en" className='hide-scrollbar '>
      <body
        className={cn(
          'container mx-auto  w-full max-w-[1982px] bg-background lg:bg-[#1C1E2A] p-0 font-sans text-foreground antialiased',
          inter.variable
        )}
      >
        <Providers>
          <NavProvider>
          <Header sessionToken={sessionCookie?.value} />
          <NavLayout>
          
            <div className='lg:rounded-2xl lg:bg-white lg:mr-6 lg:min-h-screen lg:overflow-y-auto hide-scrollbar p-0'>
            {children}
           
            </div>
            <LoadingOverlay/>
            <ScrollToTop />
          </NavLayout>
          </NavProvider>
          <Footer />
          <CTAHelp />
        </Providers>
      </body>
    </html>
  )
}
