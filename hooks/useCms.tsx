import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Block } from "@/types/blocks";
import { Page } from "@/types/page";
import { useState } from "react";

export function useCms() {
  const queryClient = useQueryClient();
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);

  // Queries
  const {
    data: blocks = [],
    isLoading: isLoadingBlocks,
    error: blocksError,
  } = useQuery({
    queryKey: ["blocks"],
    queryFn: api.blocks.getAll,
  });

  const {
    data: pages = [],
    isLoading: isLoadingPages,
    error: pagesError,
  } = useQuery({
    queryKey: ["pages"],
    queryFn: api.pages.getAll,
  });

  // Block Mutations
  const addBlockMutation = useMutation({
    mutationFn: api.blocks.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });

  const updateBlockMutation = useMutation({
    mutationFn: ({ id, block }: { id: string; block: Partial<Omit<Block, "id">> }) =>
      api.blocks.update(id, block),
    onSuccess: () => {
      console.log("Block Updated");
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });

  const removeBlockMutation = useMutation({
    mutationFn: api.blocks.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
      queryClient.invalidateQueries({ queryKey: ["pages"] });
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
    mutationFn: ({ id, page }: { id: string; page: Partial<Omit<Page, "id" | "blocks">> }) =>
      api.pages.update(id, page),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });

  const removePageMutation = useMutation({
    mutationFn: api.pages.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
    },
  });

  return {
    // Data
    blocks,
    pages,
    selectedBlock,
    selectedPage,
    
    // Loading States
    isLoadingBlocks,
    isLoadingPages,
    
    // Errors
    blocksError,
    pagesError,
    
    // Mutations
    addBlock: addBlockMutation.mutate,
    updateBlock: (id: string, block: Partial<Omit<Block, "id">>) =>
      updateBlockMutation.mutate({ id, block }),
    removeBlock: removeBlockMutation.mutate,
    addPage: addPageMutation.mutate,
    updatePage: (id: string, page: Partial<Omit<Page, "id" | "blocks">>) =>
      updatePageMutation.mutate({ id, page }),
    removePage: removePageMutation.mutate,
    
    // Selections
    setSelectedBlock,
    setSelectedPage,
  };
}

export default useCms