import React from "react";
import SettingsWrapper from "@/components/wrappers/SettingsWrapper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
interface CarouselComponentProps {
  component: any;
  onChange: (field: string, value: string | string[]) => void;
}

export function Carousel({ component, onChange }: CarouselComponentProps) {
  const urls =
    component.urls && component.urls.length > 0 ? component.urls : [""];

  const inputs = urls.map((url: string, i: number) => (
    <div key={i} className="space-y-2">
      <Label>Image URL {i + 1}</Label>
      <Input
        value={url || ""}
        onChange={(e) => {
          const newUrls = [...urls];
          newUrls[i] = e.target.value;
          onChange("urls", newUrls);
        }}
        placeholder="https://example.com/image.jpg"
      />
    </div>
  ));
  return (
    <SettingsWrapper>
      {inputs}
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => onChange("urls", [...urls, ""])}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Image URL
      </Button>
    </SettingsWrapper>
  );
}
