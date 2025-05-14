import React from "react";

import { Label } from "@/cms/components/ui/label";
import { Input } from "@/cms/components/ui/input";
import { Button } from "@/cms/components/ui/button";
import { PlusCircle } from "lucide-react";
interface EditCarouselComponentProps {
  data: Partial<Element>;
  onChange: (key: string, value: string | string[]) => void;
}

export function EditCarousel({ data, onChange }: EditCarouselComponentProps) {
  const urls =
    data.urls && data.urls.length > 0 ? data.urls : [""];

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
    <>
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
    </>
  );
}
