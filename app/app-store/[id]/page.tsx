"use client"
import ModelDefinitions from '@/utils/model-definitions.json';
import {
    ModelHeader,
    ModelStats,
    ModelContent,
    ModelDeployment,
    ModelBalance
} from '@/components/ModelDetails';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import userDetails from '@/utils/user_details.json'
import MonetisationSettings from '@/app/deployments/MonetisationSettings';

export default function BTCOraclePage() {
    const searchParams = useSearchParams();
    const deployed = searchParams.get('deploy') === 'true';

    const [data, setData] = useState<any>(null);
    const [deploy, setDeploy] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState('auto');

    const [displayName, setDisplayName] = useState<string>('Unknown');
    const [sellerImage, setSellerImage] = useState<string | undefined>(undefined);
    const [sellerId, setSellerId] = useState<number | null>(null);

    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (id) {
            const found = ModelDefinitions.find(item => item.id === id);
            setData(found || null);

            if (found?.Seller && found.Seller.length > 0) {
              
                const seller = found.Seller[0];
              
                const matchedUser = userDetails.find((user: any) => user.id === seller.id);

                setSellerImage(matchedUser?.profilePic || undefined);
                setDisplayName(matchedUser?.name || 'Unknown');
                setSellerId(matchedUser?.id ?? null);
            }
        }
    }, [id]);

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(`${contentRef.current.offsetHeight}px`);
        }
    }, [data]);

    if (!data) {
        return (
            <div className="relative flex justify-center items-center w-full h-screen lg:min-h-screen">
                <div className="w-12 h-12 rounded-full absolute border-2 border-solid border-gray-200"></div>
                <div
                    className="w-12 h-12 rounded-full animate-spin absolute border-2 border-solid border-violet-500 border-t-transparent shadow-md">
                </div>
            </div>
        );
    }

    return (
        <section className='flex md:flex-row flex-col'>
            <div className="md:w-[65%] w-full" ref={contentRef}>
                <ModelHeader
                    image={data.image}
                    title={data.name}
                    subtitle={Array.isArray(data.tags) ? data.tags.join(', ') : data.tags}
                    showEdit={deployed}
                />
                <ModelStats
                    likes={data.likes.toString()}
                    users={data.followers.toString()}
                    trending={data.trending.toString()}
                    apy={data.apy.toString()}
                    profileName={displayName}
                    profileImage={sellerImage}
                    modelId={sellerId}
                />
                <div className="mx-auto px-4 sm:px-0 lg:px-6 py-4 lg:py-6 ">
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
                        <div className="xl:col-span-3 space-y-2 ">
                            <ModelContent
                                description={data.longDesc}
                                concept={data.desc}
                                howItWorks={data.howItWorks}
                            />
                            <ModelDeployment deployments={data?.deployments ?? []} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:w-[35%] w-full">
                {!deployed && (
                    <div className="sticky top-6" style={{ height: contentHeight }}>
                        <ModelBalance id={id} />
                    </div>
                )}
                {deployed && (
                    <MonetisationSettings
                        walletAddress="xyz6etbhbjd...8ghyuhn75"
                        price={123.45}
                        currency="OPENX"
                        estimatedRevenue={456.78}
                        estimatedRevenuePeriod="mo"
                        serverExpiryDays={3}
                    />
                )}
            </div>
        </section>
    );
}
