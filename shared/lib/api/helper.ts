export async function fetchWithAccessToken(url: string, options: RequestInit = {}) {
    const accessToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access="))
      ?.split("=")[1];
  
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  
    return fetch(url, { ...options, headers });
  }

  import { api } from "@/shared/lib/api/route";

export async function fetchWithAuthRetry(url: string, options: RequestInit = {}) {
  let response = await fetchWithAccessToken(url, options);

  if (response.status === 401) {
    await api.auth.refresh();

    response = await fetchWithAccessToken(url, options);
  }

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}