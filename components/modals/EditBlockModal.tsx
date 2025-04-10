"use client";

import { Block } from "@/lib/types/blocks";
import { Button } from "@/components/ui/button";
import { EditBlockForm } from "@/lib/entities/block/EditBlockForm";
import { useSidebar } from "@/components/ui/sidebar";
import { useSidebarContent } from "@/lib/context/SidebarContext";
import { useCmsContext } from "@/lib/context/CmsContext";
import { Settings } from "lucide-react";
import { useFormContext } from "@/lib/hooks/useFormFontext";

interface EditBlockModalProps {
  block: Block | null;
}

export function EditBlockModal({ block }: EditBlockModalProps) {
  const { toggleSidebar, setOpen, open } = useSidebar();
  const { selectedBlock, setSelectedBlock } = useCmsContext();
  const { setCurrentFormValues} = useFormContext();
  const { setBody, setFooter, clear } = useSidebarContent();

  const handleSubmit = (data: Block) => {
    setSelectedBlock(null);
    setOpen(false);
  };

  const handleCancel = () => {
    setSelectedBlock(null);
    setOpen(false);
  };

  const setContent = () => {
    setBody(
      <EditBlockForm
        block={block}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    );
    setFooter(
      <div className="flex justify-evenly gap-2">
        <Button
          className="w-full"
          type="button"
          variant="outline"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          className="w-full"
          type="submit"
          variant="default"
          form="edit-block-form"
        >
          Save
        </Button>
      </div>
    );
  };

  const handleClick = () => {
    setSelectedBlock(block);

    if (open && selectedBlock?.id === block?.id) {
      setOpen(false);
      clear();
    } else {
      setContent();
      if (!open) {
        toggleSidebar();
      }
    }
  };

  return (
    <>
      <Button variant="ghost" size="sm" onClick={handleClick}>
        <Settings className="w-4 h-4" />
      </Button>
    </>
  );
}
