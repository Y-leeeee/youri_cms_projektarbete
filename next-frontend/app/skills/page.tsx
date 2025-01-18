"use client";

import React, { useEffect, useState } from "react";
import MainMenu from "../components/MainMenu";
import Image from "next/image";

interface Skill {
  id: number;
  title: { rendered: string };
  acf: {
    proficiency_level: string;
    description: string;
    skill_icon?: { url: string };
  };
}

const SkillsPage = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await fetch(`${API_BASE_URL}/skills`);
        if (!res.ok) {
          throw new Error(`Failed to fetch skills: ${res.statusText}`);
        }
        const data = await res.json();
        setSkills(data);
      } catch (error: unknown) {
        console.error("Error fetching skills:", error);
        setError("Failed to load skills. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchSkills();
  }, [API_BASE_URL]);

  if (isLoading) {
    return (
      <div>
        <MainMenu />
        <p className="text-center mt-6">Loading skills...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <MainMenu />
        <p className="text-center text-red-500 mt-6">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <MainMenu />
      <div className="page-content container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center my-6">My Skills</h1>
        <div className="skills-grid grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.length === 0 ? (
            <p className="text-center">No skills available</p>
          ) : (
            skills.map((skill) => (
              <div
                key={skill.id}
                className="skill-card bg-white shadow-md rounded-lg p-4 text-center"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {skill.title.rendered || "No title available"}
                </h2>
                <p className="text-gray-600 mb-2">
                  Proficiency: {skill.acf.proficiency_level || "Unknown"}
                </p>
                <p className="text-gray-600 mb-4">
                  {skill.acf.description || "No description available"}
                </p>
                {skill.acf.skill_icon?.url ? (
                  <div className="relative w-20 h-20 mx-auto">
                    <Image
                      src={skill.acf.skill_icon.url}
                      alt={skill.title.rendered || "Skill Icon"}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                ) : (
                  <p className="text-gray-500">No icon available</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;
