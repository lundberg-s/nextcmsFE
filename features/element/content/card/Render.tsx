import { Element } from "@/lib/types/blocks";
import { Card as UICard, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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