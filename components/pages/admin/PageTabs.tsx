import { useCms } from "@/hooks/useCms";
import { useCmsContext } from "@/lib/context/CmsContext"
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export function PageTabs() {
    const { pages } = useCms();
    const { setSelectedPage, selectedPage } = useCmsContext();


    console.log('selectedPage', selectedPage)

  return (
    <TabsList>
    {pages.map((page) => (
      <TabsTrigger onClick={() => setSelectedPage(page)} key={page.id} className="px-5" value={page.id}>
        {page.title}
      </TabsTrigger>
    ))}
  </TabsList>
  )
}
