'use client'

import React from 'react';
import Contact from '@/src/components/Contact';
import TransitionWithBorder from "@/src/components/TransitionWithBorder";
import FloorPlan from "@/src/components/FloorPlan";

const RentLocationPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 pt-20 lg:pt-32">
            {/* Hero Section */}
            <section className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 px-6 md:px-16 mx-auto max-w-7xl w-full">
                {/* Text Content */}
                <div className="flex-1 text-center lg:text-left">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4 tracking-tight">
                        <span className="text-primary">De Peer</span>
                        <p className='text-2xl'>De ideale plek voor studenten</p>
                    </h1>
                    <p className="text-lg md:text-2xl text-gray-600 mb-6">
                        Zoek je een inspirerende locatie om te vergaderen, studeren of een evenement te organiseren met je werkgroep, commissie of vereniging? <span className="font-semibold text-primary">De Peer</span> biedt alles wat je nodig hebt!
                    </p>
                    <ul className="text-gray-700 text-base md:text-lg mb-8 space-y-2 text-left lg:text-left mx-auto lg:mx-0 max-w-xl list-disc list-inside">
                        <li>Gratis werk- en vergaderruimtes voor studenten en commissies</li>
                        <li>Perfect voor studeren, brainstormen of samenkomen</li>
                        <li>Evenementen organiseren voor je vereniging mogelijk</li>
                        <li>Betaalbare tarieven voor verenigingen</li>
                        <li>Centraal gelegen en goed bereikbaar</li>
                    </ul>
                    <a className="btn btn-primary px-8 py-3 text-lg rounded-full shadow-lg transition hover:scale-105" href="#contact">
                        Neem contact op
                    </a>
                </div>
                {/* Image */}
                <div className="flex-1 flex justify-center">
                    <img
                        src="/images/girl-entering-door-2.jpeg"
                        alt=""
                        className="max-w-xs rounded-b-box rounded-t-[14rem] shadow-2xl outline outline-base-content/5 md:max-w-md"
                    />
                </div>
            </section>

            {/* FloorPlan Section */}
            <section className="hidden xl:flex justify-center mt-20">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Plattegrond van De Peer</h2>
                    <FloorPlan />
                </div>
            </section>

            {/* Contact Section */}
            <div className='mt-20'>
                <Contact/>
            </div>

            <TransitionWithBorder colorFrom="bg-gray-100" colorTo="bg-gray-800" />
        </div>
    );
};

export default RentLocationPage;