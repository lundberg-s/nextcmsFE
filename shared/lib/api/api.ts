import { apiClient as http } from "./apiClient";

const API_BASE_URL = "/api";

export const api = {
  auth: {
    login: (credentials: Credentials): Promise<void> =>
      http.post(`${API_BASE_URL}/login/`, credentials),

    logout: (): Promise<void> =>
      http.post(`${API_BASE_URL}/logout/`, {}),

    register: (userData: UserData): Promise<void> =>
      http.post(`${API_BASE_URL}/register/`, userData),
  },

  user: {
    getUser: (): Promise<any> =>
      http.get(`${API_BASE_URL}/profile/`),
  },
};
