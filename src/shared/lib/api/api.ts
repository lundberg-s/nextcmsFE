import { client } from "./client";
import { ssg } from "./ssg";


const API_BASE_URL = "/api";
const API_CMS_URL = "/api/cms";

export const api = {
  auth: {
    login: (credentials: Credentials): Promise<void> =>
      client.post(`${API_BASE_URL}/login/`, credentials),

    logout: (): Promise<void> =>
      client.post(`${API_BASE_URL}/logout/`, {}),

    register: (userData: User): Promise<void> =>
      client.post(`${API_BASE_URL}/register/`, userData),
  },

  user: {
    get: (): Promise<any> =>
      client.get(`${API_BASE_URL}/user/me/`),
  },
  pages: {
    get: {
      list: (): Promise<Page[]> =>
        ssg.get<Page[]>(`${API_CMS_URL}/pages`),
      item: (slug: string): Promise<Page | null> =>
        ssg.get<Page | null>(`${API_CMS_URL}/pages/slug/${slug}`),
    },
  },
};
