'use client'

import React from 'react';
import NavBar from '@/src/components/NavBar';
import TransitionWithBorder from '@/src/components/TransitionWithBorder';
import Footer from '@/src/components/Footer';

const JoinUs = () => {
    return (
        <div className="flex flex-col min-h-screen bg-white md:pt-36 lg:pt-44">
            <NavBar/>

            <div className="hero-content flex-col mx-auto gap-8 lg:flex-row">
                <img
                    className="mask mask-square rounded-xl max-w-xs md:max-w-2xl"
                    src="/images/training-presentation.jpeg"
                />

                <div className="text-center lg:text-start">
                    <h1 className="text-3xl font-black text-gray-700 uppercase mb-8 md:text-7xl">
                        <span>Sluit je bij ons aan!</span>
                    </h1>

                    <p className={'mb-6'}>
                        We willen de eigen regie van en studenten vergroten en hebben jouw daarbij nodig!
                        MentalMotion is een plek waar we beweging generen.
                        Wordt peersupporter of bedenk samen met medestudenten wat er beter kan in Utrecht en maak samen
                        het verschil door beleidsverandering in Utrecht te bewerkstelligen.
                        Zet samen met medestudenten een initiatief op en kom in actie.
                        Mag gaan over elk thema waarvan jij denkt dat het te maken heeft met studentenwelzijn.
                    </p>
                </div>
            </div>

            <div className="hero-content flex-col mx-auto lg:gap-16 lg:flex-row-reverse">
                <img
                    className="mask mask-heart max-w-xs md:max-w-lg"
                    src="/images/peer-support-example-conversation.jpeg"
                />

                <div className="text-center lg:text-start">
                    <h1 className="text-3xl font-black text-gray-700 uppercase md:text-7xl">
                        <span>Wordt peersupporter!</span>
                    </h1>

                    <p className="py-6 lg:max-w-lg">
                        Als peersupporter ben je op onze locatie aanwezig en sta je klaar voor laagdrempelige
                        gesprekken met medestudenten.
                        Je ondersteunt hen vanuit je eigen ervaringen als student en draagt bij aan hun welzijn.
                    </p>

                    <p className={'mb-6'}>
                        Wij bieden trainingen en cursussen aan,
                        zodat je precies weet hoe je een goed gesprek voert en
                        waar je studenten naartoe kunt verwijzen. Je krijgt alle tools om zelfverzekerd peersupport
                        te bieden! Je krijgt begeleiding en een vrijwilligersvergoeding!
                    </p>

                    <p className={'mb-6'}>Help mee aan het welzijn van de Utrechtse student!</p>
                </div>
            </div>

            <div className="hero-content flex-col mx-auto lg:mb-16 lg:gap-16 lg:flex-row">
                <img
                    className="mask mask-square rounded-xl max-w-xs md:max-w-2xl"
                    src="/images/mental-motion-outside-logo.jpeg"/>

                <div className="text-center lg:text-start">
                    <h1 className="text-3xl font-black text-gray-700 uppercase md:text-7xl">
                        <span>Kom langs!</span>
                    </h1>

                    <p className="py-6 lg:max-w-lg">
                        Wil jij je preventief inzetten voor het welzijn van studente?
                        Kom langs, denk mee, zet zelf samen met ons een nieuw initiatief op.
                    </p>

                    <p>Wij horen graag wat jij denkt en hoe jij denkt dat de Utrechtse student het beste geholpen is.</p>

                    <p>
                        Wij helpen jou bij jouw idee. Wil je de gemeente spreken, de burgemeester of een wethouder.
                        Heb jij een wetsvoorstel of iets over studentenwelzijn dat je graag zou willen dat
                        Gemeente Utrecht moet veranderen?
                    </p>

                    <p>
                        Laat je stem horen, kom bij ons langs en dan gaan we
                        samen zorgen dat hier verandering in komt.
                    </p>

                    <p className={'mb-6'}>
                        Wij bieden trainingen en cursussen aan,
                        zodat je precies weet hoe je een goed gesprek voert en
                        waar je studenten naartoe kunt verwijzen. Je krijgt alle tools om zelfverzekerd peersupport
                        te bieden! Je krijgt begeleiding en een vrijwilligersvergoeding!
                    </p>

                    <p className={'mb-6'}>Help mee aan het welzijn van de Utrechtse student!</p>
                </div>
            </div>

            <TransitionWithBorder colorFrom={'bg-white'} colorTo={'bg-gray-800'}/>

            <Footer/>
        </div>
    );
};

export default JoinUs;