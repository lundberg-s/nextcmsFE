"use client";

import { Block, Element, ElementType } from "@/cms/lib/types/blocks";
import { ElementItem } from "@/cms/features/element/ElementItem";

interface HeroProps {
  block: Block;
}

export function Hero({ block }: HeroProps) {
  const { content, config } = block;

  const colours = {
    backgroundColor: config?.backgroundColor || "bg-background",
    textColor: config?.textColor || "",
  };

  const backgroundImage = config?.backgroundImage
    ? {
        backgroundImage: `url(${config?.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {};

  return (
    <div
      className={`min-h-[600px] flex w-full h-full justify-center items-center`}
      style={{ ...colours, ...backgroundImage }}
    >
      {content &&
        Object.entries(content).map(([type, value]) => (
          <ElementItem
            mode="render"
            key={type}
            type={type as ElementType}
            component={value}
            kind="content"
          />
        ))}
    </div>
  );
}
