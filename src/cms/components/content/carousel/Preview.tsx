import Image from "next/image";
import CarouselPreview from "public/ELEMENT_CAROUSEL_ICON.png"

export function PreviewCarousel() {
  return (
    <Image src={CarouselPreview} alt="Title Preview" width={500} height={200} className="w-full rounded-md h-auto object-cover" />
  );
}