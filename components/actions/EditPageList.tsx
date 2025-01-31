// components/EditPageList.tsx
'use client';
import { Page } from '@/types/page';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAdminStore } from '@/lib/store/admin-store';

interface EditPageListProps {
  pages: Page[];
}

export function EditPageList({ pages }: EditPageListProps) {
  const router = useRouter();
  const { setSelectedPage, selectedPage } = useAdminStore();

  return (
    <div className="space-y-4">
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