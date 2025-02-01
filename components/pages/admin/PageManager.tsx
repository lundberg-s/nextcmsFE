"use client";

import { useEffect } from "react";
import { useAdminStore } from "@/lib/store/admin-store";
import { PageRenderer } from "./PageRenderer";

export function PageManager() {
  const { pages, selectedPage, setSelectedPage } =
    useAdminStore();

  useEffect(() => {
    if (pages.length > 0 && !selectedPage) {
      setSelectedPage(pages.find((page) => page.slug === "home") || null);
    }
  }, [pages, selectedPage, setSelectedPage]);

  return (
    <div className="min-h-screen bg-gray-200 w-full">
      <div className="container mx-auto px-4 py-8">
        <PageRenderer />
      </div>
    </div>
  );
}
