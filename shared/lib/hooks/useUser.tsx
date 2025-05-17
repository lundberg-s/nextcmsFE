import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/lib/api/api";
import { hasRefreshToken } from "../utilities/checkToken";

export function useUser() {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: api.user.get,
    staleTime: 1000 * 60 * 5,
    enabled: hasRefreshToken(),
  });

  return { user, isLoading, error };
}