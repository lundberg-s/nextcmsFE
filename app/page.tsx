"use client";

import { useEffect, useState } from "react";
import { useAdminStore } from "@/lib/store/admin-store";
import { BlockProvider } from "@/utils/BlockProvider";
import { Block } from "@/types/blocks";

export default function Home() {
  const { pages, setSelectedPage, getPages, getBlocks } = useAdminStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await getPages();
      setIsLoading(false);
    };
    fetchData();
  }, [getPages, getBlocks]);

  const homePage = pages.find((page) => page.slug === "home") as { blocks: Block[]; title: string } | undefined;

  return (
    <main>
      {isLoading ? (
        <div>Loading...</div> 
      ) : homePage ? (
          <div>
            {homePage.blocks.map((block: Block, index: number) => (
              <BlockProvider key={index} block={block} />
            ))}
          </div>

      ) : (
        <p>No home page found. Please create one.</p>
      )}
    </main>
  );
}
