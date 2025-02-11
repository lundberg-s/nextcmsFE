"use client";

import { BlockProvider } from "@/utils/BlockProvider";
import { useCms } from "@/hooks/useCms";

export default function Home() {
  const { pages, blocks, isLoadingPages, isLoadingBlocks } = useCms();

  if (isLoadingBlocks || isLoadingPages) {
    return <div>Loading...</div>;
  }

  const homePage = pages?.find((page) => page.slug === "home");

  if (!homePage) {
    return <div>Home page not found</div>;
  }

  const homePageBlocks = blocks.filter((block) => block.pageId === homePage.id);

  return (
    <main>
      <div>
        {homePageBlocks.map((block) => (
          <BlockProvider key={block.id} block={block} />
        ))}
      </div>
    </main>
  );
}
