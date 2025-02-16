'use client';

import { Block } from '@/types/blocks';
import { Hero } from '@/components/blocks/Hero';
import { Features } from '@/components/blocks/Features';

interface BlockProviderProps {
  block: Block;
}

export function BlockProvider({ block }: BlockProviderProps) {

  const components: { [key: string]: React.ComponentType<{ block: Block; }> } = {
    hero: Hero,
    features: Features,
  };

  const BlockComponent = components[block.type];
  
  if (!BlockComponent) {
    return null;
  }

  return <BlockComponent block={block} />;
}
