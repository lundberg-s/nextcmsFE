// app/admin/page.tsx
"use client";

import { useEffect } from "react";
import { useAdminStore } from "@/lib/store/admin-store";
import { PageManager } from "@/components/pages/admin/PageManager";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AdminPage() {
  const { getPages } = useAdminStore();

  useEffect(() => {
    const fetchData = async () => {
      await getPages();
    };
    fetchData();
  }, [getPages]);

  return (
    <ScrollArea className="h-screen w-full rounded-md border p-4">
      <PageManager />
    </ScrollArea>
  );
}
