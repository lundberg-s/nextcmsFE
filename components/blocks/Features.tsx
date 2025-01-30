'use client';

import { Block } from '@/types/blocks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FeaturesProps {
  block: Block;
  onEdit: () => void;
}

export function Features({ block, onEdit }: FeaturesProps) {
  const { content, settings } = block;

  return (
    <div
      className={`py-20 ${settings?.backgroundColor || 'bg-background'}`}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{content.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.items?.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
