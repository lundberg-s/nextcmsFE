import React from "react";

interface ExpandableSectionProps {
    isOpen: boolean;
    children: React.ReactNode;
    className?: string;
}

export function ExpandableSection({
    isOpen,
    children,
    className = "",
}: ExpandableSectionProps) {
    return (
        <div className={`grid-rows-transition ${isOpen ? "grid-rows-expanded" : ""} ${className}`}>
            <div className="overflow-hidden">
                {children}
            </div>
        </div>
    );
}