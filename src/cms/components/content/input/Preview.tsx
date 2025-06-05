import Image from "next/image";
import InputPreview from "public/ELEMENT_INPUT_ICON.png"

export function PreviewInput() {
  return (
    <Image src={InputPreview} alt="Title Preview" width={500} height={200} className="w-full rounded-md h-auto object-cover" />
  );
}