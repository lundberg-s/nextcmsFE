"use client";

import { useCmsContext } from "@/lib/context/CmsContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export function PagePreview() {
  const [open, setOpen] = useState(false);
  const { selectedPage } = useCmsContext();

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen && !selectedPage) return;
    setOpen(isOpen);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        <Button variant="default" disabled={!selectedPage}>
          Preview
        </Button>
      </Dialog.Trigger>

      {selectedPage && (
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Title className="sr-only">Preview</Dialog.Title>
            <Dialog.Description className="sr-only">
              {selectedPage.title}
            </Dialog.Description>
            <div className="shadow-lg w-full max-w-screen h-[80vh] flex flex-col overflow-hidden">
              <Dialog.Close asChild>
                <Button className="absolute bottom-4 left-1/2" variant="destructive" size="lg">
                  <X className="w-5 h-5" />
                </Button>
              </Dialog.Close>
              <iframe
                key={selectedPage.slug}
                src={`/${selectedPage.slug}`}
                className="flex-1 w-full h-full border-none"
              />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      )}
    </Dialog.Root>
  );
}
