"use client";

import React, { useEffect, useState } from "react";

// Define the TypeScript interface for the project
interface Project {
  title: { rendered: string };
  content: { rendered: string };
  featured_media: number | null;
  imageUrl?: string | null;
}

export default function ProjectPage({
  params: rawParams,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [params, setParams] = useState<{ slug: string } | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchParamsAndProject() {
      try {
        const resolvedParams = await rawParams; // Unwrap params
        setParams(resolvedParams);

        const res = await fetch(
          `http://localhost:8888/cms_projektarbete/wordpress/wp-json/wp/v2/projects?slug=${resolvedParams.slug}`
        );

        if (!res.ok) {
          console.error(
            `Failed to fetch project with slug ${resolvedParams.slug}:`,
            res.status,
            res.statusText
          );
          return;
        }

        const projectData: Project[] = await res.json();
        const project = projectData[0];

        if (project?.featured_media) {
          const mediaRes = await fetch(
            `http://localhost:8888/cms_projektarbete/wordpress/wp-json/wp/v2/media/${project.featured_media}`
          );
          const mediaData = await mediaRes.json();
          project.imageUrl = mediaData?.source_url || null; // Allow null here
        }

        setProject(project);
      } catch (error) {
        console.error("Unexpected error fetching project:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchParamsAndProject();
  }, [rawParams]);

  if (isLoading) {
    return <div>Loading project...</div>;
  }

  if (!project) {
    return <div>No project found.</div>;
  }

  return (
    <div>
      <h1>{project.title.rendered || "No Title Available"}</h1>
      <p>
        {project.content.rendered.replace(/<[^>]+>/g, "") ||
          "No Description Available"}
      </p>
      {project.imageUrl ? (
        <img
          src={project.imageUrl}
          alt={project.title.rendered || "Project Image"}
          style={{ maxWidth: "400px", margin: "20px 0" }}
        />
      ) : (
        <p>No Image Available</p>
      )}
    </div>
  );
}
