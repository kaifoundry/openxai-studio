'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Files, Eye } from 'lucide-react'
import { motion } from 'framer-motion'

interface Deployment {
    timeAndDate: string;
    version: string;
    deployer: string;
    age: string;
    type: string;
    signature: string;
}

export function ModelDeployment({ deployments }: { deployments?: Deployment[] }) {
    if (!Array.isArray(deployments) || deployments.length === 0) {
        return (
            <Card>
                <CardContent className="py-6 text-center text-sm text-gray-500">
                    No deployments available.
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            <div>
                <div className="mb-4 flex ">
                    <h2 className="text-lg font-medium"> Latest Deployments</h2>

                </div>
            </div>
            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto hide-scrollbar">
                        <motion.table
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            viewport={{ once: true }}
                            className="w-full min-w-[800px]">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Time & Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Version
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Deployer
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Age
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Signature
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {deployments.map((deployment, index) => (
                                    <motion.tr
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                        viewport={{ once: true }}
                                        key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {deployment.timeAndDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {deployment.version}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {deployment.deployer || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {deployment.age}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium  border border-[#F0F0F0] bg-[#F5F5F5] text-gray-800">
                                                {deployment.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {deployment.signature || '-'}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </motion.table>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
