// app/admin/page.tsx
"use client";

import { PageManager } from "@/components/pages/admin/PageManager";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AdminPage() {


  return (
    <ScrollArea className="w-full rounded-md border p-4">
      <div className="min-h-screen bg-gray-200 w-full">
        <PageManager />
      </div>
    </ScrollArea>
  );
}
