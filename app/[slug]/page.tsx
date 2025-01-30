// app/[slug]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useAdminStore } from '@/lib/store/admin-store';
import { BlockRenderer } from '@/components/blocks/BlockRenderer';
import { useRouter } from 'next/navigation';

export default function Page({ params }: { params: { slug: string } }) {
  const { pages, blocks, setSelectedPage } = useAdminStore();
  const [page, setPage] = useState<Page | null>(null);
  const [pageBlocks, setPageBlocks] = useState<Block[]>([]);
  const router = useRouter();

  useEffect(() => {
    const foundPage = pages.find((p) => p.slug === params.slug);
    setPage(foundPage);

    if (foundPage) {
      setSelectedPage(foundPage);
      const blocksForPage = blocks.filter((block) => foundPage.blocks.includes(block.id));
      setPageBlocks(blocksForPage);
    } else {
      // Redirect to a 404 page if the slug is not found
      router.push('/404');
    }
  }, [params.slug, pages, blocks, router, setSelectedPage]);

  if (!page) {
    return <div>Loading...</div>; // Show a loading state while fetching the page
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {pageBlocks.map((block) => (
          <BlockRenderer key={block.id} block={block} />
        ))}
      </div>
    </div>
  );
}