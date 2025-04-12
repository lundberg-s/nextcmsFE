import { useCms } from "@/lib/hooks/useCms";
import { Block } from "@/lib/types/blocks";

export const useBlockActions = () => {
  const { removeBlock } = useCms();

  const deleteBlock = (blockId: string) => {
    removeBlock(blockId);
  };

  return {
    deleteBlock
  };
};