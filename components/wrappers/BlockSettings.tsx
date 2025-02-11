import React from "react";

export function BlockSettings({ children }: { children: React.ReactNode }) {
  return (  
    <div className="absolute top-1/2 right-4 flex flex-col gap-10 items-center transform -translate-y-1/2">
      {children}
    </div>
  );
}

