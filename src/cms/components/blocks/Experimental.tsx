"use client";

import { useCmsContext } from "@/cms/lib/context/CmsContext";
import { useBlock } from "@/cms/lib/hooks/useBlock";
import { useState } from "react";
import { ElementItem } from "@/cms/features/element/ElementItem";

interface ExperimentalProps {
  block: Block;
}

export function Experimental({ block }: ExperimentalProps) {
  const { content, style } = block;
  const { selectedBlock } = useCmsContext();
  const { updateBlock } = useBlock();
  const isSelected = selectedBlock?.id === block.id;
  const [targetPosition, setTargetPosition] = useState<string | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<ContentElement | null>(null);
  const [showColumnColors, setShowColumnColors] = useState(false);
  // Function to handle container clicks
  const handleContainerClick = (position: "left" | "top" | "bottom" | "right") => {
    if (!isSelected) return;
    setShowColumnColors(!showColumnColors);
    setTargetPosition(position);

    const [type, component] = selectedComponent ? [selectedComponent.type, selectedComponent] : ["", null];
    // Update the block with the new position for this component
    if (!component) return;
    updateBlock(
      {
        id: block.id,
        data: {
          ...block,
          content: {
            ...content,
            [type]: {
              ...(component as ContentElement),
              position: position
            }
          }
        }
      }, {
      onSuccess: () => {
        setSelectedComponent(null);
      },
    }
    );
  };

const renderComponentAt = (position: string) => {
  if (!content) return null;

  // Find component with matching position
  const componentEntry = Object.entries(content).find(([_, comp]) =>
    (comp as ContentElement).position === position
  );

  if (!componentEntry && isSelected) return <div className="text-gray-400">Click to place component here</div>;

  const [type, component] = componentEntry || ["", null];
  
  // Check if this specific component is the one that's selected
  const isThisComponentSelected = selectedComponent?.type === type && 
    selectedComponent?.position === (component as ContentElement)?.position;

  return (
    <div 
      className={`${isThisComponentSelected ? "bg-blue-400 p-4 rounded-md" : ""} 
                  transition-colors duration-200`} 
      onClick={(e) => {
        e.stopPropagation(); // Prevent triggering container click
        setSelectedComponent(component as ContentElement);
      }}
    >
      <ElementItem
        mode="render"
        key={type}
        type={type as ContentType}
        value={component as ContentElement}
        kind="content"
        onChange={() => {}}
        onRemove={() => {}}
      />
    </div>
  );
};

  const colours = {
    backgroundColor: style?.backgroundColor || "bg-background",
    textColor: style?.textColor || "",
  };

  const backgroundImage = style?.backgroundImage
    ? {
      backgroundImage: `url(${style?.backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }
    : {};

  const positions = {
    left: {
      position: "left",
      backgroundColor: "bg-red-200",
      hoverBackgroundColor: "bg-red-300",
    },
    top: {
      position: "top",
      backgroundColor: "bg-blue-200",
      hoverBackgroundColor: "bg-blue-300",
    },
    bottom: {
      position: "bottom",
      backgroundColor: "bg-blue-300",
      hoverBackgroundColor: "bg-blue-400",
    },
    right: {
      position: "right",
      backgroundColor: "bg-green-200",
      hoverBackgroundColor: "bg-green-300",
    },
  };

  return (
    <div
      className={`min-h-[600px] flex w-full h-full`}
      style={{ ...colours, ...backgroundImage }}
    >
      {isSelected ? (
        <>
          {/* Left column - full height */}
          <div
            className={`flex-1 p-4 flex items-center justify-center cursor-pointer ${showColumnColors
                ? `${targetPosition === "left" ? "bg-red-300 ring-2 ring-blue-500" : "bg-red-200"}`
                : ""
              }`}
            onClick={() => handleContainerClick("left")}
          >
            {renderComponentAt("left")}
          </div>

          {/* Middle column - divided into two rows */}
          <div className="flex-1 flex flex-col">
            <div
              className={`flex-1 p-4 flex items-center justify-center cursor-pointer ${showColumnColors
                  ? `${targetPosition === "top" ? "bg-blue-300 ring-2 ring-blue-500" : "bg-blue-200"}`
                  : ""
                }`}
              onClick={() => handleContainerClick("top")}
            >
              {renderComponentAt("top")}
            </div>
            <div
              className={`flex-1 p-4 flex items-center justify-center cursor-pointer ${showColumnColors
                  ? `${targetPosition === "bottom" ? "bg-blue-400 ring-2 ring-blue-500" : "bg-blue-300"}`
                  : ""
                }`}
              onClick={() => handleContainerClick("bottom")}
            >
              {renderComponentAt("bottom")}
            </div>
          </div>

          {/* Right column - full height */}
          <div
            className={`flex-1 p-4 flex items-center justify-center cursor-pointer ${showColumnColors
                ? `${targetPosition === "right" ? "bg-green-300 ring-2 ring-blue-500" : "bg-green-200"}`
                : ""
              }`}
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