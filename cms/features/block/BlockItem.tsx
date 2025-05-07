'use client';

import { Block } from '@/cms/lib/types/blocks';
import { Hero } from '@/cms/components/blocks/Hero';
import { Features } from '@/cms/components/blocks/Features';

interface BlockItemProps {
  block: Block;
}

export function BlockItem({ block }: BlockItemProps) {

  const BLOCK_OPTIONS: { [key: string]: React.ElementType<{ block: Block; }> } = {
    hero: Hero,
    features: Features,
  };

  const Block = block.type ? BLOCK_OPTIONS[block.type] : null;
  
  if (!Block) {
    return null;
  }

  return <Block block={block} />;
}
