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
import { PageForm } from './PageForm';
import { useState } from 'react';
import { useAdminStore } from '@/lib/store/admin-store';

interface AddPageModalProps {
  pages: Page[];
}

export function AddPageModal({ pages }: AddPageModalProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setSelectedPage } = useAdminStore();

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
            <PageForm onClose={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
  );
}