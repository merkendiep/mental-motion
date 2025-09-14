"use client";

import Hero from "@/src/components/Hero";
import TransitionWithBorder from "@/src/components/TransitionWithBorder";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function Home() {
  return (
    <div className="flex flex-col bg-white">
      <a
        href={"/contact"}
        className={
          "fixed btn btn-accent rounded-sm btn-xl right-28 bottom-16 z-50"
        }
      >
        Plan een afspraak
      </a>

      <div
        className={
          "bg-[url(/images/hero-home.png)] bg-no-repeat bg-cover pt-24 pb-12 rounded-bl-[5rem]"
        }
      >
        <Hero />
      </div>

      <br />

      <div id="peer-support-section" className="hero lg:mt-32">
        <div className="hero-content min-w-[unset] mt-8 lg:px-16 flex-col lg:gap-16 lg:flex-row items-center">
          <div className="flex-1 max-w-md">
            <img
              src="/images/prestatiedruk.jpeg"
              className="w-full h-auto rounded-lg shadow-2xl animate-fade-in object-cover"
              alt="Student peer support"
            />
          </div>
          <div className="flex-1 bg-[#F2FBF8] p-6 sm:p-12 lg:p-16 rounded-3xl max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-bold flex items-center gap-2 mb-6">
              <span role="img" aria-label="support">
                🤝
              </span>
              Peer Support
            </h1>
            <p className="text-lg leading-relaxed">
              Heb je behoefte aan een luisterend oor of wil je gewoon even je
              verhaal kwijt? Bij ons kun je gratis terecht voor vertrouwelijke
              gesprekken met opgeleide peer guides – studenten die weten wat jij
              doormaakt. Samen kijken we naar wat jij nodig hebt om verder te
              komen, of het nu gaat om studie, stress of persoonlijke groei. Wil
              je zelf anderen ondersteunen? Sluit je aan bij ons team van peers
              en maak het verschil voor medestudenten!
            </p>
          </div>
        </div>
      </div>

      <div id="studieruimtes-section" className="hero lg:mt-32">
        <div className="hero-content min-w-[unset] mt-8 lg:px-16 flex-col lg:flex-row-reverse lg:gap-16 items-center">
          <div className="flex-1 max-w-md">
            <img
              src="/images/2-students-studying.jpeg"
              className="w-full h-auto rounded-lg shadow-2xl animate-fade-in object-cover"
              alt="Studenten aan het studeren"
            />
          </div>
          <div className="flex-1 bg-[#F2FBF8] p-6 sm:p-12 lg:p-16 rounded-3xl max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-bold flex items-center gap-2 mb-6">
              <span role="img" aria-label="study">
                📚
              </span>
              Studieruimtes
            </h1>
            <p className="text-lg leading-relaxed">
              Zoek je een fijne plek om te studeren, samen te werken of gewoon
              even te ontspannen? Onze studieruimtes zijn speciaal ingericht
              voor studenten: rustig, gezellig en altijd voorzien van gratis
              thee, koffie en koekjes. Kom langs, ontmoet andere studenten en
              laat je inspireren door een omgeving waar welzijn en
              productiviteit centraal staan. Iedereen is welkom, of je nu alleen
              wilt werken of samen wilt brainstormen!
            </p>
          </div>
        </div>
      </div>

      <TransitionWithBorder colorFrom={"bg-white"} colorTo={"bg-[#58B095]"} />

      <div
        id="brainstormen-section"
        className="hero lg:py-24 bg-gradient-to-br from-[#58B095] to-[#3a7c5a]"
      >
        <div className="hero-content min-w-[unset] mt-8 lg:px-16 flex-col lg:flex-row lg:gap-16 items-center">
          <div className="flex-1 max-w-md">
            <img
              src="/images/business-seminar-group.jpeg"
              className="w-full h-auto rounded-lg shadow-2xl animate-fade-in object-cover"
              alt="Brainstorm sessie"
            />
          </div>
          <div className="flex-1 p-6 sm:p-12 lg:p-16 rounded-3xl text-white max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-bold flex items-center gap-2 mb-6">
              <span role="img" aria-label="brainstorm">
                💡
              </span>
              Brainstormen
            </h1>
            <p className="text-lg leading-relaxed">
              Heb jij ideeën over hoe studentenwelzijn beter kan? Bij ons krijg
              je de ruimte om samen met andere studenten te brainstormen over
              lokale en landelijke initiatieven. Werk mee aan projecten rondom
              preventiezorg, eigenaarschap, participatie en zingeving. Jouw stem
              telt – samen maken we het verschil voor de studentengemeenschap!
            </p>
          </div>
        </div>
      </div>

      <div id="nieuwe-initiatieven-section" className="hero lg:mt-32">
        <div className="hero-content min-w-[unset] mt-8 lg:px-16 flex-col lg:flex-row-reverse lg:gap-16 items-center">
          <div className="flex-1 max-w-md">
            <img
              src="/images/Hard-laugh-group.jpeg"
              className="w-full h-auto rounded-lg shadow-2xl animate-fade-in object-cover"
              alt="Groep studenten samen"
            />
          </div>
          <div className="flex-1 bg-[#F2FBF8] p-6 sm:p-12 lg:p-16 rounded-3xl max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-bold flex items-center gap-2 mb-6">
              <span role="img" aria-label="initiative">
                🚀
              </span>
              Nieuwe Initiatieven
            </h1>
            <p className="text-lg leading-relaxed">
              Heb je een goed idee of wil je samen met anderen iets nieuws
              opzetten? Bij ons is iedereen welkom om initiatieven te starten,
              mee te denken of samen te werken aan projecten die bijdragen aan
              studentenwelzijn. Of je nu een klein plan hebt of groots wilt
              uitpakken – wij bieden de ondersteuning en het netwerk om jouw
              idee tot leven te brengen!
            </p>
          </div>
        </div>
      </div>

      {/* Call-to-action section */}
      <div className="w-full py-16 lg:py-24">
        <div className="bg-[#58B095] py-12 lg:py-16 flex flex-col max-w-6xl mx-auto items-center rounded-3xl shadow-lg">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 text-center">
            Klaar voor een Mental Mindshift?
          </h2>
          <p className="text-white mb-8 text-lg text-center max-w-2xl px-4">
            Sluit je aan bij onze community en maak samen het verschil voor
            studentenwelzijn!
          </p>
          <a
            href="/contact"
            className="btn btn-accent btn-xl rounded-full font-semibold"
          >
            Neem contact op
          </a>
        </div>
      </div>

      <TransitionWithBorder colorFrom={"bg-white"} colorTo={"bg-gray-900"} />
    </div>
  );
}
