'use client'

import React from 'react';
import TransitionWithBorder from '@/src/components/TransitionWithBorder.jsx';

const frequentlyAskedQuestions = [
    {
        question: 'Student & zorgwijzer',
        answer: 'Op de website van student en zorgwijzer kun je zien bij wie je allemaal terecht kunt in Utrecht met al je zorgvragen. Van financiële vragen, mentale klachten, fysieke klachten, alle zorgverleners die er zijn, voeding en zingeving.'
    },
    {
        question: 'Huisarts als eerste aanspreekpunt',
        answer: 'De huisarts is het eerste aanspreekpunt in de zorg, waarbij je terecht kunt met al je vragen op medisch, psychisch en sociaal vlak. De huisarts kent de weg naar alle zorg- en hulpverleners in de buurt en kan je indien nodig goed doorverwijzen. Het is daarom belangrijk om een huisarts te hebben in de buurt waar je woont en/of studeert. Klik hier voor meer informatie'
    },
    {
        question: 'Begeleiding vanuit onderwijsinstellingen',
        answer: 'Loop je tegen een probleem aan tijdens jouw studie of zoek je persoonlijk advies binnen jouw onderwijsinstelling? Op de onderwijsinstellingen worden allerlei vormen van begeleiding aangeboden. Het is als student belangrijk om te weten bij wie je tijdens je studie terecht kunt met al je vragen.  Klik hier voor meer informatie, of bezoek: Studentpsycholoog UU – Studentpsycholoog HU'
    },
    {
        question: 'Psychologische zorg',
        answer: 'Wanneer je gaat studeren, maak je veel veranderingen mee. Je gaat voor het eerst op jezelf wonen, wilt de vakken voor je studie halen en krijgt er zo nieuwe verantwoordelijkheden bij. Deze veranderingen en nieuwe indrukken kunnen gepaard gaan met gevoelens van stress en psychische klachten. Dit kan een grote invloed hebben op jouw dagelijks leven. Het is dan belangrijk om te weten waar je terecht kunt met deze klachten. Klik hier voor meer informatie'
    },
    {
        question: '113 Zelfmoordpreventie',
        answer: '113 Zelfmoordpreventie is de landelijke hulplijn waar mensen met zelfmoordgedachten naartoe kunnen bellen en chatten. Je kunt hier terecht als je gedachten hebt aan zelfmoord en hier anoniem met iemand over wilt praten. Praten kan opluchten en ruimte creëren om naar oplossingen te zoeken. Ook mensen die zich zorgen maken om iemand anders kunnen hier anoniem terecht om de situatie te bespreken en voor advies. De hulplijn is 24/7 anoniem bereikbaar via www.113.nl en 0800-0113. Kijk op de website van 113 Zelfmoordpreventie voor meer informatie.'
    },
    {
        question: 'Sociale ondersteuning',
        answer: 'Iedereen heeft wel eens een periode waarin niet alles even soepel verloopt. Loop jij vast door bepaalde problemen of maak je je zorgen over een studiegenoot? Bij het buurtteam in je eigen wijk kun je terecht voor allerlei vragen over bijvoorbeeld je financiën, (faal)angst, verslaving of huisvesting. Klik hier voor meer informatie.'
    },
    {
        question: 'Financiële ondersteuning',
        answer: 'Als je gaat studeren verandert er veel op financieel gebied. Wat kost een studie? Hoeveel lenen is verstandig? Ga je op kamers of blijf je thuis wonen? Welke kosten komen daarbij kijken? Neem je wel of geen bijbaan? Als student krijg je met verschillende nieuwe geldzaken te maken. Het is belangrijk om een overzicht te hebben van jouw inkomsten en uitgaven. Er zijn verschillende instanties die jou bij jouw geldzaken kunnen ondersteunen. Klik hier voor meer informatie.'
    },
    {
        question: 'Studeren met een functiebeperking of chronische ziekte',
        answer: 'Studeren met een functiebeperking of chronische ziekte is vaak lastiger en kost meer tijd en energie dan studeren zonder die beperking, maar het hoeft geen belemmering te vormen voor het halen van een diploma. Denk hierbij aan studeren met visuele, auditieve of motorische beperkingen, dyslexie, AD(H)D of depressiviteit. Voor de belangen van deze studenten maken verschillende instanties zich hard en voor deze studenten zijn er verschillende voorzieningen beschikbaar. Het is belangrijk om tijdig de voorzieningen aan te vragen bij de start van jouw studie. Klik hier voor meer informatie.'
    },
    {
        question: 'Middelen gebruik en verslaving',
        answer: 'Je studententijd is een periode vol nieuwe ervaringen: Een nieuwe stad, opleiding, huis en verantwoordelijkheden. Voor veel studenten komen daar ook borrels, verenigingsavonden en feesten bij. Een nacht doorhalen om verder te komen in die game, met kater naar college of een ziekmelding vanwege een dinsdagdip is niet meteen problematisch. Maar wat als het vaker gebeurt dan je eigenlijk zou willen en het ten koste gaat van je studieresultaten? Of als je hierdoor voor een langere periode somber, angstig of gestresst bent? Mogelijk heb je je middelengebruik (of gamen of gokken) niet helemaal meer onder controle. Wat kun je dan doen? Klik hier voor meer informatie.'
    },
    {
        question: 'De checkers',
        answer: 'Maak je je zorgen om een ander en wil je die graag helpen. Kan je ook kijken op de pagina van De-checkers op deze pagina leer je in 3 korte modules hoe je anderen kan helpen, welke vragen je kan stellen en ook hoe je kan signaleren of het goed met iemand gaat.'
    },
]

const AboutUsPage = () => {
    return (
        <div className="flex flex-col bg-white">
            <section className={'pt-32 max-w-6xl mx-auto px-2 md:px-0'}>
                <div className="hero-content flex-col lg:flex-row-reverse mx-auto">
                    <div className="text-center lg:text-center">
                        <h1 className="text-3xl font-black text-gray-700 mb-8 uppercase md:text-6xl">
                            <span>Hulp vraag</span>
                        </h1>

                        <p className={'mb-8'}>
                            Het is belangrijk om je gezondheidszorg goed op orde te hebben.
                            Hier kunnen zorgverleners zowel binnen als buiten de onderwijsinstellingen aan bijdragen.
                            Maar waar kan je in Utrecht terecht met je zorgvraag? Lees hieronder meer over de
                            zorgverlening
                            in Utrecht.
                            Let op: voor problemen die te maken hebben met je studie of daar invloed op hebben
                            (studiefinanciering, studievertraging, persoonlijke problemen of een chronische ziekte), ga
                            je
                            in principe eerst langs bij de studieadviseur van je opleiding.
                        </p>
                    </div>
                </div>

                {/* Accordion FAQ */}
                <div className={'mx-auto'}>
                    {
                        frequentlyAskedQuestions.map((item, index) => (
                            <div key={index} className="collapse bg-base-100 border-base-300 border mb-2">
                                <input type="checkbox"/>
                                <div className="collapse-title font-semibold">{item.question}</div>
                                <div className="collapse-content text-sm">{item.answer}</div>
                            </div>
                        ))
                    }
                </div>
            </section>

            <TransitionWithBorder colorFrom={'bg-white'} colorTo={'bg-gray-800'}/>
        </div>
    );
};

export default AboutUsPage;