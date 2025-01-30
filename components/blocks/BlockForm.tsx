"use client";
import { Block } from "@/types/blocks";
import { useAdminStore } from "@/lib/store/admin-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

interface BlockFormProps {
  block: Block | null;
}

export function BlockForm({ block }: BlockFormProps) {
  const { updateBlock, setSelectedBlock } = useAdminStore();
  const { register, handleSubmit, reset, setValue } = useForm<Block>({
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
      settings: {},
      pageId: "", 
    },
  });

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
