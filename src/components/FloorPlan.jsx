import React, { useState } from "react";
import FloorPlanRoom from "@/src/components/FloorPlanRoom";

// Example room info data
const ROOM_INFO = {
  "De Boomgaard": {
    description:
      "De Boomgaard is het kloppend hart van het gebouw: een ruime, lichte woonkamer waar mensen samenkomen om te ontspannen, te praten of samen te eten. De grote ramen bieden uitzicht op het groen en creëren een warme, uitnodigende sfeer."
  },
  "De Pit": {
    description:
      "De Pit vormt de centrale hal en is het toneel voor evenementen, bijeenkomsten en inspirerende gesprekken. Hier komen mensen samen om ideeën te delen, te vieren of gewoon te genieten van elkaars gezelschap."
  },
  "De Tak": {
    description:
      "De Tak is een rustige werkruimte, badend in natuurlijk licht. Perfect voor geconcentreerd werken, lezen of creatieve sessies. Planten en zachte kleuren zorgen voor een kalme, productieve omgeving."
  },
  "De Schil": {
    description:
      "De Schil is een knusse lounge, ideaal om even tot rust te komen. Zachte banken, warme verlichting en een huiselijke sfeer maken dit de perfecte plek voor een goed gesprek of een moment voor jezelf."
  },
  "Het Zaadje": {
    description:
      "Het Zaadje is een kleine, intieme vergaderruimte. Hier ontstaan de grootste ideeën in een rustige setting, perfect voor overleg, brainstorms of vertrouwelijke gesprekken."
  },
  "WC": {
    description:
      "De WC is het toilet van het gebouw. Netjes, fris en altijd binnen handbereik voor een korte pauze."
  },
  "Kast": {
    description:
      "De Kast is de opslagruimte waar materialen, schoonmaakspullen en andere benodigdheden veilig en overzichtelijk worden bewaard."
  },
};

const FloorPlan = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <>
      <div className={'relative flex bg-gray-50 border border-gray-100 w-[1000px] h-[271px] mx-auto'}>
        <span className={'text-lg ml-28 mt-28'} onClick={() => setSelectedRoom("De Pit")}>De Boomgaard</span>

        <FloorPlanRoom width={214} height={160} className={'right-0 top-0'} onClick={() => setSelectedRoom("De Pit")}>
          De Pit
        </FloorPlanRoom>

        <FloorPlanRoom width={214} height={160} className={'right-[214px] top-0'} onClick={() => setSelectedRoom("De Tak")}>
          De Tak
        </FloorPlanRoom>

        <FloorPlanRoom width={190} height={111} className={'right-[428px] top-0'} onClick={() => setSelectedRoom("De Schil")}>
          De Schil
        </FloorPlanRoom>

        <FloorPlanRoom width={137} height={112} className={'right-[486px] bottom-0'} onClick={() => setSelectedRoom("Het Zaadje")}>
          Het Zaadje
        </FloorPlanRoom>

        <FloorPlanRoom width={71} height={112} className={'right-[623px] bottom-0'} onClick={() => setSelectedRoom("WC")}>
          WC
        </FloorPlanRoom>

        {/*WALL*/}
        <div className={'absolute right-[694px] bottom-0 w-[24px] h-[160px]'}>
          <div className={'w-[24px] h-[160px] bg-black'}></div>
        </div>

        {/*Kitchen*/}
        <div className={'absolute right-[718px] bottom-0 transform-3d w-[29px] h-[134px]'}>
          <div className={'w-[29px] h-[134px] group-hover:-translate-y-4 animate-blueprint-hover bg-gray-300'}></div>
        </div>

        <FloorPlanRoom width={86} height={52} className={'right-[215px] bottom-0'} onClick={() => setSelectedRoom("WC")}>
          WC
        </FloorPlanRoom>
        <FloorPlanRoom width={215} height={52} className={'right-0 bottom-0'} noHover onClick={() => setSelectedRoom("Kast")}>
          Kast
        </FloorPlanRoom>
      </div>

      {/* Info section below the blueprint */}
      {(
        <div className="w-[1000px] mx-auto mt-6 p-4 border rounded bg-white shadow">
          <h2 className="text-xl font-bold mb-2">{selectedRoom}</h2>
          <p>{ROOM_INFO[selectedRoom]?.description || "klik op een ruimte om meer informatie te zien"}</p>
        </div>
      )}
    </>
  );
};

export default FloorPlan;