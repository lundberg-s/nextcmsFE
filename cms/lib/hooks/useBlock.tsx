import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/cms/lib/api/api";


export function useBlock() {
  const queryClient = useQueryClient();

  function useFilteredBlocks(page: string) {
    return useQuery({
      queryKey: ["blocks", page],
      queryFn: () => api.block.get.list(page),
      enabled: !!page,
    });
  }

  const addBlockMutation = useMutation({
    mutationFn: api.block.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
    },
  });

  const updateBlockMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Omit<Block, "id">>;
    }) => api.block.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
    },
  });

  const removeBlockMutation = useMutation({
    mutationFn: api.block.delete,
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
    },
  });

  const updateBlockIndexMutation = useMutation({
    mutationFn: (updatedBlocks: Block[]) =>
      api.block.reorder(updatedBlocks),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
    },
  });

  return {
    useFilteredBlocks,
    addBlock: addBlockMutation.mutate,
    updateBlock: updateBlockMutation.mutate,
    removeBlock: removeBlockMutation.mutate,
    updateIndex: updateBlockIndexMutation.mutate,
  };
}
