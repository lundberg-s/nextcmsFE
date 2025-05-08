import Image from "next/image";
import React from "react";

export function PreviewImage() {
  return (
    <Image
      src="https://plus.unsplash.com/premium_photo-1673264933445-0112f3cdcb2f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQzfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D"
      alt="Preview"
      width={150}
      height={150}
      layout="intrinsic"
      className="w-full h-auto"
    />
  );
}