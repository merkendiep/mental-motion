import React from "react"
import { HomeIcon, LightBulbIcon, SunIcon, UserGroupIcon } from '@heroicons/react/24/solid/index.js';

const services = [
  {
    name: "Peer Support",
    icon: <UserGroupIcon className={'size-6'}/>,
    description: "Je kan bij ons terecht voor gratis gesprekken met " +
        " opgeleide peer guides. Ontvang ondersteuning en kom verder met onze opgeleide peers. Of" +
        " kom bij ons werken als Peer!"
  },
  {
    name: "Studieruimtes",
    icon: <HomeIcon className={'size-6'}/>,
    description: "Maak gebruik van onze studie en" +
        " vergaderruimtes. Geniet van thee, koffie en koekjes" +
        " terwijl je bij ons komt studeren, ontmoeten vergaderen" +
        " of chillen op de bank. Ontmoet andere studenten en" +
        " deel samen je ideeën over studentenwelzijn."
  },
  {
    name: "Brainstormen",
    icon: <LightBulbIcon className={'size-6'}/>,
    description:
      "Wat denk jij dat er moet gebeuren? Bij ons is\n" +
        "er de ruimte om samen met andere" +
        "studenten te onderzoeken wat er moet" +
        "gebeuren, zowel lokaal als landelijk aan" +
        "studentenwelzijn. Gericht op preventiezorg," +
        "eigenaarschap, participatie en zingeving.",
  },
  {
    name: "Nieuwe Initiatieven",
    icon: <SunIcon className={'size-6'}/>,
    description:
      "We werken samen aan nieuwe initiatieven en" +
        "iedereen is welkom om een idee op te zetten," +
        "mee te denken en samen iets nieuws op te zetten.",
  },
]
const Services = () => {
  return (
    <div className="mt-10 flex flex-col items-center justify-center md:mt-20">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center text-2xl font-semibold md:text-5xl">
          Wat bieden wij
        </h1>

        <span className="text-md mt-2 px-2 text-center md:mt-4 md:px-5 md:text-xl">
          Hulp kan in vele vorm komen.
        </span>
      </div>

      <div className="container mt-10 grid gap-10 p-4 md:grid-cols-2 xl:grid-cols-3">
        {services.map((item, index) => (
          <div key={index} className="card max-w-2xl  shadow-sm transition duration-300 hover:-translate-y-1">
            <div className="card-body">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-t from-base-300/20 to-base-content/10">
                {
                  item.icon
                }
              </div>

              <h2 className="card-title text-3xl font-black">{item.name}</h2>
              <p className="text-md font-medium opacity-60">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services
