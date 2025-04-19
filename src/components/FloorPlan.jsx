import React from "react";
import FloorPlanRoom from "@/src/components/FloorPlanRoom";

const FloorPlan = () => {
  return <div className={'relative flex bg-gray-50 border border-gray-100 w-[1000px] h-[271px] mx-auto'}>
    <span className={'text-lg ml-28 mt-28'}>De steel</span>

    <FloorPlanRoom width={214} height={160} className={'right-0 top-0'}>
      Ruimte 1
    </FloorPlanRoom>

    <FloorPlanRoom width={214} height={160} className={'right-[214px] top-0'}>
      Ruimte 2
    </FloorPlanRoom>

    <FloorPlanRoom width={190} height={111} className={'right-[428] top-0'}>
      Ruimte 3
    </FloorPlanRoom>

    <FloorPlanRoom width={137} height={112} className={'right-[486px] bottom-0'}>
      Ruimte 4
    </FloorPlanRoom>

    <FloorPlanRoom width={71} height={112} className={'right-[623px] bottom-0'}>
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

    <FloorPlanRoom width={86} height={52} className={'right-[215] bottom-0'}>
      WC
    </FloorPlanRoom>
    <FloorPlanRoom width={215} height={52} className={'right-0 bottom-0'} noHover>
      Kast
    </FloorPlanRoom>
    {/*Kitchen*/}
    {/*<div className={'absolute right-0 bottom-0 transform-3d group w-[215px] h-[52px]'}>*/}
    {/*  <div className={'w-[215px] h-[52px] group-hover:-translate-y-4 animate-blueprint-hover bg-gray-300'}></div>*/}
    {/*</div>*/}

  </div>
}

export default FloorPlan;