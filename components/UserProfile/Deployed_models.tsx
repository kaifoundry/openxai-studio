import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronsLeft, ListFilter } from 'lucide-react'

import { Input } from '../ui/input'
import Deployed_Model_listing from './Deployed_Model_listing'

interface Deployed_models_props {
  show: boolean
  selectedChains?: string[]
  selectedCategories?: string[]
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const Deployed_models = ({
  show,
  setShow,
  selectedCategories,
  selectedChains,
}: Deployed_models_props) => {
  const [app, setApp] = useState('')
  return (
    <div className="h-full transition-all duration-700 ease-in-out">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
        }}
        className="flex gap-4"
      >
        <div
          className="flex w-14 cursor-pointer items-center justify-center rounded-md border border-[#A3A3A3] p-2"
          onClick={() => setShow(!show)}
        >
          {show ? (
            <ChevronsLeft className="text-[#A3A3A3] transition-transform delay-150 duration-500 ease-in-out" />
          ) : (
            <ListFilter className="text-[#A3A3A3] transition-transform delay-150 duration-500 ease-in-out" />
          )}
        </div>
        <Input
          placeholder="Search Apps"
          value={app}
          onChange={(e) => setApp(e.target.value)}
          className="w-full rounded-md border border-[#A3A3A3] bg-transparent px-2 py-3 text-[#A3A3A3] outline-none focus:border-[#A3A3A3] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </motion.div>

      <Deployed_Model_listing
        show={show}
        selectedCategories={selectedCategories}
        selectedChains={selectedChains}
        app={app}
      />
    </div>
  )
}

export default Deployed_models
