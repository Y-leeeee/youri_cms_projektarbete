"use client";

import React, { useEffect, useState } from "react";

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(
          `http://localhost:8888/cms_projektarbete/wordpress/wp-json/wp/v2/projects?slug=${params.slug}`
        );

        if (!res.ok) {
          console.error("Failed to fetch project:", res.status, res.statusText);
          return;
        }

        const projectData = await res.json();
        console.log("Client project data:", projectData);
        setProject(projectData[0]); // WordPress returns an array for slugs
      } catch (error) {
        console.error("Unexpected error fetching project:", error);
      }
    }

    fetchProject();
  }, [params.slug]);

  if (!project) {
    return <div>Loading project...</div>;
  }

  return (
    <div>
      <h1>{project.title?.rendered || "No Title Available"}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: project.content?.rendered || "No content available",
        }}
      />
    </div>
  );
}
