// lib/store/admin-store.ts
import { create } from "zustand";
import { Block } from "@/types/blocks";
import { Page } from "@/types/page";
import { nanoid } from "nanoid";
import { mockBlocks } from "@/lib/mock-data";

interface AdminState {
  blocks: Block[];
  selectedBlock: Block | null;
  pages: Page[];
  selectedPage: Page | null;
  setBlocks: (blocks: Block[]) => void;
  addBlock: (block: Omit<Block, "id"> & { pageId: string }) => void;
  updateBlock: (id: string, block: Partial<Omit<Block, "id">>) => void;
  removeBlock: (id: string) => void;
  setSelectedBlock: (block: Block | null) => void;
  setPages: (pages: Page[]) => void;
  addPage: (page: Omit<Page, "id" | "blocks">) => void;
  updatePage: (id: string, page: Partial<Omit<Page, "id" | "blocks">>) => void;
  removePage: (id: string) => void;
  setSelectedPage: (page: Page | null) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  blocks: mockBlocks, 
  selectedBlock: null,
  pages: [
    {
      id: nanoid(),
      title: "Home",
      slug: "/",
      blocks: mockBlocks.map((block) => block.id), 
    },
  ],
  selectedPage: null,
  setBlocks: (blocks) => set({ blocks }),
  addBlock: (block) =>
    set((state) => {
      const newBlock = { id: nanoid(), ...block };
      const updatedPages = state.pages.map((page) =>
        page.id === block.pageId
          ? { ...page, blocks: [...page.blocks, newBlock.id] }
          : page
      );
      return {
        blocks: [...state.blocks, newBlock],
        pages: updatedPages,
      };
    }),
  updateBlock: (id, block) =>
    set((state) => ({
      blocks: state.blocks.map((b) => (b.id === id ? { ...b, ...block } : b)),
    })),
  removeBlock: (id) =>
    set((state) => ({
      blocks: state.blocks.filter((b) => b.id !== id),
      pages: state.pages.map((page) => ({
        ...page,
        blocks: page.blocks.filter((blockId) => blockId !== id),
      })),
    })),
  setSelectedBlock: (block) => set({ selectedBlock: block }),
  setPages: (pages) => set({ pages }),
  addPage: (page) =>
    set((state) => ({
      pages: [
        ...state.pages,
        { id: nanoid(), blocks: [], ...page },
      ],
    })),
  updatePage: (id, page) =>
    set((state) => ({
      pages: state.pages.map((p) => (p.id === id ? { ...p, ...page } : p)),
    })),
  removePage: (id) =>
    set((state) => ({
      pages: state.pages.filter((p) => p.id !== id),
      blocks: state.blocks.filter(
        (b) => !state.pages.some((page) => page.blocks.includes(b.id))
      ), 
    })),
  setSelectedPage: (page) => set({ selectedPage: page }),
}));
