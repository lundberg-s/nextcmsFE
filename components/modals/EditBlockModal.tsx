"use client";

import { Block } from "@/types/blocks";
import { Button } from "@/components/ui/button";
import { EditBlockForm } from "@/components/forms/EditBlockForm";
import { useSidebar } from "@/components/ui/sidebar";
import { useSidebarContentStore } from "@/lib/store/sidebar-store";

interface EditBlockModalProps {
  block: Block | null;
}

export function EditBlockModal({ block }: EditBlockModalProps) {
  const { toggleSidebar, setOpen, open } = useSidebar();
  const setContent = useSidebarContentStore((state) => state.setContent);

  const handleClick = () => {
    if (open) {
      setContent(
        <EditBlockForm block={block} onClose={() => setOpen(false)} />
      );
    } else {
      toggleSidebar();
      setContent(
        <EditBlockForm block={block} onClose={() => setOpen(false)} />
      );
    }
  };

  return (
    <>
      <Button size="sm" onClick={handleClick}>
        Edit
      </Button>
    </>
  );
}
