"use client";

import { useEffect, useMemo, useState } from "react";
import { usePage } from "@/cms/lib/hooks/usePage";
import { BlockProvider } from "@/cms/lib/providers/BlockProvider";
import { useCmsContext } from "@/cms/lib/context/CmsContext";
import { useRouter } from "next/navigation";
import type { Page } from "@/cms/lib/types/page";

export default function Page({ params }: { params: { slug: string } }) {
  const { pages, isLoadingPages } = usePage();
  const { setSelectedPage, selectedPage } = useCmsContext();
  const router = useRouter();

  const foundPage = useMemo(
    () => pages.find((p) => p.slug === params.slug),
    [pages, params.slug]
  );

  useEffect(() => {
    if (pages.length === 0) {
      return;
    }

    if (foundPage) {
      setSelectedPage(foundPage);
    } else {
      router.push("/404");
    }
  }, [foundPage, pages, router, setSelectedPage]);

  if (isLoadingPages) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-fluid">
        {selectedPage?.blocks.map((block) => (
          <BlockProvider key={block.id} block={block} />
        ))}
      </div>
    </div>
  );
}
