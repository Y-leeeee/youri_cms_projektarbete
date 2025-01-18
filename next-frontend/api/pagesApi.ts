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

// Utility function for fetching data
async function fetchData<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Request failed with status ${response.status}: ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error; // Rethrow the error for higher-level handling if needed
  }
}

// Fetch all pages
export async function getPages(): Promise<Page[]> {
  try {
    const url = `${API_BASE_URL}/pages`;
    return await fetchData<Page[]>(url);
  } catch (error) {
    console.error("Error in getPages:", error);
    return [];
  }
}

// Fetch a single page by slug
export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const url = `${API_BASE_URL}/pages?slug=${slug}`;
    const pages = await fetchData<Page[]>(url);
    return pages.length > 0 ? pages[0] : null;
  } catch (error) {
    console.error("Error in getPageBySlug:", error);
    return null;
  }
}

// Fetch all projects
export async function getProjects(): Promise<Project[]> {
  try {
    const url = `${API_BASE_URL}/projects`;
    return await fetchData<Project[]>(url);
  } catch (error) {
    console.error("Error in getProjects:", error);
    return [];
  }
}

// Fetch a single project by slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const url = `${API_BASE_URL}/projects?slug=${slug}`;
    const projects = await fetchData<Project[]>(url);
    return projects.length > 0 ? projects[0] : null;
  } catch (error) {
    console.error("Error in getProjectBySlug:", error);
    return null;
  }
}
