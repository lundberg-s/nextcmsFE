import { Preview } from ".";

interface PreviewContentItemProps {
  type: ElementType;
  kind: ElementKind;
  isSelected?: boolean;
  onSelect?: (type: ElementType) => void;
}

const PREVIEW_LIST = {
  title: Preview.Title,
  description: Preview.Description,
  button: Preview.Button,
  input: Preview.Input,
  separator: Preview.Separator,
  card: Preview.Card,
  carousel: Preview.Carousel,
  image: Preview.Image,
  text: Preview.Text,
  features: Preview.Features,
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
      className={`group relative p-6 transition-colors flex flex-col justify-center items-center cursor-pointer ${
        isSelected 
          ? "bg-primary/10" 
          : "border-border hover:border-muted-foreground"
      }`}
    >
      <input 
        type="radio"
        className="sr-only"
        value={type}
        checked={isSelected}
        onChange={() => onSelect && onSelect(type as ElementType)}
      />
      <div className="border-primary/25 rounded-md border mb-2">
        <PreviewComponent />
      </div>
      <span className="text-sm font-medium absolute bottom-2">
        {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
      </span>
      <div className={`absolute inset-0 bg-primary/5 opacity-0 ${
        !isSelected ? "group-hover:opacity-100" : ""
      } rounded-lg transition-opacity`} />
    </label>
  );
}