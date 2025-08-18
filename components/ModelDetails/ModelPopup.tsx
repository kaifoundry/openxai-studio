'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
const MOBILE_BREAKPOINT = 1024

interface ModelPopupProps {
  show: boolean
  title:string
  route:string
}

export default function ModelPopup({ show,title,route }: ModelPopupProps) {
  const [showDialog, setShowDialog] = useState(show ?? false)
  const router = useRouter();
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
  }, [window.innerWidth])

  return (
    <>
      {showDialog ? (
        <Dialog open onOpenChange={setShowDialog}>
          <DialogContent
            className="z-50 max-w-[300px] rounded-2xl py-6  shadow-lg "
            canClose={false}
          >
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-center">
                {title}
              </DialogTitle>
              <DialogDescription className="text-center text-sm text-gray-600 mt-2">
                Please use a different device with a larger screen to use the application.
              </DialogDescription>
            </DialogHeader>

            <div className="flex justify-center mt-6">
              <Button
                onClick={() =>{router.push(route); setShowDialog(false)}}
                className="rounded-lg px-6 py-2"
              >
                OK
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  )
}
