

interface TitleProps {
  data: TitleElement;
}

export function RenderTitle({ data }: TitleProps) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {data.title || "Title"}
    </h1>
  );
}