import Image from "next/image";
import TextPreview from "public/ELEMENT_TEXT_ICON.png"

export function PreviewText() {
  return (
    <Image src={TextPreview} alt="Title Preview" width={500} height={200} className="w-full rounded-md h-auto object-cover" />
  );
}