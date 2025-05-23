import type { MetadataRoute } from 'next'
import { api } from "@/shared/lib/api/api"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await api.pages.get.list();

  const baseUrl = "http://localhost:3000";

  const sitemapEntries = pages.map((page: { slug: string, updatedAt?: string }) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: page.updatedAt ? new Date(page.updatedAt) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  sitemapEntries.unshift({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1,
  });

  return sitemapEntries;
}