"use client";

import { AppSidebar } from "@/components/modals/Sidebar";
import { AdminNavigation } from "@/components/navigation/AdminNavigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarContentProvider } from "@/lib/context/SidebarContext";
import { BlockPreviewProvider } from "@/lib/hooks/useBlockPreview";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BlockPreviewProvider>
        <SidebarContentProvider>
          <SidebarProvider>
            {/* <AdminNavigation /> */}
            {children}

            <AppSidebar />
          </SidebarProvider>
        </SidebarContentProvider>
      </BlockPreviewProvider>
    </>
  );
}
