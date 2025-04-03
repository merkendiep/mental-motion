import React from "react"
import { AcademicCapIcon, HeartIcon, HomeIcon, UserGroupIcon } from '@heroicons/react/24/solid/index.js';

const Hero = () => {
  return (
    <div
      className="hero py-10 flex max-w-7xl mx-auto">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="/images/portrait-people-with-plants.jpeg"
          alt=""
          className="max-w-xs rounded-b-box rounded-t-[14rem] shadow-2xl outline outline-base-content/5 md:max-w-md md:hidden"
        />

        <div className="text-center lg:text-start">
          <span className="badge badge-lg">Students peer support center</span>

          <h1 className="text-3xl font-black text-base-100 uppercase md:text-7xl">
            <span>Door studenten</span>
            <span className="text-gray-200/90"><br/> Voor studenten</span>
          </h1>

          <p className="py-6 text-white lg:max-w-lg">
            Door middel van peer support zorgen wij voor een mentaal gezonder Utrecht!
          </p>

          <div className="space-y-2 text-white">
            <div className="flex items-center">
              <UserGroupIcon className={'size-8 mr-2'}/>
              <span>1-op-1 support</span>
            </div>
            <div className="flex items-center">
              <AcademicCapIcon className={'size-8 mr-2'}/>
              <span>Studieruimtes</span>
            </div>
            <div className="flex items-center">
              <HomeIcon className={'size-8 mr-2'}/>
              <span>Zaalverhuur</span>
            </div>
            <div className="flex items-center">
              <HeartIcon className={'size-8 mr-2'}/>
              <span>Mental health events</span>
            </div>
          </div>

          <div className="flex gap-2 mt-4 max-lg:justify-center">
            <a href="#someSectionDown" className="btn btn-primary md:btn-lg shadow-md">
              Lees verder
            </a>

            <a href="/contact" className="btn btn-link font-bold rounded-full text-white md:btn-lg">
              Of neem contact op
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
