"use client";

import { useState } from "react";
import { Block } from "@/types/blocks";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EditBlockForm } from "@/components/forms/EditBlockForm";

interface EditBlockModalProps {
  block: Block | null;
}

export function EditBlockModal({ block }: EditBlockModalProps) {
  const [open, setOpen] = useState(false);

  if (!block) return null;

  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        Edit
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Block</DialogTitle>
            <DialogDescription>
              Make changes to your block here.
            </DialogDescription>
          </DialogHeader>
          <EditBlockForm block={block} onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
