"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAdminStore } from "@/lib/store/admin-store";
import { BlockRenderer } from "./BlockRenderer";
import { AddBlockModal } from "@/components/modals/AddBlockModal";
import { AddPageModal } from "@/components/modals/AddPageModal";
import { EditPageModal } from "@/components/modals/EditPageModal";
import { PagePreview } from "./PagePreview";

export function PageRenderer({}) {
  const { pages, selectedPage, setSelectedPage } = useAdminStore();

  return (
    <div className="">
      <Tabs
        defaultValue={
          pages.find((page) => page.slug === "home")?.id || undefined
        }
        onValueChange={(value) =>
          setSelectedPage(pages.find((page) => page.id === value) || null)
        }
      >
        <div className="flex justify-between items-center pb-2">
          <TabsList>
            {pages.map((page) => (
              <TabsTrigger key={page.id} className="px-5" value={page.id}>
                {page.title}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsList className="flex items-center gap-2">
            <AddPageModal/>
            <AddBlockModal selectedPage={selectedPage} />
            <PagePreview selectedPage={selectedPage} />
            <EditPageModal selectedPage={selectedPage} />
          </TabsList>
        </div>

        {pages.map((page) => (
          <TabsContent key={page.id} value={page.id}>
            <BlockRenderer blocks={page.blocks} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
