"use client";
import { useState } from "react";
import { PencilLine } from "lucide-react";
import { useAccount } from "wagmi";
import UpdateMonetisationModal from "./UpdateMonetisationModal";
import { motion } from "framer-motion";

interface MonetisationSettingsProps {
    walletAddress: string;
    price: number;
    currency: string;
    estimatedRevenue: number;
    estimatedRevenuePeriod: string;
    serverExpiryDays: number;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
    },
};

function formatAddress(address?: string): string {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function KeyValueRow({
    label,
    value,
}: {
    label: string;
    value: React.ReactNode;
}) {
    return (
        <motion.div
            className="flex justify-between px-1"
            variants={fadeUp}
        >
            <span className="text-[#525252]">{label}</span>
            <span className="font-semibold">{value}</span>
        </motion.div>
    );
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

    const displayAddress = walletAddress || (isConnected ? address : "");

    return (
        <>
            <motion.div
                className="p-4 rounded-lg space-y-7 mt-10 mx-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >

                <motion.div
                    className="bg-[#F5F5F5] rounded-lg border border-[#F0F0F0] flex justify-between items-center px-4 py-3 font-semibold"
                    variants={fadeUp}
                >
                    <span className="text-[#141414]">Monetisation Setting</span>
                    <PencilLine
                        className="w-4 h-4 cursor-pointer text-gray-500"
                        onClick={() => setIsModalOpen(true)}
                    />
                </motion.div>


                <KeyValueRow
                    label="Revenue Wallet Address"
                    value={formatAddress(isConnected ? address : displayAddress)}
                />
                <motion.hr className="border-gray-200" variants={fadeUp} />


                <KeyValueRow
                    label="Price"
                    value={
                        <span className="flex items-center gap-1">
                            {price}
                            <img src="/images/viewDeployment/ollama.svg" alt="currency icon" />
                            <span className="text-blue-600">{currency}</span>
                        </span>
                    }
                />


                <motion.div
                    className="bg-[#F5F5F5] border border-[#F0F0F0] rounded-lg text-[#141414] px-4 py-2 font-semibold"
                    variants={fadeUp}
                >
                    Transfer NFT
                </motion.div>

                <motion.p className="text-gray-500 text-sm" variants={fadeUp}>
                    Transferring ERC721 NFT will transfer the ownership and billing
                    responsibility to the recipient.
                </motion.p>

                <motion.form
                    onSubmit={(e) => {
                        e.preventDefault();
                        console.log("Transfer to:", transferAddress);
                    }}
                    className="flex gap-2"
                    variants={fadeUp}
                >
                    <input
                        type="text"
                        placeholder="Enter Wallet Address"
                        value={transferAddress}
                        onChange={(e) => setTransferAddress(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                    >
                        Transfer
                    </button>
                </motion.form>
            </motion.div>


            <motion.div
                className="p-4 space-y-10 mt-6 mx-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.hr className="border-gray-200" variants={fadeUp} />
                <KeyValueRow
                    label="Estimated Revenue"
                    value={
                        <span className="text-[#0040B8] font-bold text-lg">
                            {estimatedRevenue} {currency}
                            <span className="text-sm font-semibold text-[#0040B8]">
                                /{estimatedRevenuePeriod}
                            </span>
                        </span>
                    }
                />

                {serverExpiryDays > 0 && (
                    <motion.div
                        className="bg-[#FBEFEF] border border-[#F6DFDF] text-[#C73A3A] px-4 py-3 rounded-lg flex justify-between items-center"
                        variants={fadeUp}
                    >
                        <span>Server expiring in {serverExpiryDays} days!</span>
                        <button className="border border-[#C73A3A] px-6 py-1 rounded-lg hover:bg-red-100">
                            Renew
                        </button>
                    </motion.div>
                )}
            </motion.div>

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
