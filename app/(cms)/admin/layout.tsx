"use client";

import { AppSidebar } from "@/cms/components/sidebar/Sidebar";
import { AdminNavigation } from "@/cms/components/navigation/AdminNavigation";
import { SidebarProvider, SidebarTrigger } from "@/shared/ui/sidebar";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { SidebarContentProvider } from "@/cms/lib/context/SidebarContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <SidebarContentProvider>
          <SidebarProvider>
            <AdminNavigation />
            {children}
            <AppSidebar />
          </SidebarProvider>
        </SidebarContentProvider>
    </>
  );
}
