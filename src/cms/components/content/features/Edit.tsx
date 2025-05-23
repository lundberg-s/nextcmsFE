import React from "react";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Button } from "@/shared/ui/button";
import { PlusCircle } from "lucide-react";
import TextareaField from "../../text-input/TextareaField";

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesElement {
  features: FeatureItem[];
  highlighted?: number;
}

interface EditFeaturesComponentProps {
  data: FeaturesElement;
  onChange: (key: keyof FeaturesElement, value: any) => void;
}

export function EditFeatures({ data, onChange }: EditFeaturesComponentProps) {
  const features = Array.isArray(data.features) && data.features.length > 0
    ? data.features
    : [{ icon: "", title: "", description: "" }];

  const handleFeatureChange = (idx: number, key: keyof FeatureItem, value: string) => {
    const updated = features.map((f, i) =>
      i === idx ? { ...f, [key]: value } : f
    );
    onChange("features", updated);
  };

  return (
    <>
      {features.map((feature, idx) => (
        <div key={idx} className="mb-4 border p-2 rounded space-y-2">
          <Label>Icon</Label>
          <Input
            value={feature.icon}
            onChange={e => handleFeatureChange(idx, "icon", e.target.value)}
            placeholder="Icon name or URL"
          />
          <Label>Title</Label>
          <Input
            value={feature.title}
            onChange={e => handleFeatureChange(idx, "title", e.target.value)}
            placeholder="Feature title"
          />
          <TextareaField
            id="description"
            name="description"
            label="Description"
            value={feature.description}
            onChange={e => handleFeatureChange(idx, "description", e.target.value)}
            placeholder="Feature description"
          />
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() =>
          onChange("features", [
            ...features,
            { icon: "", title: "", description: "" },
          ])
        }
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Feature
      </Button>
    </>
  );
}