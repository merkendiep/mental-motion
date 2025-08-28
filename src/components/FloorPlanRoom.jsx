import React from "react";

const FloorPlanRoom = ({
  width,
  height,
  children,
  className,
  noHover,
  onClick,
  noLeftBorder = false,
}) => {
  return (
    <div
      style={{ width, height }}
      onClick={onClick}
      className={`absolute cursor-pointer ${
        noHover ? "" : "group"
      } ${className}`}
    >
      <div
        style={{ width, height }}
        className={`flex justify-center items-center border-2 border-gray-400 bg-gray-50 group-hover:border-2 group-hover:border-primary group-hover:shadow-lg transition-all duration-200 ${
          noLeftBorder ? "border-l-0 group-hover:border-l-0" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default FloorPlanRoom;
