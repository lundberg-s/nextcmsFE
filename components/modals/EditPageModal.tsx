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
import { useCmsContext } from "@/lib/context/CmsContext"
import { useState } from "react";
import { EditPageForm } from "../forms/EditPageForm";

export function EditPageModal() {
  const [open, setOpen] = useState(false);
  const { selectedPage } = useCmsContext();
  

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
          <DialogTitle>Edit this page</DialogTitle>
          <DialogDescription>Make changes to your page here.</DialogDescription>
        </DialogHeader>
        <EditPageForm page={selectedPage} onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
