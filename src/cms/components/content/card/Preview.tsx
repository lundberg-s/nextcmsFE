import Image from "next/image";
import CardPreview from "public/ELEMENT_CARD_ICON.jpg"

export function PreviewCard() {
  return (
    <Image src={CardPreview} alt="Title Preview" width={500} height={200} className="w-full rounded-md h-auto object-cover" />
  );
}