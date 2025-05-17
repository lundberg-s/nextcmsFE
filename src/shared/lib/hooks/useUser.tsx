import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/lib/api/api";
import { useAuth } from "@/shared/lib/hooks/useAuth";

export function useUser() {
    const { isAuthenticated, isAuthLoading } = useAuth();

  const { data: user, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: api.user.get,
    enabled: !!isAuthenticated && !isAuthLoading,
  });

  return { user, isLoading, error };
}