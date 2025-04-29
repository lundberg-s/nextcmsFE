import { usePage } from "@/cms/lib/hooks/usePage";
import { useCmsContext } from "@/cms/lib/context/CmsContext";
import { TabsList, TabsTrigger } from "@/cms/components/ui/tabs";

export function PageTabs() {
  const { pages } = usePage();
  const { setSelectedPage, selectedPage } = useCmsContext();

  return (
    <TabsList>
      {pages.map((page) => (
        <TabsTrigger
          onClick={() => setSelectedPage(page)}
          key={page.id}
          className="px-5"
          value={page.id}
        >
          {page.title}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
