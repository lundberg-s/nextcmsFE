"use client";

import React, { createContext, useContext, useState } from "react";



interface CmsContextProps {
  selectedPage: Page | null;
  setSelectedPage: (page: Page | null) => void;
  selectedBlock: Block | null;
  setSelectedBlock: (block: Block | null) => void;
}

const CmsContext = createContext<CmsContextProps | undefined>(undefined);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);

  return (
    <CmsContext.Provider value={{ selectedPage, setSelectedPage, selectedBlock, setSelectedBlock }}>
      {children}
    </CmsContext.Provider>
  );
};

export const useCmsContext = () => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error("useCmsContext must be used within a CmsProvider");
  }
  return context;
};