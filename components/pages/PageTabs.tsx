import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditPage } from "@/components/actions/EditPage";
import { Page } from "@/types/page";

interface PageTabsProps {
  pages: Page[];
  selectedPage: Page;
  setSelectedPage: (page: Page) => void;
  setOpen: (open: boolean) => void;
}

export function PageTabs({ pages, selectedPage, setSelectedPage, setOpen } : PageTabsProps) {
  return (
    <div className="flex justify-between items-center">
      <TabsList>
        {pages.map((page) => (
          <TabsTrigger key={page.id} className="px-5" value={page.id} onClick={() => setSelectedPage(page)}>
            {page.title}
          </TabsTrigger>
        ))}
      </TabsList>
      <EditPage pages={pages} onAddBlockClick={() => setOpen(true)} />
    </div>
  );
}
