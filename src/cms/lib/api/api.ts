import { client } from "@/shared/lib/services/apiService";

const CMS_URL = "cms";

export const api = {
  block: {
    get: {
      list: (pageId: string): Promise<Block[]> =>
        client.get(`${CMS_URL}/pages/${pageId}/blocks/`),

      item: (blockId: string): Promise<Block> =>
        client.get(`${CMS_URL}/blocks/${blockId}/`),
    },
    create: (block: Omit<Block, "id"> & { page: string }): Promise<Block> =>
      client.post(`${CMS_URL}/blocks/`, block),

    update: (id: string, block: Partial<Omit<Block, "id">>): Promise<Block> =>
      client.put(`${CMS_URL}/blocks/${id}/`, block),

    delete: (id: string): Promise<void> =>
      client.delete(`${CMS_URL}/blocks/${id}/`),

    reorder: (blocks: Block[]): Promise<Block[]> =>
      client.patch(`${CMS_URL}/blocks/order/`, blocks),
  },

  page: {
    get: {
      list: (): Promise<Page[]> =>
        client.get(`${CMS_URL}/pages/`),

      item: (id: string): Promise<Page> =>
        client.get(`${CMS_URL}/pages/${id}/`),
    },

    create: (page: Omit<Page, "id" | "blocks">): Promise<Page> =>
      client.post(`${CMS_URL}/pages/`, page),

    update: (
      id: string,
      page: Partial<Omit<Page, "id" | "blocks">>
    ): Promise<Page> =>
      client.put(`${CMS_URL}/pages/${id}/`, page),

    delete: (id: string): Promise<void> =>
      client.delete(`${CMS_URL}/pages/${id}/`),
  },
};
