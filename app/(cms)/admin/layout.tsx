"use client";

import { AppSidebar } from "@/cms/components/modals/Sidebar";
import { AdminNavigation } from "@/cms/components/navigation/AdminNavigation";
import { SidebarProvider, SidebarTrigger } from "@/cms/components/ui/sidebar";
import { ScrollArea } from "@/cms/components/ui/scroll-area";
import { SidebarContentProvider } from "@/cms/lib/context/SidebarContext";
import { BlockPreviewProvider } from "@/cms/lib/hooks/useBlockPreview";

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
