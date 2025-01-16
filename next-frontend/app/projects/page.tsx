"use client";

import React, { useEffect, useState } from "react";
import MainMenu from "../components/MainMenu";

interface Project {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  featured_media: number | null;
  imageUrl?: string | null;
  link?: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(
          "http://localhost:8888/cms_projektarbete/wordpress/wp-json/wp/v2/categories"
        );

        if (!res.ok) {
          console.error(
            "Failed to fetch categories:",
            res.status,
            res.statusText
          );
          return;
        }

        const categoriesData: Category[] = await res.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Unexpected error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  // Fetch projects
  useEffect(() => {
    async function fetchProjects() {
      setIsLoading(true);
      try {
        const url = selectedCategory
          ? `http://localhost:8888/cms_projektarbete/wordpress/wp-json/wp/v2/projects?categories=${selectedCategory}`
          : "http://localhost:8888/cms_projektarbete/wordpress/wp-json/wp/v2/projects";

        const res = await fetch(url);

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
                project.imageUrl = mediaData?.source_url || null;
              } catch (error) {
                console.error(
                  `Failed to fetch media for project ID ${project.id}:`,
                  error
                );
                project.imageUrl = null;
              }
            } else {
              project.imageUrl = null;
            }
            return project;
          })
        );

        setProjects(projectsWithImages);
      } catch (error) {
        console.error("Unexpected error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, [selectedCategory]);

  return (
    <div className="projects-page">
      <MainMenu />
      <h1 className="page-title">Projects</h1>

      {/* Category Filter */}
      <div className="category-filter">
        <label htmlFor="category">Filter by Category:</label>
        <select
          id="category"
          value={selectedCategory || ""}
          onChange={
            (e) => setSelectedCategory(e.target.value || null) // Set null if "All Categories" is selected
          }
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Projects List */}
      {isLoading ? (
        <div>Loading projects...</div>
      ) : (
        <div className="projects-grid">
          {projects.length === 0 ? (
            <div>No projects found</div>
          ) : (
            projects.map((project) => (
              <article key={project.id} className="project-card">
                <h2 className="project-title">
                  <a href={`/projects/${project.slug}`}>
                    {project.title.rendered || "No Title Available"}
                  </a>
                </h2>
                <p className="project-description">
                  {project.content.rendered.replace(/<[^>]+>/g, "") ||
                    "No Description Available"}
                </p>
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title.rendered || "Project Image"}
                    className="project-image"
                  />
                ) : (
                  <p>No Image Available</p>
                )}
              </article>
            ))
          )}
        </div>
      )}
    </div>
  );
}
