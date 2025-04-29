"use client";

import { BlockProvider } from "@/cms/lib/providers/BlockProvider";
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
          <BlockProvider key={block.id} block={block} />
        ))}
      </div>
    </main>
    </LoadingView>
  );
}