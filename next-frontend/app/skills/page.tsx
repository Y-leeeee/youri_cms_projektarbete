"use client";

import React, { useEffect, useState } from "react";
import MainMenu from "../components/MainMenu";

interface Skill {
  id: number;
  title: { rendered: string };
  acf: {
    proficiency_level: string;
    description: string;
    skill_icon: { url: string };
  };
}

const SkillsPage = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await fetch(
          "http://localhost:8888/cms_projektarbete/wordpress/wp-json/wp/v2/skills"
        );
        const data = await res.json();
        setSkills(data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSkills();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <MainMenu />
      <div className="page-content">
        <h1>My Skills</h1>
        <div className="skills-grid">
          {skills.map((skill) => (
            <div key={skill.id} className="skill-card">
              <h2>{skill.title.rendered}</h2>
              <p>Proficiency: {skill.acf.proficiency_level}</p>
              <p>{skill.acf.description}</p>
              {skill.acf.skill_icon && (
                <img
                  src={skill.acf.skill_icon.url}
                  alt={skill.title.rendered}
                  width={100}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;
