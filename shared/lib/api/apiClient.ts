// apiClient.ts

const BASE_URL = process.env.API_BASE_URL || "http://localhost:8000";

async function fetchWithAuthRetry(
  url: string,
  options: RequestInit = {}
): Promise<any> {
  let response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    credentials: "include",
  });

  if (response.status === 401) {
    console.warn("Access token expired. Attempting to refresh...");

    const refreshResponse = await fetch(`${BASE_URL}/api/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!refreshResponse.ok) {
      const errorData = await refreshResponse.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to refresh token");
    }

    console.info("Token refreshed successfully. Retrying request...");

    response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      credentials: "include",
    });
  }

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`Error ${response.status}: ${errorText || response.statusText}`);
  }

  return response.json();
}

function createOptions(method: string, body?: any, headers: HeadersInit = {}) {
  return {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  };
}

export const apiClient = {
  get: (url: string, headers?: HeadersInit) =>
    fetchWithAuthRetry(url, {
      method: "GET",
      headers,
    }),

  post: (url: string, data: any, headers?: HeadersInit) =>
    fetchWithAuthRetry(url, createOptions("POST", data, headers)),

  put: (url: string, data: any, headers?: HeadersInit) =>
    fetchWithAuthRetry(url, createOptions("PUT", data, headers)),

  patch: (url: string, data: any, headers?: HeadersInit) =>
    fetchWithAuthRetry(url, createOptions("PATCH", data, headers)),

  delete: (url: string, headers?: HeadersInit) =>
    fetchWithAuthRetry(url, {
      method: "DELETE",
      headers,
    }),
};
