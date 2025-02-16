import { ReactNode } from 'react'
import { create } from 'zustand'

interface SidebarStore {
  content: ReactNode | null
  setContent: (content: ReactNode) => void
}

export const useSidebarContentStore = create<SidebarStore>((set) => ({
  content: null,
  setContent: (content) => set({ content }),
}))
