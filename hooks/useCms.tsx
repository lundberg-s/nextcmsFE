import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Block } from "@/types/blocks";
import { Page } from "@/types/page";
import { useState } from "react";

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

  // Block Mutations
  const addBlockMutation = useMutation({
    mutationFn: api.blocks.create,
    onSuccess: (newBlock) => {
      queryClient.setQueryData(["blocks"], (old: Block[] = []) => [
        ...old,
        newBlock,
      ]);
      queryClient.setQueryData(["pages"], (oldPages: Page[] = []) =>
        oldPages.map((page) =>
          page.id === newBlock.pageId
            ? { ...page, blocks: [...page.blocks, newBlock] }
            : page
        )
      );
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
    onSuccess: (updatedBlock) => {
      queryClient.setQueryData(["blocks"], (old: Block[] = []) =>
        old.map((block) =>
          block.id === updatedBlock.id ? updatedBlock : block
        )
      );
      queryClient.setQueryData(["pages"], (oldPages: Page[] = []) =>
        oldPages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === updatedBlock.id ? updatedBlock : block
          ),
        }))
      );
    },
  });

  const removeBlockMutation = useMutation({
    mutationFn: api.blocks.delete,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(["blocks"], (old: Block[] = []) =>
        old.filter((block) => block.id !== deletedId)
      );
      queryClient.setQueryData(["pages"], (oldPages: Page[] = []) =>
        oldPages.map((page) => ({
          ...page,
          blocks: page.blocks.filter((block) => block.id !== deletedId),
        }))
      );
    },
  });

  const updateBlockIndexMutation = useMutation({
    mutationFn: (updatedBlocks: Block[]) =>
      api.blocks.updateOrder(updatedBlocks),
  });

  const updateBlockIndex = (updatedBlocks: Block[]) => {
    const newIndexList = updatedBlocks.map((block, index) => ({
      ...block,
      drag_index: index + 1,
    }));
  
    queryClient.setQueryData(["pages"], (oldPages: Page[] = []) =>
      oldPages.map((page) => ({
        ...page,
        blocks: page.blocks.map((block) =>
          newIndexList.find((b) => b.id === block.id) || block
        ),
      }))
    );
  
    updateBlockIndexMutation.mutate(newIndexList, {
      onError: (_, __, context) => queryClient.setQueryData(["pages"], context),
      onSettled: () => queryClient.invalidateQueries({ queryKey: ["pages"] }),
    });
  };

  // Page Mutations
  const addPageMutation = useMutation({
    mutationFn: api.pages.create,
    onSuccess: (newPage) => {
      queryClient.setQueryData(["pages"], (old: Page[] = []) => [
        ...old,
        newPage,
      ]);
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
    onSuccess: (updatedPage) => {
      queryClient.setQueryData(["pages"], (old: Page[] = []) =>
        old.map((page) =>
          page.id === updatedPage.id ? { ...page, ...updatedPage } : page
        )
      );
    },
  });

  const removePageMutation = useMutation({
    mutationFn: api.pages.delete,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(["pages"], (old: Page[] = []) =>
        old.filter((page) => page.id !== deletedId)
      );
      // Remove associated blocks
      queryClient.setQueryData(["blocks"], (oldBlocks: Block[] = []) =>
        oldBlocks.filter((block) => block.pageId !== deletedId)
      );
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

    // Mutations
    addBlock: addBlockMutation.mutate,
    updateBlock: (id: string, block: Partial<Omit<Block, "id">>) =>
      updateBlockMutation.mutate({ id, block }),
    removeBlock: removeBlockMutation.mutate,
    addPage: addPageMutation.mutate,
    updatePage: (id: string, page: Partial<Omit<Page, "id" | "blocks">>) =>
      updatePageMutation.mutate({ id, page }),
    removePage: removePageMutation.mutate,
    updateBlockIndex,
  };
}
