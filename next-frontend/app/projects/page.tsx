"use client";

import React, { useEffect, useState } from "react";
import MainMenu from "../components/MainMenu";
import Link from "next/link"; // Use Link for navigation in Next.js

interface Project {
  sys: { id: string };
  fields: {
    title: string;
    slug: string; // Assuming slug is part of the project entry in Contentful
  };
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      if (
        !process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ||
        !process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
      ) {
        setError("Contentful environment variables are not properly set.");
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `https://cdn.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/master/entries?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}&content_type=project`
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch projects: ${res.statusText}`);
        }

        const data = await res.json();

        const projectsData = data.items.map((item: any) => ({
          sys: item.sys,
          fields: item.fields,
        }));

        setProjects(projectsData);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error fetching projects:", error.message);
          setError("Failed to load projects. Please try again later.");
        } else {
          console.error("Unknown error fetching projects:", error);
          setError("An unknown error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <div>
        <MainMenu />
        <p>Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <MainMenu />
        <p role="alert">Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <MainMenu />
      <h1>Projects</h1>
      {projects.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project.sys.id}>
              <h2>{project.fields.title}</h2>
              {/* Link to the individual project page */}
              <Link href={`/projects/${project.fields.slug}`}>
                View Project
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
