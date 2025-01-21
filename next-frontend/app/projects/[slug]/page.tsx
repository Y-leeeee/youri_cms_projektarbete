"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import client from "@/lib/contentful";
import { Entry, EntrySkeletonType } from "contentful";

interface ProjectFields extends EntrySkeletonType {
  fields: {
    title: string;
    description: string;
    slug: string;
  };
  contentTypeId: "project";
}

type ProjectEntry = Entry<ProjectFields>;

export default function ProjectPage() {
  const [project, setProject] = useState<ProjectEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { slug } = useParams() as { slug: string };

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) {
        setError("Project slug is missing.");
        setIsLoading(false);
        return;
      }

      try {
        const res = await client.getEntries<ProjectFields>({
          content_type: "project",
          "fields.slug": slug as string,
        } as any);

        if (!res.items.length) {
          setError("No project found for the given slug.");
          setIsLoading(false);
          return;
        }

        setProject(res.items[0]);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("An error occurred while fetching the project.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!project) {
    return <div>No project data available.</div>;
  }

  const { title, description } = project.fields;

  return (
    <div className="project-page">
      <h1 className="text-2xl font-bold">
        {typeof title === "string" ? title : "Untitled Project"}
      </h1>
      <p className="mt-4">
        {typeof description === "string"
          ? description
          : "No description available."}
      </p>
    </div>
  );
}
