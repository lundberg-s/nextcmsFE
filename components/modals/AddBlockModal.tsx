// components/AddBlockModal.tsx
'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

interface AddBlockModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedType: string | null;
  setSelectedType: (type: string | null) => void;
  onAddBlock: () => void;
}

const blockTypes = ['hero', 'features'] as const;

export function AddBlockModal({
  open,
  onOpenChange,
  selectedType,
  setSelectedType,
  onAddBlock,
}: AddBlockModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Block Type</DialogTitle>
          <DialogDescription>
            Choose which type of block you want to add.
          </DialogDescription>
        </DialogHeader>
        <Command>
          <CommandInput placeholder="Search block type..." />
          <CommandList>
            <CommandEmpty>No block type found.</CommandEmpty>
            <CommandGroup heading="Block Types">
              {blockTypes.map((type) => (
                <CommandItem
                  key={type}
                  onSelect={() => setSelectedType(type)}
                  className={selectedType === type ? 'command-item-selected' : ''}
                >
                  {type}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        <div className="flex justify-end mt-4">
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="default" onClick={onAddBlock} disabled={!selectedType}>
            Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}