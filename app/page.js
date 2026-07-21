"use client"; // Ensure this is a client component
import React from 'react';
import Hero from '@/Components/Hero';
import Top from '@/Components/Top';
import HomeService from '@/Components/HomeService';
import SafetyFeatures from '@/Components/Team';
import { serviceCategories } from '@/public/Services';
import HowItWorks from '@/Components/HowWork';
import Support from '@/Components/Support';

function App() {
    console.log(serviceCategories())
    return (
        <section className='mx-4 lg:mx-16 '>


            <Top></Top>
            {/*<HomeService></HomeService>*/}
            <SafetyFeatures></SafetyFeatures>
            <HowItWorks></HowItWorks>
            <Support></Support>
        </section>

    )
}

export default App;
