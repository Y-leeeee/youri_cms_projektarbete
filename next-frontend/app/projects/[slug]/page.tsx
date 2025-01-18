"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Project {
  title: { rendered: string };
  content: { rendered: string };
  image1?: { url: string };
  image2?: { url: string };
  image3?: { url: string };
  acf?: {
    image1?: number;
    image2?: number;
    image3?: number;
    project_url?: string;
  };
}

export default function ProjectPage({
  params: rawParams,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [params, setParams] = useState<{ slug: string } | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchParamsAndProject() {
      try {
        const resolvedParams = await rawParams;
        setParams(resolvedParams);

        const res = await fetch(
          `${API_BASE_URL}/projects?slug=${resolvedParams.slug}`
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

        if (project.acf) {
          if (project.acf.image1) {
            const mediaRes1 = await fetch(
              `${API_BASE_URL}/media/${project.acf.image1}`
            );
            const mediaData1 = await mediaRes1.json();
            project.image1 = { url: mediaData1.source_url };
          }

          if (project.acf.image2) {
            const mediaRes2 = await fetch(
              `${API_BASE_URL}/media/${project.acf.image2}`
            );
            const mediaData2 = await mediaRes2.json();
            project.image2 = { url: mediaData2.source_url };
          }

          if (project.acf.image3) {
            const mediaRes3 = await fetch(
              `${API_BASE_URL}/media/${project.acf.image3}`
            );
            const mediaData3 = await mediaRes3.json();
            project.image3 = { url: mediaData3.source_url };
          }
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
    return <div className="loading">Loading project...</div>;
  }

  if (!project) {
    return <div className="no-project">No project found.</div>;
  }

  return (
    <div className="project-page">
      <h1 className="project-title">
        {project.title.rendered || "No Title Available"}
      </h1>
      <p className="project-description">
        {project.content.rendered.replace(/<[^>]+>/g, "") ||
          "No Description Available"}
      </p>

      {/* Display images */}
      <div className="project-images">
        {project.image1?.url && (
          <img src={project.image1.url} alt="Project Image 1" />
        )}
        {project.image2?.url && (
          <img src={project.image2.url} alt="Project Image 2" />
        )}
        {project.image3?.url && (
          <img src={project.image3.url} alt="Project Image 3" />
        )}
      </div>

      {/* Display Project URL */}
      {project.acf?.project_url && (
        <a
          href={project.acf.project_url}
          className="project-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Live Project
        </a>
      )}

      {/* Back to Projects Button */}
      <button className="back-button" onClick={() => router.push("/projects")}>
        Go Back to Projects
      </button>
    </div>
  );
}
