import { BlockComponent } from "@/lib/types/blocks";
import { Card as UICard, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface RenderCardProps {
  component: Partial<BlockComponent>;
}

export function RenderCard({ component }: RenderCardProps) {
  return (
    <UICard className={cn("w-full max-w-md", component.className)}>
      {component.title && (
        <CardHeader>
          <CardTitle>{component.title}</CardTitle>
        </CardHeader>
      )}
      {component.content && (
        <CardContent>
          <p>{component.content}</p>
        </CardContent>
      )}
    </UICard>
  );
}