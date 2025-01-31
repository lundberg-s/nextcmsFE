// components/PageList.tsx
'use client';
import { Page } from '@/types/page';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { AddPageForm } from '@/components/forms/AddPageForm';
import { useState } from 'react';

interface AddPageModalProps {
  pages: Page[];
}

export function AddPageModal({ pages }: AddPageModalProps) {
  const [open, setOpen] = useState(false);

  return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Page
            </Button>
          </DialogTrigger>
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