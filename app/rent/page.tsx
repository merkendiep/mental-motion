'use client'

import React from 'react';
import Contact from '@/src/components/Contact';
import TransitionWithBorder from "@/src/components/TransitionWithBorder";

const RentLocationPage = () => {
    return (
        <div className="flex flex-col bg-white pt-24 lg:pt-44">
            <div className="hero-content flex-col mx-auto lg:min-h-[650px] lg:gap-16 lg:flex-row-reverse">
                <img
                    src="/images/girl-entering-door-2.jpeg"
                    alt=""
                    className="max-w-xs rounded-b-box rounded-t-[14rem] shadow-2xl outline outline-base-content/5 md:max-w-md"
                />

                <div className="text-center mt-8 md:mt-0 lg:text-start">
                    <h1 className="text-3xl font-black text-gray-700 uppercase md:text-7xl">
                        <span>Huur &#39;De Peer&#39;</span>
                    </h1>

                    <p className="py-6 lg:max-w-lg">
                        Wil jij met je werkgroep of je commissie ergens zitten en vergaderen/studeren. Dat kan!
                    </p>

                    <p className={'py-2'}>
                        Bij ons op locatie hebben we meerdere plekken waar je kan werken en vergaderen.
                        Dit is gratis voor studenten en commissies.
                        Ook kun je bij ons komen om te studeren of een evenement te organiseren voor je vereniging.
                        Tegen een kleine vergoeding kan jouw vereniging gebruik maken van onze ruimte.
                        Interesse? Kom langs of neem contact met ons op!
                    </p>

                    <a className={'btn btn-primary mt-4'} href={'#contact'}>Neem contact op</a>
                </div>
            </div>

            <div className={'mt-16'}>
                <Contact/>
            </div>

            <TransitionWithBorder colorFrom={'bg-white'} colorTo={'bg-gray-900'}/>
        </div>
    );
};

export default RentLocationPage;