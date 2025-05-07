"use client";

import { BlockItem } from "@/cms/features/block/BlockItem";
import { usePage } from "@/cms/lib/hooks/usePage";
import LoadingView from "@/cms/components/LoadingView";

export default function Home() {
  const { pages } = usePage();

  const homePage = pages?.find((page) => page.slug === "home");

  return (
    <LoadingView>
    <main>
      <div>
        {homePage?.blocks.map((block) => (
          <BlockItem key={block.id} block={block} />
        ))}
      </div>
    </main>
    </LoadingView>
  );
}