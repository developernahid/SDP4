'use client';
import Link from 'next/link';
import { ServiceCard } from '@/Components/Hero';
import { serviceCategories } from '@/public/Services';
import React, { useEffect, useState } from 'react';

const ServicePage = ({ params }) => {
    const resolvedParams = typeof React.use === 'function' ? React.use(params) : params;
    const Service = resolvedParams?.id?.split('-')[0]?.toLowerCase();

    const [data, setData] = useState(null);
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const categories = await serviceCategories();
            if (!Service) return;
            const res = categories.find((category) => category.id === Service);
            setData(res ?? null);
            if (res?.title) {
                const providerRes = await fetch(`/api/providers?category=${encodeURIComponent(res.title)}`);
                const providerData = await providerRes.json();
                setProviders(providerData || []);
            }
        };
        fetchData();
    }, [Service]);

    return (
        <section className="min-h-[90vh] px-6 py-10 md:px-12">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {data?.featured?.map((item) => (
                    <ServiceCard key={item.id} title={item.title} image={item.image} href={`/services/${Service}/${item.title.split(' ').join('-').toLowerCase()}`} />
                ))}
            </div>

            <div className="mt-10 rounded-3xl border bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-900">Relevant providers</h2>
                        <p className="text-sm text-slate-500">Professionals for {data?.title || 'this service category'} with verified ratings and reviews.</p>
                    </div>
                    <Link href={`/providers?category=${encodeURIComponent(data?.title || '')}`} className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700">
                        View all providers
                    </Link>
                </div>

                {providers.length === 0 ? (
                    <p className="text-sm text-slate-500">No providers are available for this service yet.</p>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {providers.map((provider) => (
                            <div key={provider._id} className="rounded-2xl border p-4">
                                <div className="flex items-center gap-3">
                                    <img src={provider.profilePicture || 'https://placehold.co/80x80'} alt={provider.fullName} className="h-12 w-12 rounded-full object-cover" />
                                    <div>
                                        <h3 className="font-semibold">{provider.fullName}</h3>
                                        <p className="text-sm text-slate-500">{provider.city}</p>
                                    </div>
                                </div>
                                <p className="mt-3 text-sm text-slate-600">{provider.aboutMe?.slice(0, 120) || 'Professional service provider ready to help.'}</p>
                                <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-500">
                                    <span className="rounded-full bg-slate-100 px-3 py-1">⭐ {provider.rating || 0}</span>
                                    <span className="rounded-full bg-slate-100 px-3 py-1">{provider.reviewCount || 0} reviews</span>
                                    <span className="rounded-full bg-slate-100 px-3 py-1">From ${provider.startingPrice || 0}</span>
                                </div>
                                <Link href={`/providers/${provider._id}`} className="mt-4 inline-block rounded-xl bg-violet-600 px-3 py-2 text-sm font-semibold text-white hover:bg-violet-700">
                                    View profile
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ServicePage;
