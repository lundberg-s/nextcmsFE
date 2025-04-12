import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Block } from "@/lib/types/blocks";

export function 
useBlock() {
  const queryClient = useQueryClient();

  const filteredBlocks = (pageId: string) => {
    const getBlockListQuery = useQuery({
      queryKey: ["blocks", pageId],
      queryFn: () => api.blocks.getBlockList(pageId),
    });
  return getBlockListQuery;
  };

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

  return {
    filteredBlocks,
    addBlock: addBlockMutation.mutate,
    updateBlock: updateBlockMutation.mutate,
    removeBlock: removeBlockMutation.mutate,
    updateIndex: updateBlockIndexMutation.mutate,
  };
}