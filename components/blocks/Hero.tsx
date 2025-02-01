'use client';

import { Block } from '@/types/blocks';
import { Button } from '@/components/ui/button';

interface HeroProps {
  block: Block;
  onEdit: () => void;
}

export function Hero({ block, onEdit }: HeroProps) {
  const { content, settings } = block;

  return (
    <div
      className={`min-h-[600px] flex items-center justify-center ${
        settings?.backgroundColor || 'bg-background'
      } ${settings?.textColor || ''}`}
      style={{
        ...(settings?.backgroundImage && {
          backgroundImage: `url(${settings?.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }),
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-black">{content.title}</h1>
          <p className="text-xl mb-8 text-black">{content.description}</p>
          {content.cta && (
            <Button asChild size="lg">
              <a href={content.cta.link}>{content.cta.text}</a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
