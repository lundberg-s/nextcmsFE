import Image from "next/image";
import ButtonPreview from "public/ELEMENT_BUTTON_ICON.png"

export function PreviewButton() {
  return (
    <Image src={ButtonPreview} alt="Title Preview" width={500} height={200} className="w-full rounded-md h-auto object-cover" />
  );
}