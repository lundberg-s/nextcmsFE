'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface AdminHeaderProps {
  onAddBlockClick: () => void;
}

export function AdminHeader({ onAddBlockClick }: AdminHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">CMS Admin</h1>
      <Button onClick={onAddBlockClick}>
        <Plus className="mr-2 h-4 w-4" /> Add Block
      </Button>
    </div>
  );
}
