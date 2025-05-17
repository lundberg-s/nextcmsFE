import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/lib/api/api";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: isAuthenticated,
    isLoading: isAuthLoading,
    refetch: refetchAuthStatus,
  } = useQuery({
    queryKey: ["authStatus"],
    queryFn: async () => {
      const res = await fetch("/api/auth/status", { credentials: "include" });
      const json = await res.json();
      return !!json.authenticated;
    },
    staleTime: 60 * 1000,
    retry: false,
  });

  const {
    mutate: login,
    isPending,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: api.auth.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authStatus"] });
      router.push("/admin");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const {
    mutate: logout,
    isPending: isLogoutPending,
    error: logoutError,
    isSuccess: isLogoutSuccess,
  } = useMutation({
    mutationFn: api.auth.logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authStatus"] });
      queryClient.setQueryData(["user"], null);
      router.push("/");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });

  return {
    login,
    isPending,
    error,
    isSuccess,

    logout,
    isLogoutPending,
    logoutError,
    isLogoutSuccess,

    isAuthenticated,
    isAuthLoading,
    refetchAuthStatus,
  };
}