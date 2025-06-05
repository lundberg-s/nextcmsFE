import Image from "next/image";
import ImagePreview from "public/ELEMENT_IMAGE_ICON.png"

export function PreviewImage() {
  return (
    <Image src={ImagePreview} alt="Title Preview" width={500} height={200} className="w-full rounded-md h-auto object-cover" />
  );
}