import { fetchWithAuthRetry, createOptions } from "@/shared/lib/utilities/apiUtils";

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

  delete: (url: string, headers?: HeadersInit) =>
    fetchWithAuthRetry(url, {
      method: "DELETE",
    }),
};