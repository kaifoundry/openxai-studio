"use client";
import { useState } from "react";
import { PencilLine } from "lucide-react";
import UpdateMonetisationModal from "./UpdateMonetisationModal";
import { useAccount } from "wagmi";

interface MonetisationSettingsProps {
    walletAddress: string;
    price: number;
    currency: string;
    estimatedRevenue: number;
    estimatedRevenuePeriod: string;
    serverExpiryDays: number;
}

export default function MonetisationSettings({
    walletAddress,
    price,
    currency,
    estimatedRevenue,
    estimatedRevenuePeriod,
    serverExpiryDays,
}: MonetisationSettingsProps) {
    const [transferAddress, setTransferAddress] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { address, isConnected } = useAccount();
    function formatAddress(address: string): string {
        if (!address) return '';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }

    return (
        <>
            <div className=" p-4 rounded-lg space-y-7  mt-10 mx-4">

                <div className="bg-[#F5F5F5] rounded-lg border-[#F0F0F0] border-[1px] flex justify-between items-center px-4 py-3 font-semibold">
                    <span className="text-[#141414]">Monetisation Setting</span>
                    <PencilLine className="w-4 h-4 cursor-pointer text-gray-500"
                        onClick={() => setIsModalOpen(true)} />
                </div>


                <div className="flex justify-between px-1">
                    <span className="text-[#525252]">Revenue Wallet Address</span>
                    <span className="font-semibold">{isConnected ? formatAddress(address) : formatAddress(address)}</span>
                </div>
                <hr className="border-gray-200" />


                <div className="flex justify-between px-1 ">
                    <span className="text-[#525252]">Price</span>

                    <span className="font-semibold flex items-center gap-1">
                        {price}
                        <img src="/images/viewDeployment/ollama.svg" alt="" />
                        <span className="text-blue-600">{currency}</span>
                    </span>
                </div>


                <div className="bg-[#F5F5F5] border-[#F0F0F0] border-[1px] rounded-lg text-[#141414] px-4 py-2 font-semibold">
                    Transfer NFT
                </div>
                <p className="text-gray-500 text-sm">
                    Transferring ERC721 NFT will transfer the ownership and billing
                    responsibility to the recipient.
                </p>


                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Enter Wallet Adress"
                        value={transferAddress}
                        onChange={(e) => setTransferAddress(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700">
                        Transfer
                    </button>
                </div>
            </div>
            <div className="p-4 space-y-10 mt-6 mx-4">
                <hr className="border-gray-200" />
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-[#525252]">Estimated Revenue</span>
                    <span className="text-[#0040B8] font-bold text-lg">
                        {estimatedRevenue} {currency}
                        <span className="text-sm font-semibold text-[#0040B8]">
                            /{estimatedRevenuePeriod}
                        </span>
                    </span>
                </div>


                {serverExpiryDays > 0 && (
                    <div className="bg-[#FBEFEF] border-[1px] border-[#F6DFDF] text-[#C73A3A] px-4 py-3 rounded-lg flex justify-between items-center">
                        <span>Server expiring in {serverExpiryDays} days!</span>
                        <button className="border border-[#C73A3A] px-6 py-1 rounded-lg hover:bg-red-100">
                            Renew
                        </button>
                    </div>
                )}
            </div>
            {isModalOpen && (
                <UpdateMonetisationModal
                    walletAddress={walletAddress}
                    price={price}
                    currency={currency}
                    onClose={() => setIsModalOpen(false)}
                />
            )}

        </>
    );
}
