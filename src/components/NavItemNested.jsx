import React from "react";
import {usePathname} from "next/navigation";
import {ChevronDownIcon} from "@heroicons/react/24/solid/index";

const NavItemNested = ({item, mobile}) => {
  const path = usePathname();
  const active = item.href === path;

  if (mobile) {
    return <li key={item.name}>
      <span className={'select-none text-gray-500 pointer-events-none'}>{item.name}</span>
      {
        item.children.map((child) => (<a
          href={child.href}
          key={child.name}
          className={`ml-4 ${child.href === path ? "bg-base-300" : ""}`}
        >
          {child.name}
        </a>))
      }
    </li>
  }

  return <details>
    <summary className={`btn btn-ghost ${item.children.find(child => child.href === path) ? "bg-base-300" : ""}`}>
      {item.name}
      <ChevronDownIcon className={'size-4'}/>
    </summary>

    <ul className="absolute top-[100%] bg-base-100 rounded-t-none p-2">
      {
        item.children.map((child) =>
          <li key={child.name}>
            <a href={child.href}>{child.name}</a>
          </li>,
        )
      }
    </ul>
  </details>
}

export default NavItemNested