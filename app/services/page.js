'use client';
import { ServiceCategory } from '@/Components/Hero';
import { serviceCategories } from '@/public/Services';
import React, { useEffect, useState } from 'react'

const ServicePage = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const categories = await serviceCategories();
            setData(categories);
        };
        fetchData();
    }, []);
    console.log(data)


    return (
        <div className="space-y-12 mx-20 my-10">
            {
                data?.map(category => (
                    <ServiceCategory
                        key={category.id}
                        title={category.title}
                        featured={category.featured}
                        all={category.all}
                    />
                ))}
        </div>
    )
}

export default ServicePage
