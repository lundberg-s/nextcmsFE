import { useMutation } from "@tanstack/react-query";
import { api } from "@/shared/lib/api/api";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();

  const {
    mutate: login,
    isPending,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: api.auth.login,
    onSuccess: () => {
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
  };
}
