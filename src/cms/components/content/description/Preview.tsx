import Image from "next/image";
import DescriptionPreview from "public/ELEMENT_DESC_ICON.png";

export function PreviewDescription() {
  return (
    <Image src={DescriptionPreview} alt="Title Description" width={500} height={200} className="w-full rounded-md h-auto object-cover" />
  );
}