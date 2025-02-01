const API_BASE_URL = "http://localhost:8000/api";
import { Page } from "@/types/page";

// Fetch all pages
export const fetchPages = async () => {
  const response = await fetch(`${API_BASE_URL}/pages/`);
  if (!response.ok) throw new Error("Failed to fetch pages");
  return response.json();
};

// Add a new page
export const createPage = async (page: { title: string }) => {
  const response = await fetch(`${API_BASE_URL}/pages/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(page),
  });
  if (!response.ok) throw new Error("Failed to add page");
  return response.json();
};

// Update a page
export const updatePage = async (id: string, updates: Partial<Page>) => {
  const response = await fetch(`${API_BASE_URL}/pages/${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error("Failed to update page");
  return response.json();
};

// Remove a page
export const deletePage = async (id: string) => {
  await fetch(`${API_BASE_URL}/pages/${id}/`, { method: "DELETE" });
};
