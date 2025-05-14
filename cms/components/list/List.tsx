"use client";

import React, { useState } from "react";
import { Input } from "@/cms/components/ui/input";
import {
  ListRoot,
  ListHeader,
  ListContent,
  ListItem,
  ListEmpty,
  ListItemButton,
} from "@/cms/components/ui/list";

interface SelectableListProps {
  options?: Array<{ label?: string; value: string }>;
  value: string | null;
  onChange: (value: string) => void;
  data: {
    options?: Array<{ label?: string; value: string }>;
    value?: string | null;
    onChange?: (value: string) => void;
    searchable?: boolean;
    defaultSearchTerm?: string;
    title?: string;
    placeholder?: string;
    emptyMessage?: string;
    maxHeight?: string | number;
    className?: string;
    required?: boolean;
    id: string;
    name: string;
    label: string;
  };

  searchable?: boolean;
  defaultSearchTerm?: string;
  title?: string;
  placeholder?: string;
  emptyMessage?: string;
  maxHeight?: string | number;
  className?: string;
}

export function SelectableList({ data, onChange }: SelectableListProps) {
  const {
    options = [],
    value,
    searchable = false,
    defaultSearchTerm = "",
    title,
    placeholder = "Search...",
    emptyMessage = "No options available",
    maxHeight = "300px",
    className = "",
  } = data;
  const [searchTerm, setSearchTerm] = useState(defaultSearchTerm);

  const safeOptions = Array.isArray(options) ? options : [];

  const filteredOptions =
    searchable && searchTerm
      ? safeOptions.filter((option) =>
          (option.label || option.value)
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      : safeOptions;

  return (
    <div className={className}>
      {searchable && (
        <div className="mb-4">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={placeholder}
          />
        </div>
      )}

      <ListRoot>
        {title && <ListHeader>{title}</ListHeader>}

        {!filteredOptions.length ? (
          <ListEmpty>{emptyMessage}</ListEmpty>
        ) : (
          <ListContent maxHeight={maxHeight}>
            {filteredOptions.map((option) => (
              <ListItem key={option.value}>
                <ListItemButton
                  active={option.value === value}
                  onClick={() => onChange(option.value)}
                >
                  {option.label || option.value}
                </ListItemButton>
              </ListItem>
            ))}
          </ListContent>
        )}
      </ListRoot>
    </div>
  );
}
