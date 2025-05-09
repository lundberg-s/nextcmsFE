import { fetchWithAccessToken } from "./helper";

const API_BASE_URL = "http://localhost:8000/auth";

export const api = {
  auth: {
    login: async (credentials: Credentials): Promise<void> => {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to login");
      }
      
      return response.json();
    },

    refresh: async (): Promise<void> => {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to refresh token");
      }
    },
  },
  user: {
    getUserProfile: async (): Promise<any> => {
      const data = await fetchWithAccessToken(`${API_BASE_URL}/profile`, {
        method: "GET",
      });

      return data;
    }
  },
};