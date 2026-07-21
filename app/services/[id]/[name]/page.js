/* eslint-disable @next/next/no-img-element */
'use client'
import { useAuth } from '@/context/AuthContext';
import { serviceCategories } from '@/public/Services';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const DetailsPage = ({ params }) => {
    const resolvedParams = typeof React.use === 'function' ? React.use(params) : params;
    const Service = resolvedParams?.name?.toLowerCase().split('-').join(' ');
    console.log(Service);
    console.log(resolvedParams.id)
    const { user } = useAuth();
    console.log(user)

    const [data, setData] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            const categories = await serviceCategories();
            const res = categories.find(category => category.id === resolvedParams.id.toLowerCase()) || [];
            const data = res.featured.find(item => item.title.toLowerCase() === Service.toLowerCase());
            setData(data ?? null);
        };
        fetchData();
    }, [Service, resolvedParams.id]);



    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        name: user?.username || '',
        email: user?.email || '',
        location: '',
        contact: '',
        comment: '',
        status: 'Pending',
    });

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [showModal]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Replace with actual booking logic / API call
        const bookedData = { service: data, ...form };
        axios.post('/api/bookings', bookedData);
        setShowModal(false);
        // Optionally reset form:
        setForm({ name: '', email: '', location: '', contact: '', comment: '' });
    };

    return (
        <>
            {data ? (
                <div className="max-w-5xl mx-auto p-6">
                    <Link href={`/services/${resolvedParams.id}`} className="inline-block text-sm text-violet-600 mb-4 hover:underline">
                        ← Back to {resolvedParams.id}
                    </Link>

                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2">
                                <img
                                    src={data.image}
                                    alt={data.title}
                                    className="w-full h-72 md:h-96 object-cover"
                                />
                                <div className="p-6">
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{data.title}</h1>
                                    <p className="text-sm text-gray-600 mb-4">{data.description}</p>

                                    {data.details && (
                                        <div className="mt-4 space-y-3 text-sm text-gray-700">
                                            {Array.isArray(data.details) ? (
                                                data.details.map((d, i) => (
                                                    <p key={i}>{d}</p>
                                                ))
                                            ) : (
                                                <p>{data.details}</p>
                                            )}
                                        </div>
                                    )}

                                    {data.features?.length > 0 && (
                                        <div className="mt-6">
                                            <h3 className="text-sm font-medium text-gray-800 mb-2">Features</h3>
                                            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                                {data.features.map((f, i) => (
                                                    <li key={i}>{f}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <aside className="p-6 border-l md:border-l border-transparent md:border-gray-100">
                                <div className="space-y-4">
                                    <div className="text-sm text-gray-500">Price</div>
                                    <div className="text-2xl font-semibold text-gray-900">
                                        {data.price ? data.price : 'Contact for price'}
                                    </div>

                                    {data.duration && (
                                        <div>
                                            <div className="text-sm text-gray-500">Duration</div>
                                            <div className="text-sm text-gray-700">{data.duration}</div>
                                        </div>
                                    )}

                                    {data.rating && (
                                        <div>
                                            <div className="text-sm text-gray-500">Rating</div>
                                            <div className="text-sm text-gray-700">{data.rating} / 5</div>
                                        </div>
                                    )}

                                    {data.provider && (
                                        <div className="pt-2 border-t border-gray-100">
                                            <div className="text-xs text-gray-500">Provider</div>
                                            <div className="mt-2 flex items-center gap-3">
                                                {data.provider.avatar && (
                                                    <img src={data.provider.avatar} alt={data.provider.name} className="w-10 h-10 rounded-full object-cover" />
                                                )}
                                                <div className="text-sm">
                                                    <div className="font-medium text-gray-800">{data.provider.name}</div>
                                                    <div className="text-xs text-gray-500">{data.provider.phone ?? data.provider.email}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-6">
                                        <button
                                            type="button"
                                            onClick={() => setShowModal(true)}
                                            className="inline-block w-full text-center py-3 px-4 rounded-lg bg-violet-600 text-white font-medium text-sm hover:bg-violet-700 transition-colors"
                                        >
                                            Book Now
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => navigator.clipboard?.writeText(window.location.href)}
                                            className="mt-3 w-full text-center py-2 px-3 rounded-lg border border-gray-200 text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                            Copy link
                                        </button>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>

                </div>
            ) : Service ? (
                <div className="max-w-3xl mx-auto p-6 text-center text-gray-600">Loading service details…</div>
            ) : (
                <div className="max-w-3xl mx-auto p-6 text-center text-red-500">No data found for this service.</div>
            )}

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setShowModal(false)}
                        aria-hidden="true"
                    />
                    <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                        <div className="flex items-center justify-between p-4 border-b">
                            <h3 className="text-lg font-medium">Book: {data?.title ?? Service}</h3>
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                                aria-label="Close"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-4 space-y-3">
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Name</label>
                                <input name="name" value={form.name} onChange={handleChange} required className="w-full border rounded px-3 py-2 text-sm" />
                            </div>

                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Email</label>
                                <input name="email" type="email" value={form.email} disabled={true} onChange={handleChange} required className="w-full border rounded px-3 py-2 text-sm" />
                            </div>

                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Location</label>
                                <input name="location" value={form.location} onChange={handleChange} className="w-full border rounded px-3 py-2 text-sm" />
                            </div>

                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Contact No</label>
                                <input name="contact" value={form.contact} onChange={handleChange} className="w-full border rounded px-3 py-2 text-sm" />
                            </div>

                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Comment</label>
                                <textarea name="comment" value={form.comment} onChange={handleChange} className="w-full border rounded px-3 py-2 text-sm" rows={3} />
                            </div>

                            <div className="flex gap-2">
                                <button type="submit" className="flex-1 py-2 px-4 bg-violet-600 text-white rounded">Submit</button>
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2 px-4 border rounded">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default DetailsPage
