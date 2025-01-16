import React from "react";
import Link from "next/link";

export default function MainMenu() {
  return (
    <nav>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/projects">Projects</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
        <li>
          <a href="/testimonials">Testimonials</a>
        </li>
        <li>
          <a href="/skills">Skills</a>
        </li>
        <li>
          <a href="/services">Services</a>
        </li>
      </ul>
    </nav>
  );
}
