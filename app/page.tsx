"use client";

import { BlockProvider } from "@/lib/providers/BlockProvider";
import { usePage } from "@/lib/hooks/usePage";
import LoadingView from "@/components/LoadingView";

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