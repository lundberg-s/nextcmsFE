import React from "react";

export function BlockSettings({ children }: { children: React.ReactNode }) {
  return <div className="absolute top-4 right-4 flex gap-2">{children}</div>;
}
