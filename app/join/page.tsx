"use client";

import React from "react";
import TransitionWithBorder from "@/src/components/TransitionWithBorder";

const JoinUs = () => {
  return (
    <div className="flex flex-col bg-white pt-24 lg:pt-44">
      <div className="hero-content flex-col mx-auto gap-8 lg:flex-row">
        <img
          className="mask mask-square rounded-xl max-w-xs md:max-w-2xl"
          src="/images/training-presentation.jpeg"
        />

        <div className="text-center lg:text-start">
          <h1 className="text-3xl font-black text-gray-700 uppercase mb-8 md:text-7xl">
            <span>Sluit je bij ons aan!</span>
          </h1>

          <p className={"mb-6"}>
            MentalMotion is een plek waar we beweging generen, maar dat kunnen
            we niet alleen. We willen de eigen regie van studenten en
            jongvolwassenen vergroten. Ben jij student, jongvolwassene of jong
            van geest, en wil jij je inzetten voor de mental mindshift die nodig
            is? Wordt peer supporter, denk mee over wat er beter kan of
            organiseer zelf een activiteit bij ons. Alles mag, zolang jij denkt
            dat het te maken heeft met studentenwelzijn. Samen maken we het
            verschil in heel Utrecht.
          </p>
        </div>
      </div>

      <TransitionWithBorder colorFrom={"bg-white"} colorTo={"bg-[#58B095]"} />

      <div className={" max-w-full w-full bg-[#58B095]"}>
        <div className="hero-content flex-col mx-auto text-white lg:gap-16 lg:flex-row-reverse">
          <img
            className="mask mask-heart max-w-xs md:max-w-lg"
            src="/images/peer-support-example-conversation.jpeg"
          />

          <div className="text-center lg:text-start">
            <h1 className="text-3xl font-black text-white uppercase md:text-7xl">
              <span>Wordt peersupporter!</span>
            </h1>

            <p className="py-6 lg:max-w-lg">
              Als peer supporter ben je op onze locatie aanwezig en sta je klaar
              voor laagdrempelige gesprekken met medestudenten. Je ondersteunt
              hen vanuit je eigen ervaringen als student of jongvolwassene en
              draagt bij aan hun welzijn. Wij bieden trainingen en cursussen
              aan, zodat je precies weet hoe je een goed gesprek voert en waar
              je studenten naartoe kunt verwijzen.
            </p>

            <p className={"mb-6"}>
              Je krijgt alle tools om zelfverzekerd peer support te bieden! Ook
              is er een keer per maand een vrijwilligersdag, en hebben we een
              achterwacht van professionals waar je terecht kan als je extra
              ondersteuning nodig hebt. Ook is er een vrijwilligersvergoeding,
              en vooral heel veel gezelligheid!
            </p>
          </div>
        </div>
      </div>

      <TransitionWithBorder colorFrom={"bg-[#58B095]"} colorTo={"bg-white"} />

      <div className="hero-content flex-col mx-auto lg:mt-16 lg:gap-16 lg:flex-row">
        <img
          className="mask mask-square rounded-xl max-w-xs md:max-w-2xl"
          src="/images/mental-motion-outside-logo.jpeg"
        />

        <div className="text-center lg:text-start">
          <h1 className="text-3xl font-black text-gray-700 uppercase md:text-7xl">
            <span>Kom langs!</span>
          </h1>

          <p className="py-6 lg:max-w-lg">
            Ben je benieuwd of MentalMotion iets voor jou is? Heb je een idee
            maar weet je nog niet hoe dat werkelijkheid kan worden? Of je nou
            zorgen hebt over een van je vrienden, je misschien peer supporter
            wil worden of gewoon nieuwsgierig bent naar wie we zijn en wat we
            doen, je bent altijd welkom om bij ons binnen te lopen! Check de{" "}
            <a
              href="/calendar"
              className="text-[#58B095] underline hover:no-underline font-semibold"
            >
              agenda
            </a>{" "}
            voor alle aankomende activiteiten, of onze{" "}
            <a
              href="/contact"
              className="text-[#58B095] underline hover:no-underline font-semibold"
            >
              openingstijden
            </a>{" "}
            zodat je niet voor een dichte deur hoeft te staan. Wij horen heel
            graag van je!
          </p>
        </div>
      </div>

      <TransitionWithBorder colorFrom={"bg-white"} colorTo={"bg-gray-900"} />
    </div>
  );
};

export default JoinUs;
