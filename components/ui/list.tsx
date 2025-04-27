"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ListRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ListRoot = React.forwardRef<HTMLDivElement, ListRootProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn("border rounded-md overflow-hidden", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ListRoot.displayName = "ListRoot";

interface ListHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ListHeader = React.forwardRef<HTMLDivElement, ListHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn("font-medium p-2 text-sm", className)} 
        {...props}
      >
        {children}
      </div>
    );
  }
);
ListHeader.displayName = "ListHeader";

interface ListContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxHeight?: string | number;
}

const ListContent = React.forwardRef<HTMLDivElement, ListContentProps>(
  ({ className, children, maxHeight = "15rem", ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn("p-1", className)}
        {...props}
      >
        <ul 
          className="max-h-60 overflow-auto" 
          style={{ maxHeight }}
        >
          {children}
        </ul>
      </div>
    );
  }
);
ListContent.displayName = "ListContent";

interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <li 
        ref={ref}
        className={cn("", className)}
        {...props}
      >
        {children}
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

interface ListEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ListEmpty = React.forwardRef<HTMLDivElement, ListEmptyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn("px-2 py-3 text-sm text-gray-500", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ListEmpty.displayName = "ListEmpty";

interface ListItemButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children: React.ReactNode;
}

const ListItemButton = React.forwardRef<HTMLButtonElement, ListItemButtonProps>(
  ({ className, active, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "w-full text-left px-2 py-2 text-sm flex items-center",
          active 
            ? "bg-gray-200 font-medium border-l-4 border-blue-600" 
            : "hover:bg-gray-100",
          className
        )}
        {...props}
      >
        {active && (
          <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </span>
        )}
        {!active && <span className="mr-2 w-4"></span>}
        {children}
      </button>
    );
  }
);
ListItemButton.displayName = "ListItemButton";

export {
  ListRoot,
  ListHeader,
  ListContent,
  ListItem,
  ListEmpty,
  ListItemButton
};