"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Page } from "@/types/page";
import { Block } from "@/types/blocks";
import { BlockRenderer } from "./Blockrenderer";
import { EditPageOptions } from "@/components/actions/EditPageOptions";

interface PageRendererProps {
  pages: Page[];
  blocks: Block[];
  selectedPage: Page | null;
  setSelectedPage: (page: Page | null) => void;
  setOpen: (open: boolean) => void;
  setSelectedBlock: (block: any) => void;
  handleDeleteBlock: (id: string) => void;
  confirmDeleteBlock: () => void;
}

export function PageRenderer({
  pages,
  selectedPage,
  setSelectedPage,
  setSelectedBlock,
  setOpen,
  handleDeleteBlock,
  confirmDeleteBlock,
}: PageRendererProps) {
  return (
    <div className="">
      <Tabs
        defaultValue={selectedPage?.id || pages[0]?.id}
        onValueChange={(value) =>
          setSelectedPage(pages.find((page) => page.id === value) || null)
        }
      >
        <div className="flex justify-between items-center">
          <TabsList>
            {pages.map((page) => (
              <TabsTrigger key={page.id} className="px-5" value={page.id}>
                {page.title}
              </TabsTrigger>
            ))}
          </TabsList>
          <EditPageOptions pages={pages} onAddBlockClick={() => setOpen(true)} />
        </div>
        {pages.map((page) => (
          <TabsContent key={page.id} value={page.id}>
            <TabsContent key={page.id} value={page.id}>
              <BlockRenderer
                blocks={page.blocks}
                onEditBlock={setSelectedBlock}
                onDeleteBlock={handleDeleteBlock}
                confirmDeleteBlock={confirmDeleteBlock}
              />
            </TabsContent>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
