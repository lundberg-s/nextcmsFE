'use client';

import { Block } from '@/lib/types/blocks';
import { Hero } from '@/components/blocks/Hero';
import { Features } from '@/components/blocks/Features';

interface BlockProviderProps {
  block: Block;
}

export function BlockProvider({ block }: BlockProviderProps) {

  const components: { [key: string]: React.ElementType<{ block: Block; }> } = {
    hero: Hero,
    features: Features,
  };

  const Element = components[block.type];
  
  if (!Element) {
    return null;
  }

  return <Element block={block} />;
}
