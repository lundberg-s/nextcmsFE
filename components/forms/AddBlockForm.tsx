import { Block, BlockComponent, ComponentType } from "@/types/blocks";
import { useAdminStore } from "@/lib/store/admin-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { ComponentLibrary } from "./ComponentLibrary";
import { SettingsForm } from "./SettingsForm";
import { generateId } from "@/utils/GenerateId";
import { SettingsLibrary } from "./SettingsLibrary";

interface AddBlockFormProps {
  block: Block | null;
}

export function AddBlockForm({ block }: AddBlockFormProps) {
  const { updateBlock, setSelectedBlock } = useAdminStore();
  const { register, handleSubmit, reset, setValue, watch } = useForm<Block>({
    defaultValues: {},
  });

  const settings = watch("settings");

  useEffect(() => {
    if (block) {
      reset(block);
    }
  }, [block, reset]);

  const onSubmit = (data: Block) => {
    if (block) {
      updateBlock(block.id, data);
      setSelectedBlock(null);
    }
  };

  const handleAddComponent = (type: ComponentType) => {
    const newComponent = {
      [type]: "",
    };

    setValue("settings", {
      ...watch("settings"),
      ...newComponent,
    });
  };

  const handleUpdateComponent = (type: ComponentType, value: string) => {
    setValue(`settings.${type}`, value);
  };

  const handleRemoveComponent = (type: string) => {
    const currentSettings: Record<string, string> = watch("settings") || {};
    const newSettings = { ...currentSettings };
    delete newSettings[type as keyof typeof newSettings];
    setValue("settings", newSettings);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <Input id="title" type="text" {...register("content.title")} />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <Textarea id="description" {...register("content.description")} />
        </div>
        <div>
          <label htmlFor="ctaText" className="block text-sm font-medium">
            CTA Text
          </label>
          <Input id="ctaText" type="text" {...register("content.cta.text")} />
        </div>
        <div>
          <label htmlFor="ctaLink" className="block text-sm font-medium">
            CTA Link
          </label>
          <Input id="ctaLink" type="text" {...register("content.cta.link")} />
        </div>
        <div className="space-y-4">
          {settings &&
            Object.entries(settings).map(([type, value]) => (
              <SettingsForm
                key={type}
                type={type}
                value={value as string}
                kind="setting"
                onChange={handleUpdateComponent}
                onRemove={() => handleRemoveComponent(type)}
              />
            ))}
        </div>
      </div>

      <div className="space-y-4">
        <ComponentLibrary onSelect={handleAddComponent} />
        <SettingsLibrary onSelect={handleAddComponent} />
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => setSelectedBlock(null)}
        >
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
