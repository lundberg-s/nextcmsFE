"use client";

import { BlockProvider } from "@/lib/providers/BlockProvider";
import { usePage } from "@/lib/hooks/usePage";

export default function Home() {
  const { pages, isLoadingPages } = usePage();

  if (isLoadingPages) {
    return <div>Loading...</div>;
  }

  const homePage = pages?.find((page) => page.slug === "home");

  if (!homePage) {
    return <div>Home page not found</div>;
  }

  return (
    <main>
      <div>
        {homePage?.blocks.map((block) => (
          <BlockProvider key={block.id} block={block} />
        ))}
      </div>
    </main>
  );
}