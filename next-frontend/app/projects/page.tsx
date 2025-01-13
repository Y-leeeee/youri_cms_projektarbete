"use client";

import React, { useEffect, useState } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(
          "http://localhost:8888/cms_projektarbete/wordpress/wp-json/wp/v2/projects"
        );

        if (!res.ok) {
          console.error(
            "Failed to fetch projects:",
            res.status,
            res.statusText
          );
          return;
        }

        const projectsData = await res.json();
        console.log("Client projects data:", projectsData);
        setProjects(projectsData);
      } catch (error) {
        console.error("Unexpected error fetching projects:", error);
      }
    }

    fetchProjects();
  }, []);

  if (!projects || projects.length === 0) {
    return <div>No projects found.</div>;
  }

  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects.map((project: any) => (
          <li key={project.id}>
            <h2>
              <a href={`/projects/${project.slug}`}>
                {project.title?.rendered || "No Title Available"}
              </a>
            </h2>
            <p>
              {project.content?.rendered.replace(/<[^>]+>/g, "") ||
                "No Content Available"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
