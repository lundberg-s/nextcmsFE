"use client";

import { Block, BlockComponent, ComponentType } from "@/types/blocks";
import { ComponentRenderForm } from "../forms/ComponentRenderForm";

interface HeroProps {
  block: Block;
}

export function Hero({ block }: HeroProps) {
  const { content, settings } = block;

  return (
    <div
      className={`min-h-[600px] flex items-center justify-center ${
        settings?.backgroundColor || "bg-background"
      } ${settings?.textColor || ""}`}
      style={{
        ...(settings?.backgroundImage && {
          backgroundImage: `url(${settings?.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }),
      }}
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
