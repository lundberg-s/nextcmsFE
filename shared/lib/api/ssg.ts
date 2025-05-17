const API_URL = "http://localhost:8000/";
const DEFAULT_REVALIDATE = 60;

export const ssg = {
  get: async <T>(
    endpoint: string,
    revalidate: number = DEFAULT_REVALIDATE,
    options: RequestInit = {}
  ): Promise<T> => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      method: "GET",
      next: { revalidate },
    });

    if (!response.ok) {
      if (response.status === 404) return null as unknown as T;
      throw new Error(`Failed to fetch ${endpoint}`);
    }

    return response.json();
  },
};