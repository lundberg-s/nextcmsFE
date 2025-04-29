import React, { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextType {
  body: ReactNode | null;
  setBody: React.Dispatch<React.SetStateAction<ReactNode | null>>;
  footer: ReactNode | null;
  setFooter: React.Dispatch<React.SetStateAction<ReactNode | null>>;
  clear: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [body, setBody] = useState<ReactNode | null>(null);
  const [footer, setFooter] = useState<ReactNode | null>(null);


  return (
    <SidebarContext.Provider value={{ body, setBody, footer, setFooter, clear: () => { setBody(null); setFooter(null); } }}>
      {children}
    </SidebarContext.Provider>
  );
};


export const useSidebarContent = (): SidebarContextType => {
    const context = useContext(SidebarContext);
  
    if (!context) {
      throw new Error("useSidebar must be used within a SidebarProvider");
    }
  
    return context;
  };
  