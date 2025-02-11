"use client";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useCms } from "@/hooks/useCms";
import { BlockList } from "./BlockList";
import { AddBlockModal } from "@/components/modals/AddBlockModal";
import { AddPageModal } from "@/components/modals/AddPageModal";
import { EditPageModal } from "@/components/modals/EditPageModal";
import { PagePreview } from "./PagePreview";
import { PageTabs } from "./PageTabs";
import { PageSettings } from "@/components/wrappers/PageSettings";
import { CMSPageHeader } from "@/components/wrappers/CMSPageHeader";

export function PageManager({}) {
  const { pages, selectedPage, setSelectedPage } = useCms();

  return (
    <div className="container mx-auto px-4 py-8">
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
    </div>
  );
}
