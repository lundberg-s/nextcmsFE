import { ElementKind, ElementType } from "@/cms/lib/types/blocks";
import { Preview } from "./content";

interface PreviewContentItemProps {
  type: ElementType;
  kind: ElementKind;
  isSelected: boolean;
  onSelect: (type: ElementType) => void;
}

const PREVIEW_LIST = {
  title: Preview.Title,
  description: Preview.Description,
  button: Preview.Button,
  input: Preview.Input,
  separator: Preview.Separator,
  card: Preview.Card,
  carousel: Preview.Carousel,
} as const;

export function PreviewContentItem({
  type,
  isSelected,
  onSelect,
}: Omit<PreviewContentItemProps, "type"> & { type: keyof typeof PREVIEW_LIST | string }) {
  const PreviewComponent = PREVIEW_LIST[type as keyof typeof PREVIEW_LIST];

  if (!PreviewComponent) {
    return null;
  }

  return (
    <label
      className={`group relative p-8 rounded-lg border transition-colors flex flex-col justify-center items-center cursor-pointer ${
        isSelected 
          ? "border-primary bg-primary/10" 
          : "border-border hover:border-muted-foreground"
      }`}
    >
      <input 
        type="radio"
        className="sr-only"
        value={type}
        checked={isSelected}
        onChange={() => onSelect(type as ElementType)}
      />
      <div className="mb-2">
        <PreviewComponent />
      </div>
      <span className="text-sm font-medium absolute bottom-2">
        {type}
      </span>
      <div className={`absolute inset-0 bg-primary/5 opacity-0 ${
        !isSelected ? "group-hover:opacity-100" : ""
      } rounded-lg transition-opacity`} />
    </label>
  );
}