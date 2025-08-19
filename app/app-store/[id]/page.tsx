"use client"
import ModelDefinitions from '@/utils/model-definitions.json';

import {
    ModelHeader,
    ModelStats,
    ModelContent,
    // ModelSidebar,
    ModelStat,
    ModelBalance
} from '@/components/ModelDetails';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';

export default function BTCOraclePage() {
    const [data, setData] = useState(null);
    const [deploy, setDeploy] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState('auto');
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    useEffect(() => {
        if (id) {
            const found = ModelDefinitions.find(item => item.id === id);
            setData(found || null);
        }
    }, [id]);

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(`${contentRef.current.offsetHeight}px`);
        }
    }, []);

    if (!data) return <div className="relative flex justify-center items-center w-full h-screen lg:h-full">
        <div className="w-12 h-12 rounded-full absolute border-2 border-solid border-gray-200"></div>
        <div
            className="w-12 h-12 rounded-full animate-spin absolute border-2 border-solid border-violet-500 border-t-transparent shadow-md">
        </div>
    </div>;

    return (
        <section className='flex md:flex-row flex-col'>
            <div className="md:w-[65%] w-full" ref={contentRef}>
                <ModelHeader
                    image={data.image}
                    title={data.name}
                    subtitle={Array.isArray(data.tags) ? data.tags.join(', ') : data.tags}
                />
                <ModelStats
                    likes={data.likes.toString()}
                    users={data.followers.toString()}
                    trending={data.trending.toString()}
                    apy={data.apy.toString()}
                    deploy={deploy}
                    setDeploy={setDeploy}
                />
                <div className="mx-auto px-4 sm:px-0 lg:px-6 py-6 sm:py-8 lg:py-12">
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
                        <div className="xl:col-span-3 space-y-6 sm:space-y-8">
                            <ModelContent
                                description={data.longDesc}
                                concept={data.desc}
                                howItWorks={data.howItWorks}
                            />

                            <ModelStat transactions={data?.transactions ?? []} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:w-[35%] w-full">
                <div className="sticky top-6" style={{ height: contentHeight }}>
                    {/* <ModelSidebar deploy={deploy} setDeploy={setDeploy} claims={data?.claims ?? []} /> */}
                    <ModelBalance id={id}/>
                </div>
            </div>
        </section>
    );
}
