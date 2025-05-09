

import { nanoid } from "nanoid";

const API_BASE_URL = "http://localhost:8000/cms";

export const api = {
  blocks: {
    getList: async (id: string): Promise<Block[]> => {
      const response = await fetch(`${API_BASE_URL}/pages/${id}/blocks/`);
      const data = await response.json();
      return data;
    },

    getItem: async (id: string): Promise<Block> => {
      const response = await fetch(`${API_BASE_URL}/blocks/${id}/`);
      const data = await response.json();
      return data;
    },

    create: async (
      block: Omit<Block, "id"> & { page: string }
    ): Promise<Block> => {
      const response = await fetch(`${API_BASE_URL}/blocks/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(block),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    },

    update: async (
      id: string,
      block: Partial<Omit<Block, "id">>
    ): Promise<Block> => {
      const response = await fetch(`${API_BASE_URL}/blocks/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(block),
      });
      const data = await response.json();
      return data;
    },

    delete: async (id: string): Promise<void> => {
      await fetch(`${API_BASE_URL}/blocks/${id}/`, { method: "DELETE" });
    },

    reorder: async (blocks: Block[]): Promise<Block[]> => {
      const response = await fetch(`${API_BASE_URL}/blocks/order/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blocks),
      });
      const data = await response.json();
      return data;
    },
  },

  pages: {
    getList: async (): Promise<Page[]> => {
      const response = await fetch(`${API_BASE_URL}/pages/`);
      const data = await response.json();
      return data;
    },

    create: async (page: Omit<Page, "id" | "blocks">): Promise<Page> => {
      const response = await fetch(`${API_BASE_URL}/pages/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify((page)),
      });
      const data = await response.json();
      return data;
    },

    update: async (
      id: string,
      page: Partial<Omit<Page, "id" | "blocks">>
    ): Promise<Page> => {
      const response = await fetch(`${API_BASE_URL}/pages/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(page),
      });
      const data = await response.json();
      return data;
    },

    delete: async (id: string): Promise<void> => {
      await fetch(`${API_BASE_URL}/pages/${id}/`, { method: "DELETE" });
    },
  },
};
