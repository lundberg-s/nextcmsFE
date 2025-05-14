import { getPageBySlug, getAllPages } from "@/shared/lib/api/ssg";
import { BlockItem } from "@/cms/features/block/BlockItem";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
  const pages = await getAllPages();
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await getPageBySlug(params.slug);

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