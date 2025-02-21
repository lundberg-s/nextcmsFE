import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Block } from "@/types/blocks";
import { Page } from "@/types/page";

export function useCms() {
  const queryClient = useQueryClient();

  // Queries
  const {
    data: blocks = [],
    isLoading: isLoadingBlocks,
    error: blocksError,
  } = useQuery({
    queryKey: ["blocks"],
    queryFn: api.blocks.getAll,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

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


  const getBlockById = (id: string) => {
    return blocks.find((block) => block.id === id);
  };

  // Block Mutations
  const addBlockMutation = useMutation({
    mutationFn: api.blocks.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
      queryClient.invalidateQueries({ queryKey: ["pages"] });
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
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });

  const removeBlockMutation = useMutation({
    mutationFn: api.blocks.delete,
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });

  const updateBlockIndexMutation = useMutation({
    mutationFn: (updatedBlocks: Block[]) =>
      api.blocks.updateOrder(updatedBlocks),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });

  // const updateBlockIndex = (updatedBlocks: Block[]) => {
  //   updateBlockIndexMutation.mutate(updatedBlocks);
  // };

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
    // Data
    blocks,
    pages,

    // Loading States
    isLoadingBlocks,
    isLoadingPages,

    // Errors
    blocksError,
    pagesError,

    getBlockById,

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
