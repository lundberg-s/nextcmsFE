import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { useSidebarContentStore } from "@/lib/store/sidebar-store";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export function AppSidebar({ 
    defaultOpen,
    open,
    onOpenChange 
  }: Omit<AppSidebarProps, 'children'>) {
    const content = useSidebarContentStore((state: { content: any; }) => state.content)
  
    return (
        <Sidebar side="right">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Application</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {content}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
    )
  }