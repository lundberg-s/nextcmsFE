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

interface PageListProps {
  pages: Page[];
}

export function PageList({ pages }: PageListProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setSelectedPage } = useAdminStore();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Pages</h2>
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
      </div>
      <div className="grid grid-cols-1 gap-4">
        {pages.map((page) => (
          <div key={page.id} className="flex items-center justify-between rounded-md border p-4">
            <div>
              <h3 className="text-lg font-medium">{page.title}</h3>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={() => router.push(`/${page.slug}`)}>
                View
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setSelectedPage(page)}>
                Edit
              </Button>
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}