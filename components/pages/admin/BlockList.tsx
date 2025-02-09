"use client";
import { Block } from "@/types/blocks";
import { BlockProvider } from "@/utils/BlockProvider";
import { EditBlockModal } from "@/components/modals/EditBlockModal";
import { DeleteBlockModal } from "@/components/modals/DeleteBlockModal";
import { BlockSettings } from "@/components/wrappers/BlockSettings";
interface BlockListProps {
  blocks: Block[];
}

export function BlockList({ blocks }: BlockListProps) {
  return (
    <div className="space-y-8">
      {blocks.map((block, index) => (
        <div key={index} className="relative group">
          <BlockProvider block={block} />
            <BlockSettings>
              <EditBlockModal block={block} />
              <DeleteBlockModal block={block} />
            </BlockSettings>
        </div>
      ))}
    </div>
  );
}
