"use client"// components/SideNavigation.tsx""

import Link from "next/link";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "./SignOutButton";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

type NavLink = {
  name: string;
  href: string;
  icon: ReactNode;
};

const navLinks: NavLink[] = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

export default function SideNavigation(){
    const  pathname  = usePathname();
  return (
    <nav className="border-r border-primary-900 h-full">
      <ul className="flex flex-col gap-2 h-full text-lg fixed">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className={`py-3 px-5 hover:bg-primary-800 hover:text-primary-100
               transition-colors flex items-center gap-4 font-semibold text-primary-200
                ${pathname === link.href ? "bg-primary-800" : ""}`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}

        <li className="mt-[290px]">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}
