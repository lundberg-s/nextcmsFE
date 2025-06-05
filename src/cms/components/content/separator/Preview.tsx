import Image from "next/image";
import SeparatorPreview from "public/ELEMENT_SEPARATOR_ICON.jpg"

export function PreviewSeparator() {
  return (
    <Image src={SeparatorPreview} alt="Title Preview" width={500} height={200} className="w-full rounded-md h-auto object-cover" />
  );
}