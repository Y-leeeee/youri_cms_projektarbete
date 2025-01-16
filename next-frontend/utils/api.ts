const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:8888/cms_projektarbete/wordpress/wp-json/wp/v2";

/**
 * Fetch data for the Contact page
 */
export async function fetchContactData() {
  const response = await fetch(`${API_BASE_URL}/pages?slug=contact`);
  if (!response.ok) {
    throw new Error(`Failed to fetch contact data: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

/**
 * Fetch data for a specific page based on the slug
 */
export async function fetchPageData(slug: string) {
  const response = await fetch(`${API_BASE_URL}/pages?slug=${slug}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch page data: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}
