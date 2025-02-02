"use client";

import { useState } from "react";
import { nanoid } from "nanoid";
import { Plus } from "lucide-react";
import { Block, BlockType } from "@/types/blocks";
import { Button } from "@/components/ui/button";
import { Page } from "@/types/page";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useAdminStore } from "@/lib/store/admin-store";

interface AddBlockModalProps {
  selectedPage: Page | null;
}

const blockTypes = ["hero", "features"] as const;

export function AddBlockModal({ selectedPage }: AddBlockModalProps) {
  const { addBlock } = useAdminStore();
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<BlockType | null>(null);

  const handleAddBlock = () => {
    if (selectedType && selectedPage?.id) {
      const newBlock: Omit<Block, "id"> & { pageId: string } = {
        type: selectedType,
        content: {
          title: "Testdata",
          description: "",
          cta: { text: "", link: "" },
          items: [],
        },
        settings: {},
        pageId: selectedPage?.id,
      };
      addBlock(newBlock);
      setOpen(false);
      setSelectedType(null);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" /> Add Block
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Block Type</DialogTitle>
            <DialogDescription>
              Choose which type of block you want to add.
            </DialogDescription>
          </DialogHeader>
          <Command>
            <CommandInput placeholder="Search block type..." />
            <CommandList>
              <CommandEmpty>No block type found.</CommandEmpty>
              <CommandGroup heading="Block Types">
                {blockTypes.map((type) => (
                  <CommandItem
                    key={type}
                    onSelect={() => setSelectedType(type)}
                    className={
                      selectedType === type ? "command-item-selected" : ""
                    }
                  >
                    {type}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <div className="flex justify-end mt-4">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleAddBlock}
              disabled={!selectedType}
            >
              Add
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
