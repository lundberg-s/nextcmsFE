"use client";

import { Block, BlockComponent, ComponentType } from "@/lib/types/blocks";
import { ComponentRenderForm } from "../forms/ComponentRenderForm";

interface HeroProps {
  block: Block;
}

export function Hero({ block }: HeroProps) {
  const { content, settings } = block;

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
      className={`min-h-[600px] flex items-center justify-center`}
      style={{ ...colours, ...backgroundImage }}
    >
      {content &&
        Object.entries(content).map(([type, value]) => (
          <ComponentRenderForm
            key={type}
            type={type as ComponentType}
            component={value as BlockComponent}
            kind="component"
          />
        ))}
    </div>
  );
}
