"use client";

import React, { useEffect, useState } from "react";

// Define the TypeScript interface for the project data
interface Project {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  featured_media: number | null;
  imageUrl?: string | null; // Allow null values
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

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

        const projectsData: Project[] = await res.json();

        // Fetch featured media for each project
        const projectsWithImages = await Promise.all(
          projectsData.map(async (project) => {
            if (project.featured_media) {
              try {
                const mediaRes = await fetch(
                  `http://localhost:8888/cms_projektarbete/wordpress/wp-json/wp/v2/media/${project.featured_media}`
                );
                const mediaData = await mediaRes.json();
                project.imageUrl = mediaData?.source_url || null; // Allow null here
              } catch (error) {
                console.error(
                  `Failed to fetch media for project ID ${project.id}:`,
                  error
                );
                project.imageUrl = null; // Explicitly set null
              }
            } else {
              project.imageUrl = null; // Handle case where there's no featured_media
            }
            return project;
          })
        );

        setProjects(projectsWithImages);
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
        {projects.map((project) => (
          <li key={project.id}>
            <h2>
              <a href={`/projects/${project.slug}`}>
                {project.title.rendered || "No Title Available"}
              </a>
            </h2>
            <p>
              {project.content.rendered.replace(/<[^>]+>/g, "") ||
                "No Description Available"}
            </p>
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={project.title.rendered || "Project Image"}
                style={{ maxWidth: "200px", margin: "10px 0" }}
              />
            ) : (
              <p>No Image Available</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
