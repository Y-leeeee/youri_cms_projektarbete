"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MainMenu() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },

    { name: "Testimonials", path: "/testimonials" },
    { name: "Skills", path: "/skills" },
    { name: "Services", path: "/services" },
  ];

  return (
    <nav aria-label="Main navigation">
      <ul className="menu">
        {menuItems.map((item) => (
          <li
            key={item.path}
            className={pathname === item.path ? "active" : ""}
          >
            <Link href={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
