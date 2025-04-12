import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Block } from "@/lib/types/blocks";
import { Page } from "@/lib/types/page";
import { get } from "node:http";

export function useCms(pageId?: string) {
  const queryClient = useQueryClient();

  // Queries
  const usePageBlocks = (id: string) => {
    const getBlockListQuery = useQuery({
      queryKey: ["blocks", id],
      queryFn: () => api.blocks.getBlockList(id),
    });
  return getBlockListQuery;
  };

  const {
    data: pages = [],
    isLoading: isLoadingPages,
    error: pagesError,
  } = useQuery({
    queryKey: ["pages"],
    queryFn: api.pages.getAll,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });


  // Block Mutations
  const addBlockMutation = useMutation({
    mutationFn: api.blocks.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
    },
  });

  const updateBlockMutation = useMutation({
    mutationFn: ({
      id,
      block,
    }: {
      id: string;
      block: Partial<Omit<Block, "id">>;
    }) => api.blocks.update(id, block),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
    },
  });

  const removeBlockMutation = useMutation({
    mutationFn: api.blocks.delete,
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
    },
  });

  const updateBlockIndexMutation = useMutation({
    mutationFn: (updatedBlocks: Block[]) =>
      api.blocks.updateOrder(updatedBlocks),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
    },
  });


  // Page Mutations
  const addPageMutation = useMutation({
    mutationFn: api.pages.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });

  const updatePageMutation = useMutation({
    mutationFn: ({
      id,
      page,
    }: {
      id: string;
      page: Partial<Omit<Page, "id" | "blocks">>;
    }) => api.pages.update(id, page),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });

  const removePageMutation = useMutation({
    mutationFn: api.pages.delete,
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
    },
  });

  return {

    pages,

    isLoadingPages,

    pagesError,

    usePageBlocks,

    // Mutations
    addBlock: addBlockMutation.mutate,
    updateBlock: (id: string, block: Partial<Omit<Block, "id">>) =>
      updateBlockMutation.mutate({ id, block }),

    removeBlock: removeBlockMutation.mutate,
    addPage: addPageMutation.mutate,

    updatePage: (id: string, page: Partial<Omit<Page, "id" | "blocks">>) =>
      updatePageMutation.mutate({ id, page }),
    
    removePage: removePageMutation.mutate,
    updateIndex: updateBlockIndexMutation,
  };
}
