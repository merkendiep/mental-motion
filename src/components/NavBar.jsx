'use client'

import React from "react"
import {ChevronDownIcon} from '@heroicons/react/24/solid/index.js';
import Link from "next/link";
import Image from "next/image";
import mentalMotionLogo from '@/public/images/MentalMotion-horizontaal-doorzichtig-logo.png'
import {usePathname} from "next/navigation";
import NavItem from "@/src/components/NavItem";
import NavItemNested from "@/src/components/NavItemNested";

const navigation = [
  {name: "Home", href: "/"},
  {name: "De Peer", href: "/de-peer"},
  {name: "Over ons", href: "/about"},
  {
    name: "Nieuws",
    href: false,
    children: [
      {name: "Blog", href: "/blog"},
      {name: "Agenda", href: "/calendar"},
      {name: "Nieuwsbrief", href: "/newsletter"},
    ],
  },
  {
    name: "Samenwerking",
    href: false,
    children: [
      {name: "Partnerschap", href: "/partners"},
      {name: "Sluit je aan", href: "/join"},
      {name: "Huur de peer", href: "/de-peer"},
    ],
  },
  {name: "Hulpvraag", href: "/help"},
]
const NavBar = () => {
  const url = usePathname();

  return (
    <div className="fixed w-full top-0 z-50 flex justify-center p-2 lg:p-4">
      <div className="navbar rounded-full bg-base-100/90 py-2 px-4 shadow-2xl outline outline-base-content/5 backdrop-blur md:max-w-7xl">

        {/* Navbar mobile / tablet */}
        <div className="navbar-start w-full">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-circle btn-ghost lg:hidden ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul className="menu dropdown-content menu-md z-[1] mt-3 w-52 gap-2 rounded-box bg-base-100 p-2 shadow">
              {
                navigation.map((item, index) => item.children
                  ? <NavItemNested mobile item={item} key={index}/>
                  : <NavItem mobile item={item} key={index}/>)
              }
            </ul>
          </div>

          <a href="/">
            <Image src={mentalMotionLogo} alt={'MentalMotion Logo'} className={'w-24 md:w-44 lg:w-60 max-w-[260px]'}/>
          </a>
        </div>

        {/* Navbar for large screens */}
        <div className="navbar-center ml-10 hidden lg:flex">
          {navigation.map((item, index) => (
            <nav key={index} className="menu menu-horizontal px-[0] xl:px-1">
              {
                item.children ? <NavItemNested item={item}/> : <NavItem item={item}/>
              }
            </nav>
          ))}
        </div>

        <Link href="/contact" className="btn btn-primary ml-4">
          Contact
        </Link>
      </div>
    </div>
  )
}

export default NavBar
