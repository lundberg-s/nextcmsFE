import { useCms } from "@/hooks/useCms";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export function PageTabs() {
    const { pages } = useCms();

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
