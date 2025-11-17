import React from "react";
import TransitionWithBorder from "@/src/components/TransitionWithBorder";
import { partnerService } from "@/src/services/partnerService";

const PartnersPage = async () => {
  const partners = await partnerService.getAllPartners();
  return (
    <div className="flex flex-col bg-white pt-24 lg:pt-44">
      <div className={"max-w-7xl mb-16 mx-auto px-2 md:px-0"}>
        <div className="hero-content flex-col mx-auto gap-8 lg:flex-row">
          <div className="text-center lg:text-center">
            <h1 className="text-3xl font-black text-gray-700 mb-8 uppercase md:text-6xl">
              <span>Onze Partners</span>
            </h1>

            <p className="text-lg font-medium text-gray-600 mb-8 md:text-xl max-w-2xl mx-auto">
              Samen met vele anderen maken we Utrecht creatiever, gezonder en
              gelukkiger. MentalMotion houdt ervan om waar dat kan de krachten
              te bundelen. Wij gaan voor cocreatie! De energie, ideeën en
              betrokkenheid van onze partners zorgen ervoor dat we samen écht
              impact kunnen maken in de stad.
              <br />
              <br />
              Of je nu een organisatie, ondernemer of enthousiasteling bent:
              sluit je aan en bouw mee aan een Utrecht vol beweging, verbinding
              en inspiratie!
            </p>
          </div>
        </div>

        <div className={"flex justify-center flex-row flex-wrap gap-8"}>
          {partners.map((partner) => {
            const content = (
              <figure>
                <img src={partner.logo} alt={partner.name + " logo"} />
              </figure>
            );

            return (
              <div
                key={partner.id}
                className="rounded-lg flex justify-center items-center bg-white w-88 py-4 shadow-sm lg:w-96"
              >
                {partner.url ? (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </div>
            );
          })}
        </div>
      </div>

      <TransitionWithBorder colorFrom={"bg-white"} colorTo={"bg-gray-900"} />
    </div>
  );
};

export default PartnersPage;
