import React from "react";
import Link from "next/link";

export default function MainMenu() {
  return (
    <nav className="bg-pink-500 py-4 px-6">
      <ul className="flex justify-center space-x-6">
        <li>
          <Link href="/" className="text-white hover:text-black transition">
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/projects"
            className="text-white hover:text-black transition"
          >
            Projects
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="text-white hover:text-black transition"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="text-white hover:text-black transition"
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
