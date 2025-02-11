import { Block } from "@/types/blocks";
import { Page } from "@/types/page";
import { nanoid } from "nanoid";

const API_BASE_URL = "http://localhost:8000/api";

export const api = {
  blocks: {
    getAll: async (): Promise<Block[]> => {
      const response = await fetch(`${API_BASE_URL}/blocks/`);
      return response.json();
    },
    
    create: async (block: Omit<Block, "id"> & { pageId: string }): Promise<Block> => {
      const response = await fetch(`${API_BASE_URL}/blocks/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(block),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response.json();
    },
    
    update: async (id: string, block: Partial<Omit<Block, "id">>): Promise<Block> => {
      const response = await fetch(`${API_BASE_URL}/blocks/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(block),
      });
      return response.json();
    },
    
    delete: async (id: string): Promise<void> => {
      await fetch(`${API_BASE_URL}/blocks/${id}/`, { method: "DELETE" });
    },
  },
  
  pages: {
    getAll: async (): Promise<Page[]> => {
      const response = await fetch(`${API_BASE_URL}/pages/`);
      return response.json();
    },
    
    create: async (page: Omit<Page, "id" | "blocks">): Promise<Page> => {
      const response = await fetch(`${API_BASE_URL}/pages/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: nanoid(), blocks: [], ...page }),
      });
      return response.json();
    },
    
    update: async (id: string, page: Partial<Omit<Page, "id" | "blocks">>): Promise<Page> => {
      const response = await fetch(`${API_BASE_URL}/pages/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(page),
      });
      return response.json();
    },
    
    delete: async (id: string): Promise<void> => {
      await fetch(`${API_BASE_URL}/pages/${id}/`, { method: "DELETE" });
    },
  },
};