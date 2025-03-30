import { useBlocks } from "./useBlocks";
import { usePages } from "./usePages";

export function useCms() {
  const blocksHook = useBlocks();
  const pagesHook = usePages();

  return {
    // Original nested structure
    blocks: blocksHook,
    pages: pagesHook,
    
    // Flattened API (optional)
    allBlocks: blocksHook.blocks,
    allPages: pagesHook.pages,
    
    // Block operations
    addBlock: blocksHook.add,
    updateBlock: blocksHook.update,
    removeBlock: blocksHook.remove,
    updateBlockOrder: blocksHook.updateOrder,
    
    // Page operations
    addPage: pagesHook.add,
    updatePage: pagesHook.update,
    removePage: pagesHook.remove,
    
    // Loading states
    isLoadingBlocks: blocksHook.isLoading,
    isLoadingPages: pagesHook.isLoading,
    
    // Additional convenience methods
    getBlockById: blocksHook.getBlockById,
  };
}