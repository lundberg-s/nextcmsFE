
import { Card as UICard, CardHeader, CardTitle, CardContent } from "@/cms/components/ui/card";
import { cn } from "@/cms/lib/utils";

interface RenderCardProps {
  data: Partial<Element>;
}

export function RenderCard({ data }: RenderCardProps) {
  return (
    <UICard className={cn("w-full max-w-md", data.className)}>
      {data.title && (
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
        </CardHeader>
      )}
      {data.content && (
        <CardContent>
          <p>{data.content}</p>
        </CardContent>
      )}
    </UICard>
  );
}