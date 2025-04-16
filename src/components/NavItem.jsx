import React from "react";
import {usePathname} from "next/navigation";

const NavItem = ({item, mobile}) => {
  const path = usePathname();
  const active = item.href === path;

  if (mobile) {
    return <li key={item.name} className={active ? 'bg-base-300' : ''}>
      <a href={item.href}>
        {item.name}
      </a>
    </li>
  }

  return <a
    key={item.name}
    href={item.href}
    className={`btn btn-ghost ${active ? "bg-base-300" : ""}`}>

    {item.name}
  </a>
}

export default NavItem