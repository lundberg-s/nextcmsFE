'use client';

import { Block } from '@/types/blocks';
import { Hero } from '../../cms/blocks/Hero';
import { Features } from '../../cms/blocks/Features';
import { useAdminStore } from '@/lib/store/admin-store';

interface BlockProviderProps {
  block: Block;
}

export function BlockProvider({ block }: BlockProviderProps) {
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
