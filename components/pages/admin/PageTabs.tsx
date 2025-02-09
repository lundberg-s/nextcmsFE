import { useAdminStore } from "@/lib/store/admin-store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function PageTabs() {
    const { pages } = useAdminStore();

  return (
    <TabsList>
    {pages.map((page) => (
      <TabsTrigger key={page.id} className="px-5" value={page.id}>
        {page.title}
      </TabsTrigger>
    ))}
  </TabsList>
  )
}
