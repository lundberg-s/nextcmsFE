"use client";
import { Block } from "@/types/blocks";
import { BlockProvider } from "@/utils/BlockProvider";
import { EditBlockModal } from "@/components/modals/EditBlockModal";
import { DeleteBlockModal } from "@/components/modals/DeleteBlockModal";

interface BlockRendererProps {
  blocks: Block[];
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <div className="space-y-8">
      {blocks.map((block, index) => (
        <div key={index} className="relative group">
          <BlockProvider block={block} />
          <div className="absolute top-4 right-4 flex gap-2">
            <EditBlockModal block={block} />
            <DeleteBlockModal block={block} />
          </div>
        </div>
      ))}
    </div>
  );
}
