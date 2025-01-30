import { create } from "zustand";
import { Block } from "@/types/blocks";

interface FrontendState {
  blocks: Block[];
  setBlocks: (blocks: Block[]) => void;
}

export const useFrontendStore = create<FrontendState>((set) => ({
  blocks: [],
  setBlocks: (blocks) => set({ blocks }),
}));
