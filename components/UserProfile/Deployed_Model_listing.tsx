import React,{useState,useEffect,useMemo,useCallback} from 'react'
import DeployedModels from '../../utils/deployed-apps.json'
import { motion } from 'framer-motion'
import Card from '../AIModelDirectory/ai-model-card';
import Image from 'next/image';

const containerVariants = (isFirst: boolean) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: isFirst ? 0.5 : 0.2, 
      },
    },
  });
  
  interface AppContentProps {
    selectedChains?: string[]
    selectedCategories?: string[]
    show?:boolean
  }
const Deployed_Model_listing = ({
    selectedChains,
    selectedCategories,
    show
}:AppContentProps) => {
    const [collapsed, setCollapsed] = useState(true)
    const [visibleCounts, setVisibleCounts] = useState<{ [key: string]: number }>(
      {}
    )
    const [lastVisibleCounts, setLastVisibleCounts] = useState<{
      [key: string]: number
    }>({})
    const [firstLoad, setFirstLoad] = useState(true)
  
    useEffect(() => {
      //     const initialCollapsed = localStorage.getItem("nav-collapsed");
      // if (initialCollapsed !== null) {
      //   setCollapsed(initialCollapsed === "true");
      // }
  
      const handler = (e: CustomEvent) => {
        setCollapsed(e.detail.collapsed)
      }
  
      window.addEventListener('nav-collapsed-change', handler as EventListener)
      return () =>
        window.removeEventListener(
          'nav-collapsed-change',
          handler as EventListener
        )
    }, [])
  
    const uniqueCategories = useMemo(() => {
      const categories = DeployedModels.map((item) => item.category)
      return [...new Set(categories)]
    }, [])
  
    const filterModels = (category: string) => {
      return DeployedModels.filter((item) => {
        const matchChain =
          selectedChains?.length > 0
            ? item?.chains?.some((c: any) => selectedChains.includes(c.name))
            : true
        const matchCategory =
          selectedCategories?.length > 0
            ? selectedCategories.includes(item.category)
            : true
        return matchChain && matchCategory && item.category === category
      })
    }
  
    const filterKey = useMemo(() => {
      return `${selectedChains?.join(',')} -${selectedCategories?.join(',')}`;
    }, [selectedChains, selectedCategories]);
  
    const getVisibleCount = () => {
      if (typeof window !== 'undefined') {
        const width = visualViewport.width
        if (width >= 1920) {
          return 4
        } else if (width >= 1000 && width <= 1300) {
          return 3
        }
        else if (width > 1300 && width < 1500 ) {
          return 3
        }else if (width >= 1500 ) {
          return collapsed ? 4 : 4
        } else if (width >= 768 && width < 1000) {
          return 2
        }
      }
      return collapsed ? 4 : 3
    }
  
    useEffect(() => {
        
        const handleResize = () => {
          getVisibleCount();
        }
    
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
      }, [window.innerWidth,collapsed])
  
   
    const allMatchingModels = useMemo(() => {
      return DeployedModels?.filter((item) => {
        const matchChain =
          selectedChains?.length > 0
            ? item.chains?.some((c: any) => selectedChains?.includes(c.name))
            : true
        const matchCategory =
          selectedCategories?.length > 0
            ? selectedCategories?.includes(item.category)
            : true
        return matchChain && matchCategory
      })
    }, [selectedChains, selectedCategories])
  
    if (
      (selectedCategories?.length > 0 || selectedChains?.length > 0) &&
      allMatchingModels?.length === 0
    ) {
      return (
        <div className="w flex h-[400px] items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center text-gray-400"
          >
            <Image src="/images/no-data-6.png" alt="" width={150} height={150} />
            <div>No Apps Found</div>
          </motion.div>
        </div>
      )
    }
    return (
      <div className={`grid ${show ?'grid-cols-3':'grid-cols-4'} transition duration-700 delay-300`}>
        {DeployedModels.map((data,id)=>{
return (
    <motion.div
      key={data?.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, }}
    >
      <Card
        id={data?.id}
        image={data?.image}
        title={data?.name}
        hashTags={data?.tags}
        logo={data?.logo}
        icons={data?.chains}
        likes={data?.likes}
        followers={data?.followers}
        apy={data?.apy}
        Seller={data?.Seller}
      />
    </motion.div>
  )
        })}
      </div>
    )
}

export default Deployed_Model_listing