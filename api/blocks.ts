const API_BASE_URL = "http://localhost:8000/api";
import { Block } from "@/types/blocks";

// Fetch all blocks
export const fetchBlocks = async () => {
  const response = await fetch(`${API_BASE_URL}/blocks/`);
  if (!response.ok) throw new Error("Failed to fetch blocks");
  return response.json();
};

// Add a new block
export const createBlock = async (block: { pageId: string; content: string }) => {
  const response = await fetch(`${API_BASE_URL}/blocks/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(block),
  });
  if (!response.ok) throw new Error("Failed to add block");
  return response.json();
};

// Update a block
export const updateBlock = async (id: string, updates: Partial<Block>) => {
  const response = await fetch(`${API_BASE_URL}/blocks/${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error("Failed to update block");
  return response.json();
};

// Remove a block
export const deleteBlock = async (id: string) => {
  await fetch(`${API_BASE_URL}/blocks/${id}/`, { method: "DELETE" });
};
