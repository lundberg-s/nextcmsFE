"use client";

import { useEffect, useState } from "react";
import { useAdminStore } from "@/lib/store/admin-store";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { Block } from "@/types/blocks";
import { Button } from "@/components/ui/button";
import DesktopNavbar from "@/components/navigation/DesktopNavbar";
import Link from "next/link";

export default function Home() {
  const { blocks, pages, setSelectedPage, fetchPages, fetchBlocks } = useAdminStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchPages();
      await fetchBlocks();
      setIsLoading(false);
    };
    fetchData();
  }, [fetchPages, fetchBlocks]);

  const homePage = pages.find((page) => page.slug === "home") as { blocks: Block[]; title: string } | undefined;

  return (
    <main>
      <div className="container mx-auto px-4 py-8 flex justify-end items-center">
        <DesktopNavbar />
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      </div>

      {isLoading ? (
        <div>Loading...</div> 
      ) : homePage ? (
        <div className="my-8">
          <h1>{homePage.title}</h1>

          <div>
            {homePage.blocks.map((block: Block, index: number) => (
              <BlockRenderer key={index} block={block} />
            ))}
          </div>
        </div>
      ) : (
        <p>No home page found. Please create one.</p> // No homepage fallback
      )}
    </main>
  );
}
