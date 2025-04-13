import { useBlock } from "@/lib/hooks/useBlock";
import { Block } from "@/lib/types/blocks";

export const useBlockActions = () => {
  const { removeBlock } = useBlock();

  const deleteBlock = (blockId: string) => {
    removeBlock(blockId);
  };

  return {
    deleteBlock
  };
};