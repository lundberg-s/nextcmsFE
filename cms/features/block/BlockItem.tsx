'use client';

import { Hero } from '@/cms/features/block/blocks/Hero';
import { Experimental } from '@/cms/features/block/blocks/Experimental';
import { Features } from '@/cms/features/block/blocks/Features';

interface BlockItemProps {
  block: Block;
}

export function BlockItem({ block }: BlockItemProps) {

  const BLOCK_OPTIONS: { [key: string]: React.ElementType<{ block: Block; }> } = {
    hero: Hero,
    features: Features,
    experimental: Experimental,
  };

  const Block = block.type ? BLOCK_OPTIONS[block.type] : null;
  
  if (!Block) {
    return null;
  }

  return <Block block={block} />;
}
