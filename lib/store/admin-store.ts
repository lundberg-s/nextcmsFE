import { create } from "zustand";
import { Block } from "@/types/blocks";
import { Page } from "@/types/page";
import { nanoid } from "nanoid";

interface AdminState {
  blocks: Block[];
  pages: Page[];
  selectedBlock: Block | null;
  setSelectedBlock: (block: Block | null) => void;
  selectedPage: Page | null;
  setSelectedPage: (page: Page | null) => void;
  getBlocks: () => Promise<void>;
  getPages: () => Promise<void>;
  addBlock: (block: Omit<Block, "id"> & { pageId: string }) => Promise<void>;
  updateBlock: (id: string, block: Partial<Omit<Block, "id">>) => Promise<void>;
  removeBlock: (id: string) => Promise<void>;
  addPage: (page: Omit<Page, "id" | "blocks">) => Promise<void>;
  updatePage: (id: string, page: Partial<Omit<Page, "id" | "blocks">>) => Promise<void>;
  removePage: (id: string) => Promise<void>;
}

const API_BASE_URL = "http://localhost:8000/api";

export const useAdminStore = create<AdminState>((set, get) => ({
  blocks: [],
  selectedBlock: null,
  pages: [],
  selectedPage: null,

  // Fetch blocks from API
  getBlocks: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/blocks/`);
      const data = await response.json();
      set({ blocks: data });
  
      set((state) => ({
        pages: state.pages.map((page) => ({
          ...page,
          blocks: data.filter((block: { pageId: string; }) => block.pageId === page.id),
        })),
      }));
    } catch (error) {
      console.error("Error fetching blocks:", error);
    }
  },

  // Fetch pages from API
  getPages: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/pages/`);
      const data = await response.json();
      set({ pages: data });
      await get().getBlocks();
    } catch (error) {
      console.error("Error fetching pages:", error);
    }
  },

  // Add a new block
  addBlock: async (block) => {
    try { 
      const response = await fetch(`${API_BASE_URL}/blocks/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(block),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const newBlock = await response.json();
      set((state) => {
        const updatedPages = state.pages.map((page) =>
          page.id === block.pageId ? { ...page, blocks: [...page.blocks, newBlock] } : page
        );
        return {
          blocks: [...state.blocks, newBlock],
          pages: updatedPages,
        };
      });
    } catch (error) {
      console.error("Error adding block:", error);
    }
  },


  updateBlock: async (id, block) => {
    try {
      const response = await fetch(`${API_BASE_URL}/blocks/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(block),
      });
      const updatedBlock = await response.json();
  
      set((state) => {
        const updatedBlocks = state.blocks.map((block) => (block.id === id ? updatedBlock : block));
        const updatedPages = state.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) => (block.id === id ? updatedBlock : block)),
        }));
  
        return {
          blocks: updatedBlocks,
          pages: updatedPages,
        };
      });
    } catch (error) {
      console.error("Error updating block:", error);
    }
  },

  // Remove a block
  removeBlock: async (id) => {
    try {
      await fetch(`${API_BASE_URL}/blocks/${id}/`, { method: "DELETE" });
  
      set((state) => {
        const updatedBlocks = state.blocks.filter((block) => block.id !== id);
        const updatedPages = state.pages.map((page) => ({
          ...page,
          blocks: page.blocks.filter((block) => block.id !== id),
        }));
  
        return {
          blocks: updatedBlocks,
          pages: updatedPages,
        };
      });

    } catch (error) {
      console.error("Error removing block:", error);
    }
  },

  // Set selected block
  setSelectedBlock: (block) => set({ selectedBlock: block }),

  // Add a new page
  addPage: async (page) => {
    try {
      const response = await fetch(`${API_BASE_URL}/pages/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: nanoid(), blocks: [], ...page }),
      });
      const newPage = await response.json();

      set((state) => ({ pages: [...state.pages, newPage] }));
    } catch (error) {
      console.error("Error adding page:", error);
    }
  },

  // Update an existing page
  updatePage: async (id, page) => {
    try {
      const response = await fetch(`${API_BASE_URL}/pages/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(page),
      });
      const updatedPage = await response.json();

      set((state) => ({
        pages: state.pages.map((p) => (p.id === id ? { ...p, ...updatedPage } : p)),
      }));
    } catch (error) {
      console.error("Error updating page:", error);
    }
  },

  // Remove a page
  removePage: async (id) => {
    try {
      await fetch(`${API_BASE_URL}/pages/${id}/`, { method: "DELETE" });

      set((state) => ({
        pages: state.pages.filter((p) => p.id !== id),
        blocks: state.blocks.filter(
          (b) => !state.pages.some((page) => page.blocks.includes(b.id))
        ),
      }));
    } catch (error) {
      console.error("Error removing page:", error);
    }
  },

  // Set selected page
  setSelectedPage: (page) => set({ selectedPage: page }),
}));
