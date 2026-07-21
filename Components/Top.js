"use client"
import { serviceCategories } from '@/public/Services';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

// SVG Icon Components
const LocationPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const ACRepairIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-2.022a8.02 8.02 0 00-1.21-3.228l1.43-1.43a.75.75 0 10-1.06-1.06l-1.43 1.43A8.02 8.02 0 0015.5 4.528V2.5a.75.75 0 00-1.5 0v2.028a8.02 8.02 0 00-3.228 1.21l-1.43-1.43a.75.75 0 10-1.06 1.06l1.43 1.43A8.02 8.02 0 004.528 8.5H2.5a.75.75 0 000 1.5h2.028a8.02 8.02 0 001.21 3.228l-1.43 1.43a.75.75 0 101.06 1.06l1.43-1.43A8.02 8.02 0 008.5 19.472V21.5a.75.75 0 001.5 0v-2.028a8.02 8.02 0 003.228-1.21l1.43 1.43a.75.75 0 101.06-1.06l-1.43-1.43a8.02 8.02 0 001.21-3.228H21.5a.75.75 0 000-1.5z" />
    </svg>
);

const ApplianceRepairIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5l.415-.207a.75.75 0 011.085.67V10.5m0 0h6m-6 0a.75.75 0 00.75.75h4.5a.75.75 0 00.75-.75V7.5a.75.75 0 00-.75-.75h-4.5A.75.75 0 0010.5 7.5v3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zM3 14.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5h15V6a.75.75 0 00-.75-.75h-13.5A.75.75 0 004.5 6v13.5z" />
    </svg>
);

const CleaningIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75L6 9v11.25h12V9L12 3.75zM8.25 12h7.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12l-1.5-1.5M8.25 12l1.5-1.5m3 6.75V15" />
    </svg>
);

const ShiftingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0H21m-1.612 0a9 9 0 01-11.963 0m0 0H3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75V15.75M12 6.75V9.75M6.75 12.75H9.75m4.5 0H17.25" />
    </svg>
);




// Reusable Service Card Component
const ServiceCard = ({ icon, title, href }) => (
    <Link href={href} className="group flex flex-col items-center rounded-2xl border border-slate-200 bg-white/90 p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="mb-3 rounded-2xl bg-violet-50 p-3 transition group-hover:scale-105">
            {icon}
        </div>
        <p className="text-sm font-semibold text-slate-700">{title}</p>
    </Link>
);




// Main Component
const PersonalAssistant = () => {
    const [userLocation, setUserLocation] = useState('Your Location');
    const [services, setServices] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const categories = await serviceCategories();
            const formatted = (categories || []).map((category) => ({
                title: category.title.split(' ')[0],
                href: `/services/${category.id}`,
                icon: category.id === 'ac-repair-services' ? <ACRepairIcon /> : category.id === 'appliance-repair' ? <ApplianceRepairIcon /> : category.id === 'cleaning' ? <CleaningIcon /> : category.id === 'shifting' ? <ShiftingIcon /> : <ACRepairIcon />,
            }));
            setServices(formatted);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!navigator?.geolocation) {
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
                    if (res.ok) {
                        const data = await res.json();
                        const addr = data.address || {};
                        const place = addr.city || addr.town || addr.village || addr.state || addr.county || data.display_name || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
                        setUserLocation(place);
                        return;
                    }
                } catch (error) {
                    console.warn('Location lookup failed:', error);
                }
                setUserLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
            },
            (error) => {
                console.warn('Location error:', error);
            },
            { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 }
        );
    }, []);

    const filteredServices = services.filter((service) => service.title.toLowerCase().includes(searchText.toLowerCase()));
    return (
        <section className="relative overflow-hidden bg-transparent">
            <div className="hero-aurora relative isolate overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-[0_30px_80px_rgba(79,70,229,0.12)] backdrop-blur-xl sm:p-8 lg:p-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.9),_transparent_45%)]" />
                <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                    <div className="max-w-2xl">
                        <div className="mb-5 inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-sm font-medium text-violet-700">Fast booking • Verified providers • 24/7 support</div>
                        <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
                            Home services that feel <span className="gradient-text">effortless</span>.
                        </h1>
                        <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">Book trusted professionals for cleaning, repairs, shifting, and more from one elegant platform.</p>

                        <div className="mt-8 flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white/90 p-3 shadow-lg sm:flex-row sm:items-center">
                            <button className="flex items-center justify-center rounded-2xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700 sm:min-w-[220px]">
                                <LocationPinIcon />
                                {userLocation}
                            </button>
                            <input
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder="Search for a service"
                                className="flex-1 rounded-2xl border border-transparent bg-transparent px-4 py-3 text-sm text-slate-700 outline-none ring-0 focus:border-violet-300"
                            />
                            <button className="rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 px-5 py-3 text-white transition hover:scale-[1.02]">
                                <SearchIcon />
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -left-4 top-8 h-24 w-24 rounded-full bg-violet-400/20 blur-3xl" />
                        <div className="absolute -bottom-6 right-0 h-24 w-24 rounded-full bg-pink-400/20 blur-3xl" />
                        <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-slate-900 p-3 shadow-2xl">
                            <img src="/home-cleaning.jpg" alt="Professional home cleaning service" className="h-[320px] w-full rounded-[1.3rem] object-cover" />
                        </div>
                        <div className="absolute -bottom-4 -left-4 overflow-hidden rounded-[1.2rem] border border-white/80 bg-white p-2 shadow-xl">
                            <img src="/plumbing-services.jpg" alt="Plumbing service illustration" className="h-24 w-24 rounded-[0.9rem] object-cover" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto mt-8 max-w-6xl rounded-[2rem] border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">Services</p>
                        <h2 className="text-2xl font-semibold text-slate-900">Popular requests right now</h2>
                    </div>
                    <Link href="/services" className="text-sm font-medium text-violet-600 transition hover:text-violet-700">Browse all</Link>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {filteredServices.length > 0 ? filteredServices.slice(0, 4).map((service, index) => (
                        <ServiceCard key={`${service.title}-${index}`} icon={service.icon} title={service.title} href={service.href} />
                    )) : (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500 sm:col-span-2 lg:col-span-4">Searching for a service is quick and easy. Try AC, cleaning, shifting, or plumbing.</div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PersonalAssistant;
