import { useMutation } from "@tanstack/react-query";
import { api } from "@/shared/lib/api/route";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();

  const {
    mutate: login,
    status: isLoading,
    error: loginError,
    isSuccess: isLoginSuccessful,
  } = useMutation({
    mutationFn: api.auth.login,
    onSuccess: () => {
      router.push("/admin");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  return {
    login,
    isLoading,
    loginError,
    isLoginSuccessful, 
  };
}