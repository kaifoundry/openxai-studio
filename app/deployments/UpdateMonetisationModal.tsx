"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useAccount } from "wagmi";

import Image from "next/image";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface ModalProps {
    walletAddress: string;
    price: number;
    currency: string;
    onClose: () => void;
}

export default function UpdateMonetisationModal({

    price,

    onClose,
}: ModalProps) {
    const { address, isConnected } = useAccount();
    const CHAIN_OPTIONS = [
        {
            image: "/images/appStore/svg/chains/ollama.svg",
            value: "OPENX",
        },
        {
            image: "/images/appStore/svg/chains/Etherium.svg",
            value: "Etherium",
        },
        {
            image: "/images/appStore/svg/chains/bitcoin.svg",
            value: "Bitcoin",
        },
    ];

    const [walletAddress, setAddress] = useState<string>(address ?? "");
    const [priceValue, setPriceValue] = useState(price);
    const [selectedChain, setSelectedChain] = useState(CHAIN_OPTIONS[0]);
    const [show, setShow] = useState(false);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 md:px-0 px-2">
            <div className="bg-white rounded-lg shadow-lg md:w-1/2 w-full">
                <div className="flex justify-between items-center px-6 py-4 border-b">
                    <h2 className="font-semibold">Update Monetisation Details</h2>
                    <X className="w-5 h-5 cursor-pointer" onClick={onClose} />
                </div>

                <div className="px-6 py-4 space-y-4">
                    <div >
                        <label className="block text-sm font-medium mb-1">
                            Revenue Wallet Address
                        </label>
                        <div className="flex items-center gap-2 border border-[#E0E0E0]  focus-within:border-[#4787FF] focus-within:border-2 rounded-lg px-3 py-1 justify-between">
                            <input
                                type="text"
                                value={walletAddress}
                                onChange={(e) => { setAddress(e.target.value); setShow(true) }}
                                className="w-full border border-none rounded-lg px-3 py-2 focus:outline-none focus:ring-0 focus:ring-transparent"
                            />
                            {show && (
                                <X className="bg-[#E0EBFF] rounded-full text-[#4787FF] size-5 cursor-pointer p-1 flex justify-center items-center"
                                    onClick={() => {
                                        setAddress(address); setShow(false)
                                    }} />
                            )}
                        </div>
                    </div>


                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Revenue Price
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                value={priceValue}
                                onChange={(e) => setPriceValue(Number(e.target.value))}
                                className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
                            />

                            <Select
                                value={selectedChain.value}
                                onValueChange={(val) => {
                                    const chain = CHAIN_OPTIONS.find((c) => c.value === val);
                                    if (chain) setSelectedChain(chain);
                                }}
                            >
                                <SelectTrigger className="w-72 rounded-lg py-2 px-3 border border-gray-300 focus:ring-0">
                                    <SelectValue placeholder="Select Chain" />
                                </SelectTrigger>
                                <SelectContent>
                                    {CHAIN_OPTIONS.map((chain, index) => (
                                        <SelectItem key={index} value={chain.value}>
                                            <div className="flex items-center gap-2">
                                                <Image
                                                    src={chain.image}
                                                    alt=""
                                                    width={20}
                                                    height={20}
                                                />
                                                {chain.value}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <a
                                href="#"
                                className="text-blue-600 text-sm underline whitespace-nowrap cursor-pointer"
                            >
                                View on Explorer
                            </a>
                        </div>
                    </div>

                    <button className="text-[#141414] text-sm underline cursor-pointer">
                        + Add Chain
                    </button>
                </div>

                <div className="my-8 flex w-full gap-4 px-6">
                    <button
                        onClick={onClose}
                        className="w-full rounded-[12px] border cursor-pointer border-[#4787FF] px-4 py-2 text-blue500 hover:bg-blue-50"
                    >
                        Cancel
                    </button>
                    <button className="w-full cursor-pointer rounded-[12px] bg-blue500 px-4 py-2 text-white hover:bg-blue-700">
                        Update Details
                    </button>
                </div>
            </div>
        </div>
    );
}
