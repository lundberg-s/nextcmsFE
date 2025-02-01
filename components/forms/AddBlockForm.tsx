import { Block, BlockComponent, ComponentType } from "@/types/blocks";
import { useAdminStore } from "@/lib/store/admin-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { ComponentLibrary } from "./ComponentLibrary";
import { ComponentForm } from "./ComponentForm";
import { generateId } from "@/utils/GenerateId";
import { SettingsLibrary } from "./SettingsLibrary";

interface AddBlockFormProps {
  block: Block | null;
}

export function AddBlockForm({ block }: AddBlockFormProps) {
  const { updateBlock, setSelectedBlock } = useAdminStore();
  const { register, handleSubmit, reset, setValue, watch } = useForm<Block>({
    defaultValues: {
      id: "",
      type: "hero",
      content: {
        title: "",
        description: "",
        cta: {
          text: "",
          link: "",
        },
        items: [],
      },
      settings: {
        backgroundColor: "",
        backgroundImage: "",
        textColor: "",
      },
      pageId: "",
    },
  });

  const items = watch("content.items");

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
    const newComponent: BlockComponent = {
      id: generateId(),
      type,
      props: {},
    };
    
    setValue("content.items", [...(items || []), newComponent]);
  };

  const handleUpdateComponent = (index: number, component: BlockComponent) => {
    const newItems = [...(items || [])];
    newItems[index] = component;
    setValue("content.items", newItems);
  };

  const handleRemoveComponent = (index: number) => {
    const newItems = (items || []).filter((_, i) => i !== index);
    setValue("content.items", newItems);
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
        <div>
          <label htmlFor="backgroundColor" className="block text-sm font-medium">
            Background Color
          </label>
          <Input
            id="backgroundColor"
            type="text"
            {...register("settings.backgroundColor")}
          />
        </div>
        <div>
          <label htmlFor="backgroundImage" className="block text-sm font-medium">
            Background Image
          </label>
          <Input
            id="backgroundImage"
            type="text"
            {...register("settings.backgroundImage")}
          />
        </div>
        <div className="space-y-4">
          {items?.map((component, index) => (
            <ComponentForm
              key={component.id}
              component={component}
              onChange={(updated) => handleUpdateComponent(index, updated)}
              onRemove={() => handleRemoveComponent(index)}
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