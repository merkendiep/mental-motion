import React, { useState } from "react"
import { ChevronDownIcon } from '@heroicons/react/24/solid/index.js';

const navigation = [
  { name: "Home", href: "/" },
  { name: "De Peer", href: "/de-peer" },
  { name: "Over ons", href: "/about" },
  {
    name: "Nieuws",
    href: false,
    children: [
      { name: "Blog", href: "/blog" },
      { name: "Agenda", href: "/calendar" },
      { name: "Nieuwsbrief", href: "/newsletter" },
    ]
  },
  {
    name: "Samenwerking",
    href: false,
    children: [
      { name: "Partnerschap", href: "/partners" },
      { name: "Sluit je aan", href: "/join" },
      { name: "Huur de peer", href: "/rent" },
    ]
  },
  { name: "Hulpvraag", href: "/help" },
]
const NavBar = () => {
  const [active, setActive] = useState(window.location.pathname)

  return (
    <div className="fixed w-full top-0 z-50 flex justify-center py-4 px-4">
      <div
          className="navbar rounded-full bg-base-100/90 py-2 px-4 shadow-2xl outline outline-base-content/5 backdrop-blur md:max-w-7xl">
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
              {navigation.map((item, index) => (
                  <li key={index}>
                    {
                        item.href && <a key={item.name} href={item.href}>
                          {item.name}
                        </a>
                    }
                  </li>
              ))}
            </ul>
          </div>

          <a href="/">
            <img src={'/images/MentalMotion-horizontaal-doorzichtig-logo.png'} className={'h-14'}/>
          </a>
        </div>
        <div className="navbar-center ml-10 hidden lg:flex">
          {navigation.map((item, index) => (
              <nav key={index} className="menu menu-horizontal px-1">
                {
                    item.href && <a
                        key={item.name}
                        href={item.href}
                        className={`btn btn-ghost ${
                            active === item.href ? "bg-base-300" : ""
                        }`}
                        onClick={() => setActive(item.name)}>
                      {item.name}
                    </a>
                }
                {
                    item.href === false && item.children && <details>
                      <summary className={`btn btn-ghost ${
                          item.children.find(child => child.href === active) ? "bg-base-300" : ""
                      }`}>
                        {item.name}
                        <ChevronDownIcon className={'size-4'}/>
                      </summary>
                      <ul className="absolute top-[100%] bg-base-100 rounded-t-none p-2">
                        {
                          item.children.map((child, index) =>
                              <li key={index}><a href={child.href}>{child.name}</a></li>
                          )
                        }
                      </ul>
                    </details>
                }
              </nav>
          ))}
        </div>

        <a href="/contact" className="btn btn-primary ml-4">
          Contact
        </a>
      </div>
    </div>
  )
}

export default NavBar
