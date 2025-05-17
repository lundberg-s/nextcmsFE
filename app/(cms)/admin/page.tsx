import { PageList } from "@/cms/features/page/PageList";
import { ScrollArea } from "@/shared/ui/scroll-area";

export default function AdminPage() {
  return (
    <div className="min-h-screen max-h-screen bg-gray-200 w-full">
      <ScrollArea className="w-full h-full">
        <PageList />
      </ScrollArea>
    </div>
  );
}
