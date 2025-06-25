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
                    <img src="/images/prestatiedruk.jpeg" className="max-w-sm rounded-lg shadow-2xl animate-fade-in"/>
                    <div className={'bg-[#F2FBF8] p-4 sm:p-16 rounded-3xl'}>
                        <h1 className="text-5xl font-bold flex items-center gap-2">
                            {/* Example icon */}
                            <span role="img" aria-label="support">🤝</span> Peer Support
                        </h1>
                        <p className="py-6 text-lg">
                            Heb je behoefte aan een luisterend oor of wil je gewoon even je verhaal kwijt? 
                            Bij ons kun je gratis terecht voor vertrouwelijke gesprekken met opgeleide peer guides – studenten die weten wat jij doormaakt. 
                            Samen kijken we naar wat jij nodig hebt om verder te komen, of het nu gaat om studie, stress of persoonlijke groei. 
                            Wil je zelf anderen ondersteunen? Sluit je aan bij ons team van peers en maak het verschil voor medestudenten!
                        </p>
                    </div>
                </div>
            </div>

            <div className="hero lg:mt-32">
                <div className="hero-content min-w-[unset] mt-8 lg:px-16 flex-col lg:flex-row-reverse lg:gap-16">
                    <img src="/images/2-students-studying.jpeg" className="md:max-w-lg rounded-lg shadow-2xl animate-fade-in"/>
                    <div className={'bg-[#F2FBF8] p-4 sm:p-16 rounded-3xl'}>
                        <h1 className="text-5xl font-bold flex items-center gap-2">
                            <span role="img" aria-label="study">📚</span> Studieruimtes
                        </h1>
                        <p className="py-6 text-lg">
                            Zoek je een fijne plek om te studeren, samen te werken of gewoon even te ontspannen? 
                            Onze studieruimtes zijn speciaal ingericht voor studenten: rustig, gezellig en altijd voorzien van gratis thee, koffie en koekjes. 
                            Kom langs, ontmoet andere studenten en laat je inspireren door een omgeving waar welzijn en productiviteit centraal staan. 
                            Iedereen is welkom, of je nu alleen wilt werken of samen wilt brainstormen!
                        </p>
                    </div>
                </div>
            </div>

            <TransitionWithBorder colorFrom={'bg-white'} colorTo={'bg-[#58B095]'} />

            <div className="hero lg:py-24 bg-gradient-to-br from-[#58B095] to-[#3a7c5a]">
                <div className="hero-content min-w-[unset] mt-8 lg:px-16 flex-col lg:flex-row lg:gap-16">
                    <img src="/images/business-seminar-group.jpeg" className="max-w-sm rounded-lg shadow-2xl animate-fade-in"/>
                    <div className="p-4 sm:p-16 rounded-3xl text-white">
                        <h1 className="text-5xl font-bold flex items-center gap-2">
                            <span role="img" aria-label="brainstorm">💡</span> Brainstormen
                        </h1>
                        <p className="py-6 text-lg">
                            Heb jij ideeën over hoe studentenwelzijn beter kan? 
                            Bij ons krijg je de ruimte om samen met andere studenten te brainstormen over lokale en landelijke initiatieven. 
                            Werk mee aan projecten rondom preventiezorg, eigenaarschap, participatie en zingeving. 
                            Jouw stem telt – samen maken we het verschil voor de studentengemeenschap!
                        </p>
                    </div>
                </div>
            </div>

            <div className="hero lg:mt-32">
                <div className="hero-content min-w-[unset] mt-8 lg:px-16 flex-col lg:flex-row-reverse lg:gap-16">
                    <img src="/images/Hard-laugh-group.jpeg" className="md:max-w-lg rounded-lg shadow-2xl animate-fade-in"/>
                    <div className={'bg-[#F2FBF8] p-4 sm:p-16 rounded-3xl'}>
                        <h1 className="text-5xl font-bold flex items-center gap-2">
                            <span role="img" aria-label="initiative">🚀</span> Nieuwe Initiatieven
                        </h1>
                        <p className="py-6 text-lg">
                            Heb je een goed idee of wil je samen met anderen iets nieuws opzetten? 
                            Bij ons is iedereen welkom om initiatieven te starten, mee te denken of samen te werken aan projecten die bijdragen aan studentenwelzijn. 
                            Of je nu een klein plan hebt of groots wilt uitpakken – wij bieden de ondersteuning en het netwerk om jouw idee tot leven te brengen!
                        </p>
                    </div>
                </div>
            </div>

            {/* Call-to-action banner suggestion */}
            <div className="w-full bg-[#58B095] py-12 flex flex-col max-w-6xl mx-auto items-center my-16 rounded-3xl shadow-lg">
                <h2 className="text-3xl font-bold text-white mb-4">Klaar om mee te doen?</h2>
                <p className="text-white mb-6 text-lg">Sluit je aan bij onze community en maak samen het verschil voor studentenwelzijn!</p>
                <a href="/contact" className="btn btn-accent btn-xl rounded-full">Neem contact op</a>
            </div>

            <TransitionWithBorder colorFrom={'bg-white'} colorTo={'bg-gray-900'}/>
        </div>
    );
}
