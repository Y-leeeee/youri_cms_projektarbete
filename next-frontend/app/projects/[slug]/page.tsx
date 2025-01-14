"use client";

import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    async function fetchParamsAndProject() {
      try {
        const resolvedParams = await rawParams;
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

        if (project.acf) {
          if (project.acf.image1) {
            const mediaRes1 = await fetch(
              `http://localhost:8888/cms_projektarbete/wordpress/wp-json/wp/v2/media/${project.acf.image1}`
            );
            const mediaData1 = await mediaRes1.json();
            project.image1 = { url: mediaData1.source_url };
          }

          if (project.acf.image2) {
            const mediaRes2 = await fetch(
              `http://localhost:8888/cms_projektarbete/wordpress/wp-json/wp/v2/media/${project.acf.image2}`
            );
            const mediaData2 = await mediaRes2.json();
            project.image2 = { url: mediaData2.source_url };
          }

          if (project.acf.image3) {
            const mediaRes3 = await fetch(
              `http://localhost:8888/cms_projektarbete/wordpress/wp-json/wp/v2/media/${project.acf.image3}`
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

      {/* Display images if available */}
      <div>
        {project.image1?.url && (
          <img
            src={project.image1.url}
            alt="Image1"
            style={{ maxWidth: "400px", margin: "20px 0" }}
          />
        )}
        {project.image2?.url && (
          <img
            src={project.image2.url}
            alt="Image2"
            style={{ maxWidth: "400px", margin: "20px 0" }}
          />
        )}
        {project.image3?.url && (
          <img
            src={project.image3.url}
            alt="Image3"
            style={{ maxWidth: "400px", margin: "20px 0" }}
          />
        )}
      </div>

      {/* Display Project URL if available */}
      {project.acf?.project_url && (
        <p>
          <a
            href={project.acf.project_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginTop: "20px",
              padding: "10px 15px",
              backgroundColor: "#007BFF",
              color: "#FFF",
              textDecoration: "none",
              borderRadius: "5px",
            }}
          >
            View Live Project
          </a>
        </p>
      )}
    </div>
  );
}
