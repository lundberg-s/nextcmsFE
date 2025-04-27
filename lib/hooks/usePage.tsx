import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Page } from "@/lib/types/page";

export function usePage() {
  const queryClient = useQueryClient();

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
    },
  });

  return {
    pages,
    isLoadingPages,
    pagesError,
    addPage: addPageMutation.mutate,
    updatePage: updatePageMutation.mutate,
    removePage: removePageMutation.mutate,
  };
}