// app/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useAdminStore } from "@/lib/store/admin-store";
import { useCms } from "@/hooks/useCms";
import { BlockProvider } from "@/utils/BlockProvider";
import { useRouter } from "next/navigation";
import type { Page } from "@/types/page";

export default function Page({ params }: { params: { slug: string } }) {
  const { pages, blocks, setSelectedPage } = useCms();
  const [page, setPage] = useState<Page | null>(null);
  const router = useRouter();

  useEffect(() => {
    const foundPage = pages.find((p) => p.slug === params.slug);
    setPage(foundPage || null);

    if (foundPage) {
      setSelectedPage(foundPage);
    } else {
      router.push("/404");
    }
  }, [params.slug, pages, blocks, router, setSelectedPage]);

  if (!page) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-fluid">
        {page.blocks.map((block) => (
          <BlockProvider key={block.id} block={block} />
        ))}
      </div>
    </div>
  );
}
