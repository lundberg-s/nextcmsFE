import { notFound } from "next/navigation";
import { BlockItem } from "@/cms/features/block/BlockItem";
import { api } from "@/shared/lib/api/api";

export const revalidate = 60;

export default async function HomePage() {
  const page = await api.pages.get.item("home"); 

  if (!page) notFound();

  return (
    <div className="min-h-screen bg-background">
      <div className="container-fluid">
        {page.blocks.map((block: Block) => (
          <BlockItem key={block.id} block={block} />
        ))}
      </div>
    </div>
  );
}
