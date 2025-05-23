import Image from "next/image";
import React from "react";

interface RenderImageProps {
  data: ImageElement;
}

export function RenderImage({ data }: RenderImageProps) {
  if (!data?.src) {
    return <p>No image source provided</p>;
  }
  console.log("RenderImage data:", data);

  return (
    <Image
      src={data.src}
      alt={data.alt || "Image"}
      width={data.width || 300}
      height={data.height || 200}
    />
  );
}