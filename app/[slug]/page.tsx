import { BlockItem } from "@/cms/features/block/BlockItem";
import { notFound } from "next/navigation";
import { api } from "@/shared/lib/api/api";

export const revalidate = 60;

export async function generateStaticParams() {
  const pages = await api.pages.get.list();
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await api.pages.get.item(params.slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-fluid">
        {page.blocks.map((block) => (
          <BlockItem key={block.id} block={block} />
        ))}
      </div>
    </div>
  );
}