import React, { useState } from 'react';
import {TopSeller} from "../AIModelDirectory/ai-model-top-seller"
import { ChevronRight, DollarSign, Percent, BarChart2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ModelBlanceDetails {
    id:string;
}

const ModelBalance = ({id}:ModelBlanceDetails) => {
    const router = useRouter();
    const [balance, setBalance] = useState(1000.2);
    const [tokenSymbol, setTokenSymbol] = useState('$OPENX');
    const [minComputingCost, setMinComputingCost] = useState(17.45);
    const [gasFees, setGasFees] = useState(17.45);
    const [rewardPriority, setRewardPriority] = useState(43);
    const [appStakingRewards, setAppStakingRewards] = useState(173);

    const formatBalance = (value: number) =>
        new Intl.NumberFormat('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);

    const formatPercentage = (value: number) => `~${value}%`;

    return (
        <>
            <div className="flex items-center justify-center p-4 font-sans">
                <div className=" w-full max-w-md rounded-xl p-6  sm:p-8">

                    <div className="mb-8">
                        <p className="mb-1 text-[16px] font-medium text-[#1B1A1E]">Your Balance</p>
                        <div className="flex items-baseline space-x-2">
                            <span className="text-[36px] font-bold text-[#0A0A0A]">
                                {formatBalance(balance)}
                            </span>
                            <span className="text-[22px] font-[400] text-[#0A0A0A]">{tokenSymbol}</span>
                            <a href="#" className="ml-auto text-sm font-medium text-[#00B306] underline">
                                Claim
                            </a>
                        </div>
                    </div>


                    <div className="mb-8">
                        <h2 className="mb-4 text-[14px] font-medium text-[#1B1A1E]">Deploy app</h2>
                        <div className="space-y-4">

                            <div className="flex items-center justify-between py-2">
                                <span className="text-[16px] font-medium text-[#000000]">Support Chain</span>
                                <div className="flex items-center space-x-3">
                                    <img src="/images/appStore/svg/chains/etherium.svg" alt="Ethereum Logo" className="w-6 h-6" />
                                    <img src="/images/appStore/svg/chains/ollama.svg" alt="Ollama Logo" className="w-6 h-6" />
                                    <img src="/images/appStore/svg/chains/chain.svg" alt="Chain Logo" className="w-6 h-6" />
                                </div>
                            </div>


                            <div className="flex items-center justify-between py-2">
                                <span className="text-left text-[16px] font-medium text-[#000000]">Min. Computing Cost</span>
                                <div className="flex items-center space-x-1">~
                                    <DollarSign size={16} />
                                    <span className="text-[18px] font-medium text-[#0A0A0A]">{minComputingCost}</span>
                                </div>
                            </div>


                            <div className="flex items-center justify-between py-2 ">
                                <span className="text-[16px] font-medium text-[#000000]">Gas fees</span>
                                <div className="flex items-center space-x-1">~
                                    <DollarSign size={16} />
                                    <span className="text-[18px] font-medium text-[#0A0A0A]">{gasFees}</span>
                                </div>
                            </div>


                            <div className="flex items-center justify-between py-2 ">
                                <span className="text-[16px] font-medium text-[#000000]">Reward Priority</span>
                                <span className="text-[18px] font-medium text-[#0A0A0A]">{rewardPriority}</span>
                            </div>


                            <div className="flex items-center justify-between py-2 ">
                                <span className="text-[16px] font-bold text-[#000000]">App Staking Rewards</span>
                                <span className="text-[18px] font-bold text-[#0A0A0A]">{formatPercentage(appStakingRewards)}</span>
                            </div>
                        </div>
                    </div>


                    <button className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-md transition duration-200 ease-in-out hover:bg-blue-700"
                    onClick={()=>{router.push(`/model-deployment/${id}`)}}
                    >
                        Deploy
                    </button>
                </div>
            </div>

            <TopSeller />
        </>
    );
};

export default ModelBalance;
