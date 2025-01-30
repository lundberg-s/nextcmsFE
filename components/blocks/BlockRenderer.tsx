'use client';

import { Block } from '@/types/blocks';
import { Hero } from './Hero';
import { Features } from './Features';
import { useAdminStore } from '@/lib/store/admin-store';

interface BlockRendererProps {
  block: Block;
}

export function BlockRenderer({ block }: BlockRendererProps) {
  const { setSelectedBlock } = useAdminStore();

  const components: { [key: string]: React.ComponentType<{ block: Block; onEdit: () => void }> } = {
    hero: Hero,
    features: Features,
  };

  const Component = components[block.type];
  
  if (!Component) {
    return null;
  }

  return <Component block={block} onEdit={() => setSelectedBlock(block)} />;
}
