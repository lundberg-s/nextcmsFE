import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/lib/api/api";

export function useUser() {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: api.user.getUser,
    staleTime: 1000 * 60 * 5,
  });

  return { user, isLoading, error };
}