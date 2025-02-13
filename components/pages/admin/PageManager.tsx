"use client";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useCms } from "@/hooks/useCms";
import { useCmsContext } from "@/lib/context/CmsContext"
import { BlockList } from "./BlockList";
import { AddBlockModal } from "@/components/modals/AddBlockModal";
import { AddPageModal } from "@/components/modals/AddPageModal";
import { EditPageModal } from "@/components/modals/EditPageModal";
import { PagePreview } from "./PagePreview";
import { PageTabs } from "./PageTabs";
import { PageSettings } from "@/components/wrappers/PageSettings";
import { CMSPageHeader } from "@/components/wrappers/CMSPageHeader";
import { useEffect } from "react";
import { Scroll } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export function PageManager({}) {
  const { pages, blocks } = useCms();
  const { setSelectedPage } = useCmsContext();

  useEffect(() => {
    console.log('pages updated', pages)
  }, [pages])

  return (
    <div className="w-[90%] mx-auto px-4 py-8">
      <ScrollArea className="w-full h-full">
      <Tabs
        defaultValue={
          pages.find((page) => page.slug === "home")?.id || undefined
        }
        onValueChange={(value) =>
          setSelectedPage(pages.find((page) => page.id === value) || null)
        }
      >
        <CMSPageHeader>
          <PageTabs />
          <PageSettings>
            <AddPageModal />
            <AddBlockModal />
            <PagePreview />
            <EditPageModal />
          </PageSettings>
        </CMSPageHeader>

        {pages.map((page) => (
          <TabsContent key={page.id} value={page.id}>
            <BlockList blocks={page.blocks} />
          </TabsContent>
        ))}
      </Tabs>

      </ScrollArea>
    </div>
  );
}
