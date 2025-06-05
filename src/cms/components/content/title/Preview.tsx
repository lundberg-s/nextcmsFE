import Image from "next/image";
import TitlePreview from "public/ELEMENT_TITLE_ICON.png"

export function PreviewTitle() {
  return (
    <Image src={TitlePreview} alt="Title Preview" width={500} height={200} className="w-full rounded-md h-auto object-cover" />
  );
}