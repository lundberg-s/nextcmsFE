import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Block } from "@/lib/types/blocks";

export function useBlocks() {
  const queryClient = useQueryClient();

  // Query
  const {
    data: blocks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blocks"],
    queryFn: api.blocks.getAll,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  // Helper
  const getBlockById = (id: string) => {
    return blocks.find((block) => block.id === id);
  };

  // Mutations
  const addMutation = useMutation({
    mutationFn: api.blocks.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });

  const updateMutation = useMutation({
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

  const removeMutation = useMutation({
    mutationFn: api.blocks.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });

  const updateOrderMutation = useMutation({
    mutationFn: (updatedBlocks: Block[]) =>
      api.blocks.updateOrder(updatedBlocks),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });

  return {
    // Data
    blocks,
    isLoading,
    error,
    getBlockById,

    // Actions
    add: addMutation.mutate,
    update: (id: string, block: Partial<Omit<Block, "id">>) =>
      updateMutation.mutate({ id, block }),
    remove: removeMutation.mutate,
    updateOrder: updateOrderMutation.mutate,
    
    // Mutation states (if needed)
    isAdding: addMutation.isPending,
    isUpdating: updateMutation.isPending,
    isRemoving: removeMutation.isPending,
    isReordering: updateOrderMutation.isPending,
  };
}