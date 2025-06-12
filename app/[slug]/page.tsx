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

type Params = Promise<{ slug: string }>

export default async function Page({ params }: { params: Params }) {
  const page = await api.pages.get.slug((await params).slug);

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