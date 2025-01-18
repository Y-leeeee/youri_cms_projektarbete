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
  customFields?: {
    footnotes?: string;
  };
}

interface Project {
  id: number;
  title: {
    rendered: string;
  };
  slug: string;
  customFields?: {
    footnotes?: string;
  };
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
    throw new Error(
      "Something went wrong while fetching data. Please try again."
    );
  }
}

// Fetch all pages
export async function getPages(): Promise<Page[]> {
  try {
    const url = `${API_BASE_URL}/pages`;
    return await fetchData<Page[]>(url);
  } catch (error) {
    console.error("Error in getPages:", error);
    return []; // Return an empty array in case of an error
  }
}

// Fetch a single page by slug
export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const url = `${API_BASE_URL}/pages?slug=${slug}`;
    const pages = await fetchData<Page[]>(url);
    return pages.length > 0 ? pages[0] : null; // Return the first page or null
  } catch (error) {
    console.error("Error in getPageBySlug:", error);
    return null; // Return null if there's an error
  }
}

// Fetch all projects
export async function getProjects(): Promise<Project[]> {
  try {
    const url = `${API_BASE_URL}/projects`;
    return await fetchData<Project[]>(url);
  } catch (error) {
    console.error("Error in getProjects:", error);
    return []; // Return an empty array in case of an error
  }
}

// Fetch a single project by slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const url = `${API_BASE_URL}/projects?slug=${slug}`;
    const projects = await fetchData<Project[]>(url);
    return projects.length > 0 ? projects[0] : null; // Return the first project or null
  } catch (error) {
    console.error("Error in getProjectBySlug:", error);
    return null; // Return null if there's an error
  }
}
