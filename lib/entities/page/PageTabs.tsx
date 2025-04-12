import { usePage } from "@/lib/hooks/usePage";
import { useCmsContext } from "@/lib/context/CmsContext";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

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
