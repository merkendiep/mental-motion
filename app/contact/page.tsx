"use client";

import React, { useState } from "react";
import Contact from "@/src/components/Contact";
import TransitionWithBorder from "@/src/components/TransitionWithBorder";
import {
  QuestionMarkCircleIcon,
  ChevronDownIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/solid";

const ContactPage = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const contactMethods = [
    {
      icon: <MapPinIcon className="h-6 w-6" />,
      title: "Kom langs",
      description: "Wolff en Dekenplein 5, 3532 XH Utrecht",
      detail: "Maandag t/m vrijdag open",
      color: "text-primary",
    },
    {
      icon: <PhoneIcon className="h-6 w-6" />,
      title: "Bel ons",
      description: "06 50248871",
      detail: "Bereikbaar tijdens kantooruren",
      color: "text-secondary",
    },
    {
      icon: <EnvelopeIcon className="h-6 w-6" />,
      title: "Email ons",
      description: "info@mentalmotion.nl",
      detail: "We reageren binnen 24 uur",
      color: "text-accent",
    },
  ];

  const faqs = [
    {
      question: "Hoe kan ik een afspraak maken?",
      answer:
        "Je kunt een afspraak maken door ons te bellen, te mailen, of gewoon langs te komen tijdens onze openingstijden. We proberen altijd plek te maken voor urgente gevallen.",
    },
    {
      question: "Wat kost peer support?",
      answer:
        "Alle peer support gesprekken zijn volledig gratis. Dit is onderdeel van onze missie om mentale gezondheid toegankelijk te maken voor alle studenten.",
    },
    {
      question: "Moet ik student zijn om gebruik te maken van jullie diensten?",
      answer:
        "Ja, onze diensten zijn specifiek gericht op studenten. We begrijpen de unieke uitdagingen waar studenten mee te maken hebben.",
    },
    {
      question: "Is er een wachtlijst?",
      answer:
        "We doen ons best om iedereen zo snel mogelijk te helpen. Voor dringende gevallen maken we altijd tijd vrij.",
    },
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="flex flex-col bg-white">
      {/* Call to Action Header */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 pt-32 lg:pt-44 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <SparklesIcon className="h-12 w-12 text-primary mx-auto mb-6" />
            <h1 className="text-4xl font-black text-base-content md:text-6xl lg:text-7xl mb-6">
              Klaar om contact op te nemen?
            </h1>
            <p className="text-xl text-base-content/80 mb-8">
              We zijn er om je te helpen. Of je nu vragen hebt, een afspraak
              wilt maken, of gewoon even wilt praten - we staan voor je klaar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#contact-form")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <EnvelopeIcon className="h-5 w-5" />
                Verstuur bericht
              </a>
              <a
                href="tel:+31650248871"
                className="btn btn-outline btn-lg hover:btn-primary transition-all duration-300"
              >
                <PhoneIcon className="h-5 w-5" />
                Bel direct
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Methods Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="card-body text-center p-6">
                <div
                  className={`mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-base-300/20 to-base-content/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${method.color}`}
                >
                  {method.icon}
                </div>
                <h3 className="card-title text-lg justify-center mt-4">
                  {method.title}
                </h3>
                <p className="font-semibold text-base-content/90">
                  {method.description}
                </p>
                <p className="text-sm text-base-content/60">{method.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Component */}
      <Contact />

      <TransitionWithBorder colorFrom={"bg-white"} colorTo={"bg-base-100"} />

      {/* FAQ Section */}
      <div className="bg-base-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <QuestionMarkCircleIcon className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Veelgestelde vragen</h2>
              <p className="text-base-content/70">
                Hier vind je antwoorden op de meest gestelde vragen. Staat je
                vraag er niet bij? Stuur ons gerust een bericht!
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="card-body p-0">
                    <button
                      className="flex items-center justify-between w-full p-6 text-left hover:bg-base-200/50 transition-colors"
                      onClick={() => toggleFaq(index)}
                    >
                      <span className="font-semibold text-lg">
                        {faq.question}
                      </span>
                      <ChevronDownIcon
                        className={`h-5 w-5 transition-transform duration-200 ${
                          expandedFaq === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {expandedFaq === index && (
                      <div className="px-6 pb-6">
                        <p className="text-base-content/80 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <TransitionWithBorder colorFrom={"bg-base-100"} colorTo={"bg-gray-900"} />
    </div>
  );
};

export default ContactPage;
