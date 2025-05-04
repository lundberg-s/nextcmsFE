import { ElementKind, ElementType } from "@/cms/lib/types/blocks";

interface PreviewConfigItemProps {
  type: ElementType;
  label: string;
  description: string;
  kind: ElementKind;
  isSelected: boolean;
  onSelect: (type: ElementType) => void;
}

export function PreviewConfigItem({
  type,
  label,
  description,
  kind,
  isSelected,
  onSelect,
}: PreviewConfigItemProps) {
  return (
    <label
      key={type}
      className={`flex items-start p-4 border rounded-lg cursor-pointer transition-colors ${
        isSelected
          ? "border-primary bg-primary/10"
          : "border-border hover:border-muted-foreground"
      }`}
    >
      <input
        type="radio"
        className="mt-1 mr-3"
        value={type}
        checked={isSelected}
        onChange={() => onSelect(type as ElementType)}
        name="elementType"
      />
      <div className="flex-1">
        <div className="font-medium">{label}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
      </div>
    </label>
  );
}
