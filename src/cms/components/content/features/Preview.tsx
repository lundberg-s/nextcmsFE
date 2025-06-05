import Image from "next/image";
import FeaturesPreview from "public/ELEMENT_FEATURES_ICON.png"

export function PreviewFeatures() {
  return (
    <Image src={FeaturesPreview} alt="Title Preview" width={500} height={200} className="w-full rounded-md h-auto object-cover" />
  );
}