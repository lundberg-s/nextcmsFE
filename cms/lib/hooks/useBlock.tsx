import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/cms/lib/api";


export function useBlock() {
  const queryClient = useQueryClient();

  function useFilteredBlocks(page: string) {
    return useQuery({
      queryKey: ["blocks", page],
      queryFn: () => api.blocks.getList(page),
      enabled: !!page,
    });
  }

  const addBlockMutation = useMutation({
    mutationFn: api.blocks.create,
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
    }) => api.blocks.update(id, data),
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
      api.blocks.reorder(updatedBlocks),
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
