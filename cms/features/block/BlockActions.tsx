import { useBlock } from "@/cms/lib/hooks/useBlock";
import { Block } from "@/cms/lib/types/blocks";

export const useBlockActions = () => {
  const { removeBlock } = useBlock();

  const deleteBlock = (blockId: string) => {
    removeBlock(blockId);
  };

  return {
    deleteBlock
  };
};