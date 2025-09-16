import React from "react";

const team = [
  {
    name: "Friede",
    profile: "",
    position: "onze structuurtijger",
    description:
      "Friede luistert scherp, durft kritische vragen te stellen en zorgt bovendien dat we het overzicht houden. Ze heeft een talent voor het scheppen van structuur, en is verantwoordelijk voor PR en onze planning, maar je komt haar ook tegen bij de BeleidsBrainstorm of de Peer Support groepen.",
  },
  {
    name: "Marik",
    profile: "/images/mugshot-marik.jpeg",
    position: "onze speedboot",
    description:
      "Marik is altijd en overal en kent iedereen. Als mede-oprichter van MentalMotion is hij een echte buitenspeler en onderhoudt hij ons netwerk. Hij zoekt altijd naar mogelijkheden om samen te werken, ziet veel positiviteit, coördineert onze fantastische groep vrijwilligers en zet zich vol enthousiasme in om zijn visie te realiseren.",
  },
  {
    name: "Sofia",
    profile: "/images/mugshot-sofia.jpeg",
    position: "onze zinzoeker",
    description:
      "Sofia is onze bedachtzame creatieveling. Ze gaat graag met iedereen in gesprek, heeft aandacht voor detail en prikt graag door lege woorden. Als mede-oprichter van MentalMotion is zij meer een binnenspeler en zit veel op de inhoud. Je kan haar tegenkomen bij de Peer Support groepen, de offline middag en de thema-avonden.",
  },
  {
    name: "Gijs",
    profile: "/images/mugshot-gijs.jpeg",
    position: "onze Excel-koning",
    description:
      "Gijs houdt het overzicht en blijft geaard terwijl hij de digitale basis van MentalMotion verzorgt. Hij doet onze back-office en regelt de verhuur van ruimtes maar zorgt ook dat de printer blijft werken. Bovendien werkt hij graag mee op evenementen en actiedagen om MentalMotion te laten shinen.",
  },
  {
    name: "Mieke",
    profile: "",
    position: "onze Powerbank",
    description: (
      <>
        Mieke is een beetje de ‘godmother’ van MentalMotion, vol liefde en
        vertrouwen ondersteunt zij het kernteam en houdt ons scherp, maar zorgt
        er ook voor dat alle regeldingen zoals contracten, declaraties en
        financiën goed lopen. Mieke is de oprichter van{" "}
        <a
          href="https://www.powerbypeers.nl/"
          target="_blank"
          className="text-[#58B095] underline hover:no-underline font-semibold"
        >
          Power by Peers
        </a>
        , de sociale onderneming die MentalMotion mogelijk maakt.
      </>
    ),
    link: "https://www.powerbypeers.nl/",
  },
];

const Team = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center text-2xl font-semibold md:text-5xl">
          Wie zijn wij
        </h1>

        <span className="text-md mt-4 px-2 text-center md:mt-4 md:px-5 md:text-xl">
          Ontmoet het gepassioneerde team dat Mental Motion mogelijk maakt.
        </span>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {team.map((item, index) => (
          <div
            key={index}
            className="card w-80 border border-base-content/10 shadow-sm lg:w-96"
          >
            <figure className="lpx-10 pt-10">
              <img
                src={item.profile || null}
                alt="Shoes"
                className="h-60 w-60 rounded-full object-cover"
              />
            </figure>

            <div className="card-body items-center text-center">
              <h2 className="card-title font-bold">{item.name}</h2>
              <h2 className="font-semibold opacity-70">{item.position}</h2>
              <p className="text-sm mt-3 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
