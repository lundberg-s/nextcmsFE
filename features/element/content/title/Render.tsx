import { BlockComponent } from "@/lib/types/blocks";

interface TitleProps {
  component: Partial<BlockComponent>;
}

export function RenderTitle({ component }: TitleProps) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {component.title || "Title"}
    </h1>
  );
}