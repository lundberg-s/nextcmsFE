
import { Card as UICard, CardHeader, CardTitle, CardContent } from "@/shared/ui/card";
import { cn } from "@/cms/lib/utils";

interface RenderCardProps {
  data: CardElement;
}

export function RenderCard({ data }: RenderCardProps) {
  return (
    <UICard className={cn("w-full max-w-md")}>
      {data.title && (
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
        </CardHeader>
      )}
      {data.description && (
        <CardContent>
          <p>{data.description}</p>
        </CardContent>
      )}
    </UICard>
  );
}