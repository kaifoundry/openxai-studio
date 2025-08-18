"use client"
import React,{useEffect,useState} from 'react'
import { Services,Amount } from '@/components/ModelDeployment'
import { useParams } from 'next/navigation'
import { DeploymentContextProvider } from '@/app/deploy/deployment-context'
import {
  getSpecsByTemplate,
  serviceByName,
  usecaseById,
  type AppStoreItem,
  type AppStorePageType,
  type ServiceData,
  type Specs,
} from '@/types/dataProvider'
import { redirect } from 'next/navigation'
import ModelDefinition from "../../../utils/model-definitions.json"
import ModelPopup from '@/components/ModelDetails/ModelPopup'
const MOBILE_BREAKPOINT = 1024
const Page = () => {
  const params = useParams();
  const [showDialog,setShowDialog]=useState(false);
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    function getData() {
        if (!id ) redirect('/app-store')
        let data: AppStoreItem | undefined
        let specs: Specs | undefined
        let type: AppStorePageType | undefined
        let services: ServiceData[] | undefined
    
        if (id) {
          const modelDefinition = ModelDefinition.find(m => m.id === id)
          const service = serviceByName(modelDefinition.nixName)
          if (service === undefined) redirect('/app-store')
          data = { ...service, id: service.nixName }
          specs = service.specs
          services = [service]
          type = 'templates'
        }
    
       
        return { data, services, specs, type }
      }
    
      const { data, services, specs, type } = getData()

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
    <DeploymentContextProvider
      initialData={{ name: data.name, description: data.desc, services }}
    >
       {showDialog ?(<ModelPopup show={showDialog} title={"switch to desktop for deploying the app"} route={`/app-store/${id}`}/>)
    :(
        <Services id={id} />
    )}
    </DeploymentContextProvider>
  )
}

export default Page