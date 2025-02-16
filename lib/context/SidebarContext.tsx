import React, { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextType {
  content: ReactNode | null;
  footer: ReactNode | null;
  setSidebar: (params: { content?: ReactNode; footer?: ReactNode }) => void;
  clear: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<ReactNode | null>(null);
  const [footer, setFooter] = useState<ReactNode | null>(null);

  const setSidebar = ({ content, footer }: { content?: ReactNode; footer?: ReactNode }) => {
    if (content !== undefined) setContent(content);
    if (footer !== undefined) setFooter(footer);
  };

  const clear = () => {
    setContent(null);
    setFooter(null);
  };

  return (
    <SidebarContext.Provider value={{ content, footer, setSidebar, clear }}>
      {children}
    </SidebarContext.Provider>
  );
};


export const useSidebar = (): SidebarContextType => {
    const context = useContext(SidebarContext);
  
    if (!context) {
      throw new Error("useSidebar must be used within a SidebarProvider");
    }
  
    return context;
  };
  