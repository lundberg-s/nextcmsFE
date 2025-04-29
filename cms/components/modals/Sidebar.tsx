import { useSidebarContent } from "@/cms/lib/context/SidebarContext";
import { useSidebar } from "@/cms/components/ui/sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/cms/components/ui/sidebar";
import { Button } from "../ui/button";
import React from "react";

export function AppSidebar() {
  const { body, footer } = useSidebarContent();

  const formId = React.isValidElement(body) ? body.props?.id : undefined;
  const onCancel = React.isValidElement(body) ? body.props?.onCancel : undefined;

  const handleClose = () => {
    if (formId) {
      const form = document.getElementById(formId) as HTMLFormElement;
      if (form) {
        form.reset();
        return;
      }
    }
    if (typeof onCancel === 'function') {
      onCancel();
    }
  };

  return (
    <Sidebar side="right">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>{body}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex justify-between gap-2">
          <Button
            className="w-full"
            type="button"
            variant="outline"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            className="w-full"
            type="submit"
            variant="default"
            form={formId}
          >
            Save
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
