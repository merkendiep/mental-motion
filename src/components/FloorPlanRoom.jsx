import React from "react";

const FloorPlanRoom = ({width, height, children, className, noHover, onClick}) => {
  return <div style={{width, height}} onClick={onClick} className={`absolute transform-3d ${noHover ? '' : 'group'} ${className}`}>
    <div style={{width, height}} className={'flex justify-center items-center group-hover:-translate-y-4 border border-gray-200 bg-gray-50 group-hover:shadow group-hover:border-gray-100'}>
      {children}
    </div>
  </div>
}

export default FloorPlanRoom;