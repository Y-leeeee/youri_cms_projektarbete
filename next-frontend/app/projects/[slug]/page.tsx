"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
  [key: string]: unknown; // Allow dynamic properties
}

export default function ProjectPage({
  params: _params, // Prefixed with an underscore to indicate it's unused
}: {
  params: Promise<{ slug: string }>;
}) {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchProject() {
      try {
        const resolvedParams = await _params;

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

        // Fetch image URLs
        if (project.acf) {
          const imageFetchPromises = ["image1", "image2", "image3"].map(
            async (key) => {
              const acfKey = key as keyof typeof project.acf;
              if (project.acf && project.acf[acfKey]) {
                const mediaRes = await fetch(
                  `${API_BASE_URL}/media/${project.acf[acfKey]}`
                );
                const mediaData = await mediaRes.json();

                if (typeof mediaData.source_url === "string") {
                  project[key as keyof Project] = { url: mediaData.source_url }; // Type-safe assignment
                } else {
                  console.warn(
                    `Invalid media URL for ${key}:`,
                    mediaData.source_url
                  );
                }
              }
            }
          );

          await Promise.all(imageFetchPromises);
        }

        setProject(project);
      } catch (error) {
        console.error("Unexpected error fetching project:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProject();
  }, [_params]);

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
      <div className="project-images grid grid-cols-1 md:grid-cols-3 gap-4">
        {project.image1?.url && (
          <div className="relative w-full h-64">
            <Image
              src={project.image1.url}
              alt="Project Image 1"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        )}
        {project.image2?.url && (
          <div className="relative w-full h-64">
            <Image
              src={project.image2.url}
              alt="Project Image 2"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        )}
        {project.image3?.url && (
          <div className="relative w-full h-64">
            <Image
              src={project.image3.url}
              alt="Project Image 3"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Display Project URL */}
      {project.acf?.project_url && (
        <a
          href={project.acf.project_url}
          className="project-link text-blue-500 hover:underline mt-4 block"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Live Project
        </a>
      )}

      {/* Back to Projects Button */}
      <button
        className="back-button mt-6 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => router.push("/projects")}
      >
        Go Back to Projects
      </button>
    </div>
  );
}
