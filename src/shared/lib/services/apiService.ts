const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/";
const REFRESH_URL = process.env.NEXT_PUBLIC_REFRESH_URL || "http://localhost:8000/api/refresh/";
const DEFAULT_REVALIDATE = 60;

function buildUrl(url: string, absolute: boolean) {
  return absolute ? url : `${API_BASE_URL}${url}`;
}

function buildHeaders(customHeaders: HeadersInit = {}): HeadersInit {
  return {
    "Content-Type": "application/json",
    ...customHeaders,
  };
}

async function authenticatedFetch(url: string, options: RequestInit = {}, absolute = false): Promise<Response> {
  return fetch(buildUrl(url, absolute), {
    ...options,
    credentials: "include",
  });
}

async function tryRefreshToken(): Promise<boolean> {
  const response = await authenticatedFetch(REFRESH_URL, {
    method: "POST",
    headers: buildHeaders(),
  }, true);

  if (response.ok) return true;

  const errorData = await response.json().catch(() => ({ error: "Unknown error" }));

  if (typeof window !== "undefined" && window.location.pathname.startsWith("/admin")) {
    window.location.href = "/login";
  }

  throw new Error(errorData.error || "Failed to refresh token");
}

async function handleResponse(response: Response): Promise<any> {
  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`Error ${response.status}: ${errorText || response.statusText}`);
  }

  const isJson = response.headers.get("Content-Type")?.includes("application/json");
  return response.status !== 204 && isJson ? response.json() : null;
}

export async function fetchWithAuthRetry(
  url: string,
  options: RequestInit = {}
): Promise<any> {
  let response = await authenticatedFetch(url, options);

  if (response.status === 401) {
    console.warn("Access token expired. Attempting to refresh...");
    const refreshed = await tryRefreshToken();

    if (refreshed) {
      console.info("Token refreshed successfully. Retrying request...");
      response = await authenticatedFetch(url, options);
    }
  }

  return handleResponse(response);
}

export function createOptions(
  method: string,
  body?: any,
  headers: HeadersInit = {}
): RequestInit {
  return {
    method,
    headers: buildHeaders(headers),
    body: body ? JSON.stringify(body) : undefined,
  };
}

export const client = {
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

  delete: (url: string) =>
    fetchWithAuthRetry(url, {
      method: "DELETE",
    }),
};

export const ssg = {
  get: async <T>(
    endpoint: string,
    revalidate: number = DEFAULT_REVALIDATE,
    options: RequestInit = {}
  ): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
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
