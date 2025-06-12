import { client, ssg } from "@/shared/lib/services/apiService";

const CMS_URL = "cms";
const USER_URL = "user";

export const api = {
  auth: {
    login: (credentials: Credentials): Promise<void> =>
      client.post(`login/`, credentials),

    logout: (): Promise<void> =>
      client.post(`logout/`, {}),

    register: (userData: User): Promise<void> =>
      client.post(`register/`, userData),
  },

  user: {
    get: (): Promise<any> =>
      client.get(`${USER_URL}/me/`),
  },
  
  pages: {
    get: {
      list: (): Promise<Page[]> =>
        ssg.get<Page[]>(`${CMS_URL}/pages`),
      slug: (slug: string): Promise<Page | null> =>
        ssg.get<Page | null>(`${CMS_URL}/pages/slug/${slug}`),
    },
  },
};
