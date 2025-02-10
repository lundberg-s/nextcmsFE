import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BlockProvider } from "@/utils/BlockProvider";
import { BlockSettings } from "@/components/wrappers/BlockSettings";
import { EditBlockModal } from "@/components/modals/EditBlockModal";
import { DeleteBlockModal } from "@/components/modals/DeleteBlockModal";
import { Block } from "@/types/blocks";
import { DragHandle } from "@/components/ui/drag-handle";

export function BlockItem({ block }: { block: Block }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: block.id });


  return (
    <div
      ref={setNodeRef}

      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className="relative group"
    >
      <BlockProvider block={block} />
      <BlockSettings>
        <DragHandle attributes={attributes} listeners={listeners} />
        <EditBlockModal block={block} />
        <DeleteBlockModal block={block} />
      </BlockSettings>
    </div>
  );
};
