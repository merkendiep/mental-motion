'use client'

import Hero from "@/src/components/Hero";
import TransitionWithBorder from "@/src/components/TransitionWithBorder";
import {ArrowRightIcon} from "@heroicons/react/24/solid";

export default function Home() {
    return (
        <div className="flex flex-col bg-white">
            <a href={'/contact'} className={'fixed btn btn-accent rounded-sm btn-xl right-28 bottom-16 z-50'}>Plan een afspraak</a>

            <div className={'bg-[url(/images/hero-home.png)] bg-no-repeat bg-cover pt-24 pb-12 rounded-bl-[5rem]'}>
                <Hero/>
            </div>

            <br/>

            <div className="hero lg:mt-32">
                <div className="hero-content min-w-[unset] mt-8 lg:px-16 flex-col lg:gap-16 lg:flex-row">
                    <img src="/images/prestatiedruk.jpeg" className="max-w-sm rounded-lg shadow-2xl"/>

                    <div className={'bg-[#F2FBF8] p-4 sm:p-16 rounded-3xl'}>
                        <h1 className="text-5xl font-bold">Peer Support</h1>

                        <p className="py-6">
                            Je kan bij ons terecht voor gratis gesprekken met opgeleide peer guides.
                            Ontvang ondersteuning en kom verder met onze opgeleide peers.
                            Of kom bij ons werken als Peer!
                        </p>

                        <button className="btn btn-primary mt-6">
                            Lees verder
                            <ArrowRightIcon className={'size-4'}/>
                        </button>
                    </div>
                </div>
            </div>

            <div className="hero lg:mt-32">
                <div className="hero-content min-w-[unset] mt-8 lg:px-16 flex-col lg:flex-row-reverse lg:gap-16">
                    <img src="/images/2-students-studying.jpeg" className="md:max-w-lg rounded-lg shadow-2xl"/>

                    <div className={'bg-[#F2FBF8] p-4 sm:p-16 rounded-3xl'}>
                        <h1 className="text-5xl font-bold">Studieruimtes</h1>

                        <p className="py-6">
                            Maak gebruik van onze studie en vergaderruimtes.
                            Geniet van thee, koffie en koekjes terwijl je bij ons komt studeren,
                            ontmoeten vergaderen of chillen op de bank.
                            Ontmoet andere studenten en deel samen je ideeën over studentenwelzijn.
                        </p>

                        <button className="btn btn-primary mt-6">
                            Lees verder
                            <ArrowRightIcon className={'size-4'}/>
                        </button>
                    </div>
                </div>
            </div>

            <TransitionWithBorder colorFrom={'bg-white'} colorTo={'bg-[#58B095]'} />

            <div className="hero lg:pt-24 bg-[#58B095]">
                <div className="hero-content min-w-[unset] mt-8 lg:px-16 flex-col lg:flex-row lg:gap-16">
                    <img src="/images/business-seminar-group.jpeg" className="max-w-sm rounded-lg shadow-2xl"/>
                    <div className="p-4 sm:p-16 rounded-3xl text-white">
                        <h1 className="text-5xl font-bold">Brainstormen</h1>
                        <p className="py-6">
                            Wat denk jij dat er moet gebeuren? Bij ons is er de ruimte om samen met andere
                            studenten te onderzoeken wat er moet gebeuren, zowel lokaal als landelijk aan
                            studentenwelzijn. Gericht op preventiezorg, eigenaarschap, participatie en zingeving.
                        </p>
                        <button className="btn btn-accent mt-6">
                            Lees verder
                            <ArrowRightIcon className={'size-4'}/>
                        </button>
                    </div>
                </div>
            </div>

            <TransitionWithBorder colorFrom={'bg-[#58B095]'} colorTo={'bg-white'}/>

            <div className="hero lg:mt-32">
                <div className="hero-content min-w-[unset] mt-8 lg:px-16 flex-col lg:flex-row-reverse lg:gap-16">
                    <img src="/images/Hard-laugh-group.jpeg" className="md:max-w-lg rounded-lg shadow-2xl"/>

                    <div className={'bg-[#F2FBF8] p-4 sm:p-16 rounded-3xl'}>
                        <h1 className="text-5xl font-bold">Nieuwe Initiatieven</h1>

                        <p className="py-6">
                            We werken samen aan nieuwe initiatieven en iedereen is welkom om een idee op te zetten,
                            mee te denken en samen iets nieuws op te zetten.
                        </p>

                        <button className="btn btn-primary mt-6">
                            Lees verder
                            <ArrowRightIcon className={'size-4'}/>
                        </button>
                    </div>
                </div>
            </div>

            <TransitionWithBorder colorFrom={'bg-white'} colorTo={'bg-gray-900'}/>
        </div>
    );
}
