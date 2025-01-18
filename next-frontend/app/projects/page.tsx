"use client";

import React, { useEffect, useState } from "react";
import MainMenu from "../components/MainMenu";

interface Project {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  featured_media: number | null;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/projects`);

        if (!res.ok) {
          throw new Error(`Failed to fetch projects: ${res.statusText}`);
        }

        const data: Project[] = await res.json();
        setProjects(data);
      } catch (error: any) {
        console.error("Error fetching projects:", error);
        setError(error.message || "An unknown error occurred.");
      }
    };

    fetchProjects();
  }, [API_BASE_URL]);

  return (
    <div>
      <MainMenu />
      <h1>Projects</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project.id}>{project.title.rendered}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
