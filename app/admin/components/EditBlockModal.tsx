"use client";
import { Block } from "@/types/blocks";
import { useAdminStore } from "@/lib/store/admin-store"; // Import store to manage state
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BlockForm } from "@/components/blocks/BlockForm";

interface EditBlockModalProps {
  block: Block | null;
}

export function EditBlockModal({ block }: EditBlockModalProps) {
  const { setSelectedBlock } = useAdminStore();

  return (
    <Dialog open={!!block} onOpenChange={() => setSelectedBlock(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Block</DialogTitle>
          <DialogDescription>
            Make changes to your block here.
          </DialogDescription>
        </DialogHeader>
        <BlockForm block={block} />
      </DialogContent>
    </Dialog>
  );
}
