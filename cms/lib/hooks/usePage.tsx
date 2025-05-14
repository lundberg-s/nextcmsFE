import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/cms/lib/api/api";


export function usePage() {
  const queryClient = useQueryClient();

  const {
    data: pages = [],
    isLoading: isLoadingPages,
    error: pagesError,
  } = useQuery({
    queryKey: ["pages"],
    queryFn: api.page.get.list,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });


  const addPageMutation = useMutation({
    mutationFn: api.page.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });

  const updatePageMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Omit<Page, "id" | "blocks">>;
    }) => api.page.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });

  const removePageMutation = useMutation({
    mutationFn: api.page.delete,
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