'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';

interface DeleteConfirmationModalProps {
  deleteBlockId: string | null;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
}

export function DeleteConfirmationModal({
  deleteBlockId,
  onConfirmDelete,
  onCancelDelete,
}: DeleteConfirmationModalProps) {
  return (
    <AlertDialog open={!!deleteBlockId} onOpenChange={onCancelDelete}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this block?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirmDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
