const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Page {
  id: number;
  title: {
    rendered: string;
  };
  content?: {
    rendered: string;
  };
  slug: string;
  [key: string]: any;
}

interface Project {
  id: number;
  title: {
    rendered: string;
  };
  slug: string;
  [key: string]: any;
}

export async function getPages(): Promise<Page[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/pages`);
    if (!response.ok) {
      throw new Error(`Failed to fetch pages: ${response.statusText}`);
    }
    const pages: Page[] = await response.json();
    return pages;
  } catch (error) {
    console.error("Error fetching pages:", error);
    return [];
  }
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/pages?slug=${slug}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch page: ${response.statusText}`);
    }
    const pages: Page[] = await response.json();
    return pages.length > 0 ? pages[0] : null;
  } catch (error) {
    console.error("Error fetching page by slug:", error);
    return null;
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`);
    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }
    const projects: Project[] = await response.json();
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/projects?slug=${slug}`);
    if (!response.ok) {
      throw new Error("Failed to fetch project by slug");
    }
    const projects: Project[] = await response.json();
    return projects.length > 0 ? projects[0] : null;
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    return null;
  }
}

export { getPages, getPageBySlug, getProjects, getProjectBySlug };
