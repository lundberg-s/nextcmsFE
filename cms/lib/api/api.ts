// cmsApi.ts
import { client as http } from "@/shared/lib/api/client";
const API_BASE_URL = "/api/cms";

export const api = {
  block: {
    get: {
      list: (pageId: string): Promise<Block[]> =>
        http.get(`${API_BASE_URL}/pages/${pageId}/blocks/`),

      item: (blockId: string): Promise<Block> =>
        http.get(`${API_BASE_URL}/blocks/${blockId}/`),
    },
    create: (block: Omit<Block, "id"> & { page: string }): Promise<Block> =>
      http.post(`${API_BASE_URL}/blocks/`, block),

    update: (id: string, block: Partial<Omit<Block, "id">>): Promise<Block> =>
      http.put(`${API_BASE_URL}/blocks/${id}/`, block),

    delete: (id: string): Promise<void> =>
      http.delete(`${API_BASE_URL}/blocks/${id}/`),

    reorder: (blocks: Block[]): Promise<Block[]> =>
      http.patch(`${API_BASE_URL}/blocks/order/`, blocks),
  },

  page: {
    get: {
      list: (): Promise<Page[]> =>
        http.get(`${API_BASE_URL}/pages/`),

      item: (id: string): Promise<Page> =>
        http.get(`${API_BASE_URL}/pages/${id}/`),
    },

    create: (page: Omit<Page, "id" | "blocks">): Promise<Page> =>
      http.post(`${API_BASE_URL}/pages/`, page),

    update: (
      id: string,
      page: Partial<Omit<Page, "id" | "blocks">>
    ): Promise<Page> =>
      http.put(`${API_BASE_URL}/pages/${id}/`, page),

    delete: (id: string): Promise<void> =>
      http.delete(`${API_BASE_URL}/pages/${id}/`),
  },
};
