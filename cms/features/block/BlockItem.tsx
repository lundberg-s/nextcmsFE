"use client";

import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { Hero } from "@/cms/features/block/blocks/Hero";
import { Experimental } from "@/cms/features/block/blocks/Experimental";
import { Features } from "@/cms/features/block/blocks/Features";
import { DragHandle } from "@/cms/components/ui/drag-handle";
import { Button } from "@/cms/components/ui/button";
import { ConfirmationModal } from "@/cms/components/modals/ConfirmationModal";
import { getIcon } from "@/cms/lib/utilities/GetIcon";

interface BlockItemProps {
  block: Block;
  onEdit?: () => void;
  onDelete?: () => void;
  isEditing?: boolean;
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap | undefined;
}

export function BlockItem({
  block,
  onEdit,
  onDelete,
  isEditing = false,
  attributes,
  listeners,
}: BlockItemProps) {
  const BLOCK_OPTIONS: { [key: string]: React.ElementType<{ block: Block }> } =
    {
      hero: Hero,
      features: Features,
      experimental: Experimental,
    };

  const Block = block.type ? BLOCK_OPTIONS[block.type] : null;

  if (!Block) {
    return null;
  }

  const trashIcon = getIcon("trash");
  const settingsIcon = getIcon("settings");

  return (
    <div className="relative group">
      <Block block={block} />

      {isEditing && (
        <div className="absolute bg-gray-200 py-4 rounded-lg bg-opacity-80 top-1/2 right-4 flex flex-col gap-10 items-center transform -translate-y-1/2">
          <Button
            icon={settingsIcon}
            variant="ghost"
            size="sm"
            onClick={onEdit}
          />
          <DragHandle attributes={attributes} listeners={listeners} />
          <ConfirmationModal
            trigger={<Button icon={trashIcon} variant="ghost" size="sm" />}
            title="Delete Block"
            description="Are you sure you want to delete this block? This action cannot be undone."
            onConfirm={onDelete}
            cancelText="Cancel"
            confirmText="Delete"
          />
        </div>
      )}
    </div>
  );
}
