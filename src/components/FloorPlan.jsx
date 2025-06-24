import React, { useState } from "react";
import FloorPlanRoom from "@/src/components/FloorPlanRoom";

// Example room info data
const ROOM_INFO = {
  "De Pit": { description: "De Pit is the main hall, used for events and gatherings." },
  "De Tak": { description: "De Tak is a quiet workspace with lots of natural light." },
  "De Schil": { description: "De Schil is a cozy lounge area for relaxation." },
  "Het Zaadje": { description: "Het Zaadje is a small meeting room." },
  "WC": { description: "WC is the restroom." },
  "Kast": { description: "Kast is the storage area." },
};

const FloorPlan = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <>
      <div className={'relative flex bg-gray-50 border border-gray-100 w-[1000px] h-[271px] mx-auto'}>
        <span className={'text-lg ml-28 mt-28'}>De Boomgaard</span>

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