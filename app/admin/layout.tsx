"use client";

import { AppSidebar } from "@/components/app-sidebar.tsx";
import { AdminNavigation } from "@/components/navigation/AdminNavigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider
    >
      {/* <AdminNavigation /> */}
      {children}

      <AppSidebar />
    </SidebarProvider>
  );
}
