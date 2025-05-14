import { client } from "./client";

const API_BASE_URL = "/api";

export const api = {
  auth: {
    login: (credentials: Credentials): Promise<void> =>
      client.post(`${API_BASE_URL}/login/`, credentials),

    logout: (): Promise<void> =>
      client.post(`${API_BASE_URL}/logout/`, {}),

    register: (userData: UserData): Promise<void> =>
      client.post(`${API_BASE_URL}/register/`, userData),
  },

  user: {
    getUser: (): Promise<any> =>
      client.get(`${API_BASE_URL}/profile/`),
  },
};
