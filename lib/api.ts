import { Block } from "@/types/blocks";
import { Page } from "@/types/page";
import { nanoid } from "nanoid";

const API_BASE_URL = "http://localhost:8000/api";

export const api = {
  blocks: {
    getAll: async (): Promise<Block[]> => {
      const response = await fetch(`${API_BASE_URL}/blocks/`);
      const data = await response.json();
      return data;
    },

    getBlock: async (id: string): Promise<Block> => {
      const response = await fetch(`${API_BASE_URL}/blocks/${id}/`);
      const data = await response.json();
      return data;
    },

    create: async (
      block: Omit<Block, "id"> & { pageId: string }
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

    updateOrder: async (blocks: Block[]): Promise<Block[]> => {
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
    getAll: async (): Promise<Page[]> => {
      const response = await fetch(`${API_BASE_URL}/pages/`);
      const data = await response.json();
      return data;
    },

    create: async (page: Omit<Page, "id" | "blocks">): Promise<Page> => {
      const response = await fetch(`${API_BASE_URL}/pages/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: nanoid(), blocks: [], ...page }),
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
