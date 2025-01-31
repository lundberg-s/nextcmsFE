'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Page } from '@/types/page';
import { AddPageModal } from './AddPageModal';

interface AdminActionsProps {
  onAddBlockClick: () => void;
  pages: Page[];
}

export function AdminActions({ onAddBlockClick, pages }: AdminActionsProps) {
  return (
    <div className="flex justify-end items-center gap-2">
      <Button onClick={onAddBlockClick}>
        <Plus className="mr-2 h-4 w-4" /> Add Block
      </Button>
      <AddPageModal pages={pages} />
    </div>
  );
}
