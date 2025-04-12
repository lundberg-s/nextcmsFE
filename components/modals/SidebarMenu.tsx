import { useSidebarContent } from "@/lib/context/SidebarContext";
import { useState } from "react";
import {
  Sidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";

export function AppSidebar({
  children,
  trigger,

}: {
  children: React.ReactNode;
  trigger: React.ReactNode;

  onClose?: () => void;
}) {

  return (
    <Sidebar side="right">
      <SidebarTrigger asChild>
        {trigger}
      </SidebarTrigger>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>{children}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>{footer}</SidebarFooter>
    </Sidebar>
  );
}
