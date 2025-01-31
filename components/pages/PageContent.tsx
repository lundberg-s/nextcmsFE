import { TabsContent } from "@/components/ui/tabs";
import { EditBlockList } from "@/components/actions/EditBlockList";

interface PageContentProps {
  pages: any[];
  setSelectedBlock: (block: any) => void;
  handleDeleteBlock: (id: string) => void;
  confirmDeleteBlock: () => void;
}

export function PageContent({ pages, setSelectedBlock, handleDeleteBlock, confirmDeleteBlock } : PageContentProps) {
  return (
    <>
      {pages.map((page) => (
        <TabsContent key={page.id} value={page.id}>
          <EditBlockList blocks={page.blocks} onEditBlock={setSelectedBlock} onDeleteBlock={handleDeleteBlock} confirmDeleteBlock={confirmDeleteBlock} />
        </TabsContent>
      ))}
    </>
  );
}
