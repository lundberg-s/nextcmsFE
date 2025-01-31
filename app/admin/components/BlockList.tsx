"use client";
import { Block } from "@/types/blocks";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { EditBlockModal } from "./EditBlockModal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { BlockForm } from "@/components/blocks/BlockForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

interface BlockListProps {
  blocks: Block[];
  onEditBlock: (block: any) => void;
  onDeleteBlock: (id: string) => void;
  confirmDeleteBlock: () => void;
}

export function BlockList({
  blocks,
  onEditBlock,
  onDeleteBlock,
  confirmDeleteBlock,
}: BlockListProps) {
  return (
    <div className="space-y-8">
      {blocks.map((block, index) => (
        <div key={index} className="relative group">
          <BlockRenderer block={block} />
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              size="sm"
              onClick={() => onEditBlock(block)}
            >
              Edit
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDeleteBlock(block.id)}
                >
                  Delete
                </Button>
              </AlertDialogTrigger>
            </AlertDialog>
          </div>
        </div>
      ))}
    </div>
  );
}
