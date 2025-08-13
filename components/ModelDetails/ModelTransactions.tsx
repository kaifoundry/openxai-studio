'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Files, Eye } from 'lucide-react'
import {motion} from 'framer-motion'
interface Transaction {
    id: string;
    type: string;
    amount: string;
    timeAgo: string;
    details: string;
    status: string;
}

export function ModelStat({ transactions }: { transactions?: Transaction[] }) {
    if (!Array.isArray(transactions) || transactions.length === 0) {
        return (
            <Card>
                <CardContent className="py-6 text-center text-sm text-gray-500">
                    No transactions available.
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <motion.table 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8,delay:0.8 }}
                    viewport={{ once: true }}
                    className="w-full min-w-[640px]">
                        <tbody className="bg-white divide-y divide-gray-200">
                            {transactions.map((transaction, index) => (
                                <motion.tr 
                                initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8,delay:0.3 }}
                    viewport={{ once: true }}
                                key={index} className="hover:bg-gray-50">
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-1 sm:space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-5 w-5 sm:h-6 sm:w-6 p-0 border-2"
                                            >
                                                <Eye className="h-4 w-4 text-gray-700" />
                                            </Button>
                                            <span className="text-xs sm:text-sm font-mono text-blue-600 truncate max-w-[80px] sm:max-w-none">
                                                {transaction.id}
                                            </span>
                                            <Button variant="ghost" size="sm" className="h-5 w-5 sm:h-6 sm:w-6 p-0">
                                                <Files className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-gray-500" />
                                            </Button>
                                        </div>
                                    </td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                        <p className="text-xs border-2 border-gray-200 rounded-md p-1">
                                            {transaction.type}
                                        </p>
                                    </td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                        <span className="text-xs sm:text-sm text-blue-600 font-medium ">
                                            {transaction.amount}
                                        </span>
                                    </td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                        <span className="text-xs sm:text-sm text-gray-500">
                                            {transaction.timeAgo}
                                        </span>
                                    </td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap hidden sm:table-cell">
                                        <span className="text-xs sm:text-sm text-blue-600 truncate max-w-[120px] lg:max-w-none">
                                            {transaction.details}
                                        </span>
                                    </td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                        <Button variant="ghost" size="sm" className="h-6 w-6 sm:h-8 sm:w-8 p-0 ">
                                            <Files className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                                        </Button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </motion.table>
                </div>
            </CardContent>
        </Card>
    );
}
