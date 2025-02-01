import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPages, createPage, updatePage, deletePage } from "@/api/pages";
import { fetchBlocks } from "@/api/blocks";
import { Page } from "@/types/page";

export const usePagesWithBlocks = () => {
  return useQuery({
    queryKey: ["pages"],
    queryFn: async () => {
      const [pages, blocks] = await Promise.all([fetchPages(), fetchBlocks()]);

      return pages.map((page: any) => ({
        ...page,
        blocks: blocks.filter((block: any) => block.pageId === page.id),
      }));
    },
  });
};

export const useAddPage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPage,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pages"] }),
  });
};

export const useUpdatePage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Page> }) =>
      updatePage(id, updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pages"] }),
  });
};

export const useRemovePage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePage,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pages"] }),
  });
};

export const useSelectedPage = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["selectedPage"],
    queryFn: async () => {
      const pages = await fetchPages();
      const selectedPage =
        pages.find((page: any) => page.slug === "home") || null;
      queryClient.setQueryData(["selectedPage"], selectedPage);
      return selectedPage;
    },
  });
};
