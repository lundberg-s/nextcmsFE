import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import TextareaField from "@/cms/components/text-input/TextareaField";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/shared/ui/select";
import React from "react";
import { Slider } from "@/shared/ui/slider";

interface EditTextComponentProps {
  data: TextElement;
  onChange: (key: string, value: any) => void;
}

export function EditText({ data, onChange }: EditTextComponentProps) {
  return (
    <>
      <Label>Title</Label>
      <Input
        value={data.title || ""}
        onChange={(e) => onChange("title", e.target.value)}
        placeholder="Enter title"
      />

      <Label>Title Tag</Label>
      <Select
        value={data.titleTag || "h1"}
        onValueChange={(value) => onChange("titleTag", value)}
      >
        <SelectTrigger className="w-full">{data.titleTag?.toUpperCase() || "H1"}</SelectTrigger>
        <SelectContent>
          {["h1", "h2", "h3", "h4", "h5", "h6"].map((tag) => (
            <SelectItem key={tag} value={tag}>
              {tag.toUpperCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <TextareaField
        id="description"
        name="description"
        label="Description"
        value={data.description || ""}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange("description", e.target.value)}
        placeholder="Enter description"
      />
      <Label>CTA 1 Label</Label>
      <Input
        value={data.cta1?.label || ""}
        onChange={(e) =>
          onChange("cta1", { ...data.cta1, label: e.target.value })
        }
        placeholder="Enter CTA 1 label"
      />
      <Label>CTA 1 Link</Label>
      <Input
        value={data.cta1?.link || ""}
        onChange={(e) =>
          onChange("cta1", { ...data.cta1, link: e.target.value })
        }
        placeholder="Enter CTA 1 link"
      />

      <Label>CTA 2 Label</Label>
      <Input
        value={data.cta2?.label || ""}
        onChange={(e) =>
          onChange("cta2", { ...data.cta2, label: e.target.value })
        }
        placeholder="Enter CTA 2 label"
      />
      <Label>CTA 2 Link</Label>
      <Input
        value={data.cta2?.link || ""}
        onChange={(e) =>
          onChange("cta2", { ...data.cta2, link: e.target.value })
        }
        placeholder="Enter CTA 2 link"
      />
        <div className="pt-2 flex justify-between">
      <Label>Background Opacity </Label>
      <Label>{[Number(data.opacity) || 0]}</Label>
      </div>
      <div className="py-4">
      <Slider
        min={0}
        max={1}
        step={0.01}
        value={[Number(data.opacity) || 0]}
        onValueChange={(value: number[]) => onChange("opacity", value[0])}
      />
      </div>
    </>
  );
}