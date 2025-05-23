import React from "react";
import { getIcon } from "@/cms/lib/utilities/GetIcon";

interface ExpandableSectionTitleProps {
  isOpen: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export function ExpandableSectionTitle({
  isOpen,
  onClick,
  children,
  className = "",
}: ExpandableSectionTitleProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between border-b border-t p-2 cursor-pointer ${className}`}
    >
      <div className="flex items-center gap-4">
        <span
          className={`transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
        >
          {getIcon("chevron-right")}
        </span>
        {children}
      </div>
    </div>
  );
}