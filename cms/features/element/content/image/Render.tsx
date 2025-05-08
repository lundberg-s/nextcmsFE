import Image from "next/image";
import React from "react";

interface RenderImageProps {
  data: Partial<Element>;
}

export function RenderImage({ data }: RenderImageProps) {
  if (!data.src) {
    return <p>No image source provided</p>;
  }

  return (
    <Image
      src={data.src}
      alt={data.alt || "Image"}
      width={data.width || 300} // Default width
      height={data.height || 200} // Default height
      className={data.className || ""}
    />
  );
}