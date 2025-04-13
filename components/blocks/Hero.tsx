"use client";

import { Block, BlockComponent, ComponentType } from "@/lib/types/blocks";
import { ComponentRenderForm } from "../forms/ComponentRenderForm";
import { useCmsContext } from "@/lib/context/CmsContext";
import { useBlock } from "@/lib/hooks/useBlock";
import { useState } from "react";

interface HeroProps {
  block: Block;
}

export function Hero({ block }: HeroProps) {
  const { content, settings } = block;
  const { selectedBlock } = useCmsContext();
  const { updateBlock } = useBlock();
  const isSelected = selectedBlock?.id === block.id;
  const [activePosition, setActivePosition] = useState<string | null>(null);
  const [selectedComponent, setSelectedComopnent] = useState<BlockComponent | null>(null);

  // Function to handle container clicks
  const handleContainerClick = (position: "left" | "top" | "bottom" | "right") => {
    if (!isSelected) return;

    setActivePosition(position);
    
    const [type, component] = selectedComponent ? [selectedComponent.type, selectedComponent] : ["", null];

    // Update the block with the new position for this component
    if (!component) return;
    updateBlock(
      {
        id: block.id,
        block: {
          ...block,
          content: {
            ...content,
            [type]: {
              ...(component as BlockComponent),
              position: position
            }
          }
        }
      }, {
        onSuccess: () => {
          setSelectedComopnent(null);
        },
      }
    );
  };

  const renderComponentAt = (position: string) => {
    if (!content) return null;

    // Find component with matching position
    const componentEntry = Object.entries(content).find(([_, comp]) =>
      (comp as BlockComponent).position === position
    );

    if (!componentEntry) return <div className="text-gray-400">Click to place component here</div>;

    const [type, component] = componentEntry;

    return (
      <div onClick={() => setSelectedComopnent(component as BlockComponent)}>
        <ComponentRenderForm
          key={type}
          type={type as ComponentType}
          component={component as BlockComponent}
          kind="component"
        />
      </div>
    );
  };

  const colours = {
    backgroundColor: settings?.backgroundColor || "bg-background",
    textColor: settings?.textColor || "",
  };

  const backgroundImage = settings?.backgroundImage
    ? {
      backgroundImage: `url(${settings?.backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }
    : {};

  return (
    <div
      className={`min-h-[600px] flex w-full h-full`}
      style={{ ...colours, ...backgroundImage }}
    >
      {isSelected ? (
        <>
          {/* Left column - full height */}
          <div
            className={`flex-1 p-4 flex items-center justify-center cursor-pointer
                      ${activePosition === "left" ? "bg-red-300" : "bg-red-200"}
                      ${activePosition === "left" ? "ring-2 ring-blue-500" : ""}`}
            onClick={() => handleContainerClick("left")}
          >
            {renderComponentAt("left")}
          </div>

          {/* Middle column - divided into two rows */}
          <div className="flex-1 flex flex-col">
            <div
              className={`flex-1 p-4 flex items-center justify-center cursor-pointer
                        ${activePosition === "top" ? "bg-blue-300" : "bg-blue-200"}
                        ${activePosition === "top" ? "ring-2 ring-blue-500" : ""}`}
              onClick={() => handleContainerClick("top")}
            >
              {renderComponentAt("top")}
            </div>
            <div
              className={`flex-1 p-4 flex items-center justify-center cursor-pointer
                        ${activePosition === "bottom" ? "bg-blue-400" : "bg-blue-300"}
                        ${activePosition === "bottom" ? "ring-2 ring-blue-500" : ""}`}
              onClick={() => handleContainerClick("bottom")}
            >
              {renderComponentAt("bottom")}
            </div>
          </div>

          {/* Right column - full height */}
          <div
            className={`flex-1 p-4 flex items-center justify-center cursor-pointer
                      ${activePosition === "right" ? "bg-green-300" : "bg-green-200"}
                      ${activePosition === "right" ? "ring-2 ring-blue-500" : ""}`}
            onClick={() => handleContainerClick("right")}
          >
            {renderComponentAt("right")}
          </div>
        </>
      ) : (
        // Non-editing mode - just render components in their positions
        <div className="flex w-full">
          <div className="flex-1 flex items-center justify-center">
            {renderComponentAt("left")}
          </div>

          <div className="flex-1 flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              {renderComponentAt("top")}
            </div>
            <div className="flex-1 flex items-center justify-center">
              {renderComponentAt("bottom")}
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            {renderComponentAt("right")}
          </div>
        </div>
      )}
    </div>
  );
}