
"use client";
import { z } from 'zod'
import LoginProcess from './process'
import { useState,useEffect } from 'react'
import ModelPopup from '@/components/ModelDetails/ModelPopup'
type LoginPageProps = {
  searchParams: {
    redirect?: string
  }
}
const MOBILE_BREAKPOINT = 1024
export default function Login({ searchParams }: LoginPageProps) {
  const redirect = z.string().optional().parse(searchParams.redirect)
   const [showDialog,setShowDialog]=useState(false);
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
  return (
    <section className="container my-20 h-screen">
      {showDialog ?(
      <ModelPopup show={showDialog} title={"Switch to desktop for deploying the app"} route={`/`}/>
      ):(
<LoginProcess redirect={redirect} />
      )}
    </section>
  )
}
