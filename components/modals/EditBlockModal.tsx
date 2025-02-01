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
import { AddBlockForm } from "@/components/forms/AddBlockForm";

interface EditBlockModalProps {
  block: Block | null;
}

export function EditBlockModal({ block }: EditBlockModalProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (!block) return null;

  return (
    <>
      <Button size="sm" onClick={handleOpen}>
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
          <AddBlockForm block={block} />
          <div className="flex justify-end mt-4">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
