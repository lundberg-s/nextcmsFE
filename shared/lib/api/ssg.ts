
const API_URL = "http://localhost:8000/api/cms";

export async function getAllPages(): Promise<Page[]> {
  const response = await fetch(`${API_URL}/pages`, { next: { revalidate } });
  
  if (!response.ok) {
    throw new Error("Failed to fetch pages");
  }
  
  return response.json();
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const response = await fetch(`${API_URL}/pages/${slug}`, { next: { revalidate } });
  
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error("Failed to fetch page");
  }
  
  return response.json();
}

const revalidate = 60;