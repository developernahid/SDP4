/* eslint-disable @next/next/no-img-element */
import React from 'react';
const services = [
    {
        id: 1,
        title: "Plumbing & Sanitary Services",
        imageUrl: "https://placehold.co/400x300/EBF4FF/4A90E2?text=Plumbing",
        alt: "Plumber fixing a sink"
    },
    {
        id: 2,
        title: "House Shifting Services",
        imageUrl: "https://placehold.co/400x300/FFF3E0/F57C00?text=Movers",
        alt: "Movers loading a truck"
    },
    {
        id: 3,
        title: "Home Cleaning",
        imageUrl: "https://placehold.co/400x300/E8F5E9/388E3C?text=Cleaning",
        alt: "Person cleaning a living room floor"
    },
    {
        id: 4,
        title: "Gas Stove/Burner Services",
        imageUrl: "https://placehold.co/400x300/FBE9E7/D84315?text=Stove+Repair",
        alt: "Hands repairing a gas stove"
    }
];
//

const services1 = [
    {
        id: 1,
        title: "Plumbing & Sanitary Services",
        imageUrl: "https://placehold.co/400x300/EBF4FF/4A90E2?text=Plumbing",
        alt: "Plumber fixing a sink"
    },
    {
        id: 2,
        title: "House Shifting Services",
        imageUrl: "https://placehold.co/400x300/FFF3E0/F57C00?text=Movers",
        alt: "Movers loading a truck"
    },
    {
        id: 3,
        title: "Home Cleaning",
        imageUrl: "https://placehold.co/400x300/E8F5E9/388E3C?text=Cleaning",
        alt: "Person cleaning a living room floor"
    },
    {
        id: 4,
        title: "Gas Stove/Burner Services",
        imageUrl: "https://placehold.co/400x300/FBE9E7/D84315?text=Stove+Repair",
        alt: "Hands repairing a gas stove"
    }
];

/**
 * ServiceCard Component
 * Renders a single service card with an image and a title.
 */
const ServiceCard = ({ imageUrl, title, alt }) => {
    return (
        <div className="group flex flex-col items-center">
            {/* Image container with rounded corners and hover effect */}
            <div className="w-full overflow-hidden rounded-xl bg-gray-100 shadow-sm transition-shadow duration-300 ease-in-out group-hover:shadow-lg">
                <img
                    src={imageUrl}
                    alt={alt}
                    className="h-48 w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/CCCCCC/A0A0A0?text=Image+Error'; }}
                />
            </div>
            {/* Service Title */}
            <h3 className="mt-4 text-center text-lg font-semibold text-gray-800">
                {title}
            </h3>
        </div>
    );
};

/**
 * HomeServices Component
 * Renders the "For Your Home" section with a grid of services.
 */
const HomeServices = () => {
    return (
        <section className="w-full  px-4 py-12 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">
                OurPopular Service
            </h2>

            {/* Responsive grid for service cards */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                {services.map((service) => (
                    <ServiceCard
                        key={service.id}
                        imageUrl={service.imageUrl}
                        title={service.title}
                        alt={service.alt}
                    />
                ))}
            </div>
        </section>
    );
};

//For AC
const AcServices = () => {
    return (
        <section className="w-full  px-4 py-12 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">
                For Your AC
            </h2>

            {/* Responsive grid for service cards */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                {services1.map((service1) => (
                    <ServiceCard
                        key={service1.id}
                        imageUrl={service1.imageUrl}
                        title={service1.title}
                        alt={service1.alt}
                    />
                ))}
            </div>
        </section>
    );
};

export default function App() {
    return (
        <><div className="flex  w-full items-start justify-center bg-gray-50 font-sans">
            <HomeServices />
        </div>
            <div className="flex  w-full items-start justify-center bg-gray-50 font-sans">
                <AcServices />
            </div></>
    );
}
