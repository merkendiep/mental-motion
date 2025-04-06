'use client'

import React from 'react';
import TransitionWithBorder from '@/src/components/TransitionWithBorder';

const partners = [
    {
        name: 'Gemeente Utrecht',
        logo: '/images/partners/GemeenteUtrecht.png',
        description: '[Text over inzet van partner]',
        website: '',
    },
    {
        name: 'Hogeschool Utrecht',
        logo: '/images/partners/HU.jpg',
        description: '[Text over inzet van partner]',
        website: '',
    },
    {
        name: 'MBO Utrecht',
        logo: '/images/partners/MBO-Utrecht.jpg',
        description: '[Text over inzet van partner]',
        website: '',
    },
    {
        name: 'Nimento Utrecht',
        logo: '/images/partners/NimentoUtrecht.png',
        description: '[Text over inzet van partner]',
        website: '',
    },
    {
        name: 'Grafisch Lyceum Utrecht',
        logo: '/images/partners/GLU.png',
        description: '[Text over inzet van partner]',
        website: '',
    },
    {
        name: 'Dock.nl',
        logo: '/images/partners/dockNL.jpg',
        description: '[Text over inzet van partner]',
        website: '',
    },
    {
        name: 'Frisse Gedachtes',
        logo: '/images/partners/Frisse-gedachtes.png',
        description: '[Text over inzet van partner]',
        website: '',
    },
    {
        name: 'Geluks BV',
        logo: '/images/partners/geluks-bv.jpg',
        description: '[Text over inzet van partner]',
        website: '',
    },
    {
        name: 'HKU',
        logo: '/images/partners/HKU.jpg',
        description: '[Text over inzet van partner]',
        website: '',
    },
    {
        name: 'IDIUS',
        logo: '/images/partners/IDIUS.png',
        description: '[Text over inzet van partner]',
        website: '',
    },
    {
        name: 'JOU jongerenwerk Utrech',
        logo: '/images/partners/JouJongerenWerk.png',
        description: '[Text over inzet van partner]',
        website: '',
    },
    {
        name: 'Power Peers',
        logo: '/images/partners/PowerPeers.png',
        description: '[Text over inzet van partner]',
        website: '',
    },
];

const PartnersPage = () => {
    return (
        <div className="flex flex-col bg-white pt-24 lg:pt-44">
            <div className={'max-w-7xl mb-16 mx-auto px-2 md:px-0'}>
                <div className="hero-content flex-col mx-auto gap-8 lg:flex-row">
                    <div className="text-center lg:text-center">
                        <h1 className="text-3xl font-black text-gray-700 mb-8 uppercase md:text-6xl">
                            <span>Onze Partners</span>
                        </h1>

                        <p className={'text-xl font-black text-gray-700 mb-8 md:text-2xl'}>
                            We zijn heel blij met onze partners die ons steunen en met ons Utrecht nog mooier maken.
                            Wil je je ook aansluiten bij onze beweging? We horen graag van je!
                        </p>
                    </div>
                </div>

                <div className={'flex justify-center flex-row flex-wrap gap-8'}>
                    {
                        partners.map((partner, index) => {
                            return <div key={index} className="rounded-lg flex justify-center items-center bg-white w-88 py-4 shadow-sm lg:w-96">
                                <figure>
                                    <img
                                        src={partner.logo}
                                        alt={partner.name + ' logo'}/>
                                </figure>
                            </div>
                        })
                    }
                </div>
            </div>

            <TransitionWithBorder colorFrom={'bg-white'} colorTo={'bg-gray-800'}/>
        </div>
    );
};

export default PartnersPage;