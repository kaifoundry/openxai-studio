import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, DollarSign, Percent, BarChart2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ModelBlanceDetails {
  id: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.8,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const ModelBalance = ({ id }: ModelBlanceDetails) => {
  const router = useRouter();
  const [balance] = useState(1000.2);
  const [tokenSymbol] = useState('$OPENX');
  const [minComputingCost] = useState(17.45);
  const [gasFees] = useState(17.45);
  const [rewardPriority] = useState(43);
  const [appStakingRewards] = useState(173);

  const formatBalance = (value: number) =>
    new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

  const formatPercentage = (value: number) => `~${value}%`;

  return (
    <>
      <motion.div
        className="flex items-start justify-center py-0  font-sans"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          className="w-full max-w-lg rounded-xl py-0 -mt-4 px-6 sm:p-8"
          variants={containerVariants} 
        >

          <motion.div className="mb-5 px-4 py-3 border-[1px] border-[#EBEBEB] bg-[#F5F8FF] rounded-[16px]" variants={fadeUp}>
            <p className="mb-1 text-[16px] font-medium text-[#666666]">Your Balance</p>
            <div className="flex items-baseline space-x-2">
              <span className="text-[36px] font-bold text-[#0040B8]">
                {formatBalance(balance)}
              </span>
              <span className="text-[22px] font-[600] text-[#0040B8]">{tokenSymbol}</span>
              <a href="#" className="ml-auto text-sm font-medium text-[#3D3D3D] underline">
                Claim
              </a>
            </div>
          </motion.div>


          <motion.div className="mb-4 " variants={fadeUp}>
            <h2 className="mb-4 text-[14px] font-medium text-[#3D3D3D] rounded-[12px] border border-[#F0F0F0] bg-[#F5F5F5] px-4 py-3">Deploy app</h2>
            <div className="space-y-4 lg:px-2 px-0 ">
              <motion.div className="flex items-center justify-between pt-2 pb-0" variants={fadeUp}>
                <span className="text-[16px] font-[400] text-[#525252]">Support Chain</span>
                <div className="flex items-center space-x-3">
                  <img src="/images/appStore/svg/chains/etherium.svg" alt="Ethereum Logo" className="w-6 h-6" />
                  <img src="/images/appStore/svg/chains/ollama.svg" alt="Ollama Logo" className="w-6 h-6" />
                  <img src="/images/appStore/svg/chains/chain.svg" alt="Chain Logo" className="w-6 h-6" />
                </div>
              </motion.div>

              <motion.div className="flex items-center justify-between py-0 " variants={fadeUp}>
                <span className="text-left text-[16px] font-[400] text-[#525252]">Min. Computing Cost</span>
                <div className="flex items-center space-x-1">
                  ~<DollarSign size={16} />
                  <span className="text-[18px] font-medium text-[#0A0A0A]">{minComputingCost}</span>
                </div>
              </motion.div>

              <motion.div className="flex items-center justify-between py-0 " variants={fadeUp}>
                <span className="text-[16px] font-[400] text-[#525252]">Gas fees</span>
                <div className="flex items-center space-x-1">
                  ~<DollarSign size={16} />
                  <span className="text-[18px] font-medium text-[#0A0A0A]">{gasFees}</span>
                </div>
              </motion.div>

              <motion.div className="flex items-center justify-between py-0 " variants={fadeUp}>
                <span className="text-[16px] font-[400] text-[#525252]">Reward Priority</span>
                <span className="text-[18px] font-medium text-[#0A0A0A]">{rewardPriority}</span>
              </motion.div>

              <motion.div className="flex items-center justify-between py-0 pb-2 " variants={fadeUp}>
                <span className="text-[16px] font-medium text-[#3D3D3D]">App Staking Rewards</span>
                <span className="text-[18px] font-bold text-[#3D3D3D]">{formatPercentage(appStakingRewards)}</span>
              </motion.div>
            </div>
          </motion.div>


          <motion.button
            className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white shadow-md hover:bg-blue-700"
            onClick={() => { router.push(`/model-deployment/${id}`) }}
            variants={fadeUp}
          >
            Deploy
          </motion.button>
        </motion.div>
      </motion.div>

    </>
  );
};

export default ModelBalance;
