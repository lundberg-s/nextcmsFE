import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Page } from "@/lib/types/page";

export function usePages() {
  const queryClient = useQueryClient();

  // Query
  const {
    data: pages = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pages"],
    queryFn: api.pages.getAll,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  // Mutations
  const addMutation = useMutation({
    mutationFn: api.pages.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });

  const updateMutation = useMutation({
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

  const removeMutation = useMutation({
    mutationFn: api.pages.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });

  return {
    // Data
    pages,
    isLoading,
    error,

    // Actions
    add: addMutation.mutate,
    update: (id: string, page: Partial<Omit<Page, "id" | "blocks">>) =>
      updateMutation.mutate({ id, page }),
    remove: removeMutation.mutate,
    
    // Mutation states (if needed)
    isAdding: addMutation.isPending,
    isUpdating: updateMutation.isPending,
    isRemoving: removeMutation.isPending,
  };
}