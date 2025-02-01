// components/PageList.tsx
"use client";
import { Page } from "@/types/page";
import { Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { AddPageForm } from "@/components/forms/AddPageForm";
import { useState } from "react";

interface EditPageModalProps {
  selectedPage: Page | null;
}

export function EditPageModal({ selectedPage }: EditPageModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex items-center gap-0.5">
        <Button className="no-right-radius w-32 cursor-default">
          {selectedPage?.title}
        </Button>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)} className="no-left-radius px-2">
            <Settings className="h-4 w-4" />
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Page</DialogTitle>
          <DialogDescription>
            Create a new page by filling out the form below.
          </DialogDescription>
        </DialogHeader>
        <AddPageForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
