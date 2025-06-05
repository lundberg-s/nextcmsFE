import React from "react";
import { getLucideIcon } from "@/cms/lib/utilities/getLucideIcon";

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
          {getLucideIcon("chevron-right")}
        </span>
        {children}
      </div>
    </div>
  );
}