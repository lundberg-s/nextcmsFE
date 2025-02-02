"use client";

import { Page } from "@/types/page";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface PagePreviewProps {
  selectedPage: Page | null;
}

export function PagePreview({ selectedPage }: PagePreviewProps) {
  const [open, setOpen] = useState(false);

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
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-semibold">Page Preview</h2>
                <Dialog.Close asChild>
                  <Button variant="ghost" size="icon">
                    <X className="w-5 h-5" />
                  </Button>
                </Dialog.Close>
              </div>
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
