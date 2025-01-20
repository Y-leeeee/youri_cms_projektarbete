"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import client from "@/lib/contentful";
import { Entry, EntrySkeletonType } from "contentful";

interface ProjectFields extends EntrySkeletonType {
  title: string;
  description: string;
  slug: string;
  projectUrl?: string;
  image1?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  image2?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  image3?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
}

type ProjectEntry = Entry<ProjectFields>;

export default function ProjectPage() {
  const [project, setProject] = useState<ProjectFields | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { slug } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (!slug) {
          throw new Error("Project slug is missing.");
        }

        const res = await client.getEntries<ProjectFields>({
          content_type: "project",
          "fields.slug": slug,
        });

        if (!res.items.length) {
          throw new Error("No project found for the given slug.");
        }

        setProject(res.items[0].fields as unknown as ProjectFields);
      } catch (err: unknown) {
        console.error("Error fetching project:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred."
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchProject();
    }
  }, [slug]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!project) {
    return <div>No project data found.</div>;
  }

  return (
    <div className="project-page">
      <h1>{project.title}</h1>
      <p>{project.description}</p>

      {/* Display images */}
      <div className="project-images grid grid-cols-1 md:grid-cols-3 gap-4">
        {project.image1 && (
          <div className="relative w-full h-64">
            <Image
              src={`https:${project.image1.fields.file.url}`}
              alt="Project Image 1"
              layout="responsive"
              width={600}
              height={400}
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        )}
        {project.image2 && (
          <div className="relative w-full h-64">
            <Image
              src={`https:${project.image2.fields.file.url}`}
              alt="Project Image 2"
              layout="responsive"
              width={600}
              height={400}
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        )}
        {project.image3 && (
          <div className="relative w-full h-64">
            <Image
              src={`https:${project.image3.fields.file.url}`}
              alt="Project Image 3"
              layout="responsive"
              width={600}
              height={400}
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Display Project URL */}
      {project.projectUrl && (
        <a
          href={project.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline mt-4 block"
        >
          View Project
        </a>
      )}

      <button
        onClick={() => router.push("/projects")}
        className="back-button mt-6 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Back to Projects
      </button>
    </div>
  );
}
