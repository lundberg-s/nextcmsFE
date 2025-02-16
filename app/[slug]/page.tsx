"use client";

import { useEffect, useMemo, useState } from "react";
import { useCms } from "@/hooks/useCms";
import { BlockProvider } from "@/utils/BlockProvider";
import { useCmsContext } from "@/lib/context/CmsContext";
import { useRouter } from "next/navigation";
import type { Page } from "@/types/page";

export default function Page({ params }: { params: { slug: string } }) {
  const { pages, isLoadingPages } = useCms();
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
