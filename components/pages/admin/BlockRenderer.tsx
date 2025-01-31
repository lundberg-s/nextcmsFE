"use client";
import { Block } from "@/types/blocks";
import { BlockProvider } from "@/utils/BlockProvider";
import { Button } from "@/components/ui/button";
import {
  AlertDialogTrigger,
  AlertDialog,
} from "@/components/ui/alert-dialog";

interface BlockRendererProps {
  blocks: Block[];
  onEditBlock: (block: Block) => void;
  onDeleteBlock: (id: string) => void;
  confirmDeleteBlock: () => void;
}

export function BlockRenderer({
  blocks,
  onEditBlock,
  onDeleteBlock,
}: BlockRendererProps) {
  return (
    <div className="space-y-8">
      {blocks.map((block, index) => (
        <div key={index} className="relative group">
          <BlockProvider block={block} />
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
