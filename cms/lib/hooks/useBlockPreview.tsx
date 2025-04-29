import React, { createContext, useContext, useState } from 'react';
import { Block } from '@/cms/lib/types/blocks';

interface BlockPreviewContextType {
  previewBlock: Block | null;
  setPreviewBlock: (values: Block | null) => void;
}

const BlockPreviewContext = createContext<BlockPreviewContextType>({
  previewBlock: null,
  setPreviewBlock: () => {},
});

export const BlockPreviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [previewBlock, setPreviewBlock] = useState<Block | null>(null);

  return (
    <BlockPreviewContext.Provider value={{ previewBlock, setPreviewBlock }}>
      {children}
    </BlockPreviewContext.Provider>
  );
};

export const useBlockPreview = () => useContext(BlockPreviewContext);