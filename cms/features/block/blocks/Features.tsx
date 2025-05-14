'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/cms/components/ui/card';

interface FeaturesProps {
  block: Block;
}

export function Features({ block }: FeaturesProps) {
  const { content, config } = block;

  return (
    <div
      className={`py-20 bg-${config?.backgroundColor || 'bg-background'}`}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{content.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* {content.items?.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{item.description}</p>
              </CardContent>
            </Card>
          ))} */}
        </div>
      </div>
    </div>
  );
}
