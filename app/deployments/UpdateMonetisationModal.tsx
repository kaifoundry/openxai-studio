"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface ModalProps {
    walletAddress: string;
    price: number;
    currency: string;
    onClose: () => void;
}

export default function UpdateMonetisationModal({
    walletAddress,
    price,
    currency,
    onClose,
}: ModalProps) {
    const [address, setAddress] = useState(walletAddress);
    const [priceValue, setPriceValue] = useState(price);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg md:w-1/2 w-full">

                <div className="flex justify-between items-center px-6 py-4 border-b">
                    <h2 className="font-semibold">Update Monetisation Details</h2>
                    <X className="w-5 h-5 cursor-pointer" onClick={onClose} />
                </div>

                <div className="px-6 py-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Revenue Wallet Address
                        </label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full border border-blue-400 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Revenue Price
                        </label>
                        <div className="flex items-center gap-2 ">

                            <input
                                type="number"
                                value={priceValue}
                                onChange={(e) => setPriceValue(Number(e.target.value))}
                                className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 "
                            />


                            <select className=" border w-52  border-gray-300 rounded-lg px-3 py-2 text-gray-900  ">

                                <option>
                                    <div><img src="/images/viewDeployment/ollama.svg" alt="" /></div>
                                    {currency}
                                </option>
                            </select>


                            <a
                                href="#"
                                className=" text-blue-600 text-sm underline whitespace-nowrap"
                            >
                                View on Explorer
                            </a>
                        </div>

                    </div>

                    <button className="text-blue-600 text-sm underline">
                        + Add Chain
                    </button>
                </div>


                <div className="my-8 flex w-full gap-4 px-6 ">
                    <button
                        onClick={onClose}
                        className="w-full rounded-[12px] border border-[#4787FF] px-4 py-2 text-blue500 hover:bg-blue-50"
                    >
                        Cancel
                    </button>
                    <button className="w-full rounded-[12px] bg-blue500 px-4 py-2 text-white hover:bg-blue-700">
                        Update Details
                    </button>
                </div>
            </div>
        </div>
    );
}
