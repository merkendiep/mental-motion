import React from "react";
import {
  AcademicCapIcon,
  HeartIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid/index.js";

const Hero = () => {
  return (
    <div className="hero py-10 flex justify-center max-w-7xl mx-auto lg:px-10 2xl:px-0 lg:justify-start">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-start">
          <span className="badge badge-lg mb-4">
            Students Peer Support Center
          </span>

          <h1 className="text-3xl font-black text-base-100 uppercase md:text-7xl">
            <span>Voor studenten</span>
            <span className="text-gray-200/90">
              <br /> Door studenten
            </span>
            <span className="text-gray-200/90 text-lg block">
              en alle jongvolwassenen in Utrecht
            </span>
          </h1>

          <p className="py-6 text-white lg:max-w-lg">
            Samen zorgen wij via Peer Support voor een Mental Mindshift in
            Utrecht
          </p>

          <div className="space-y-2 text-white">
            <div className="flex items-center">
              <UserGroupIcon className={"size-8 mr-2"} />
              <span>1-op-1 support</span>
            </div>
            <div className="flex items-center">
              <AcademicCapIcon className={"size-8 mr-2"} />
              <span>Studieruimtes</span>
            </div>
            <div className="flex items-center">
              <HeartIcon className={"size-8 mr-2"} />
              <span>Mental health events</span>
            </div>
            <div className="flex items-center">
              <HomeIcon className={"size-8 mr-2"} />
              <span>Ruimte huren</span>
            </div>
          </div>

          <div className="flex gap-2 mt-4 max-lg:justify-center">
            <a
              href="#peer-support-section"
              className="btn btn-primary md:btn-lg shadow-md scroll-smooth"
            >
              Lees verder
            </a>

            <a
              href="/contact"
              className="btn btn-link font-bold rounded-full text-white md:btn-lg"
            >
              Of neem contact op
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
