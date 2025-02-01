import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchBlocks, createBlock, updateBlock, deleteBlock } from "@/api/blocks";
import { Block } from "@/types/blocks";

export const useBlocks = () => {
  return useQuery({ queryKey: ["blocks"], queryFn: fetchBlocks });
};

export const useAddBlock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBlock,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blocks"] }),
  });
};

export const useUpdateBlock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Block> }) => updateBlock(id, updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blocks"] }),
  });
};

export const useRemoveBlock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBlock,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blocks"] }),
  });
};
