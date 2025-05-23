import React from "react";

interface RenderTextProps {
  data: TextElement;
}

export function RenderText({ data }: RenderTextProps) {
  const TitleTag = data?.titleTag || "h1";
  
  const textBackground = {
    backgroundColor: `hsl(from #fff h s 50% / ${data?.opacity || 0})`,
  }

  return (
    <div style={{...textBackground}} className="h-full w-full text-left flex flex-col justify-center p-8">
      <div className="space-y-2">
      {data?.title && <TitleTag>{data?.title}</TitleTag>}

      {data?.description && (
        <p className="whitespace-pre-wrap">{data?.description}</p>
      )}
      </div>

      <div className="flex justify-left gap-4 pt-8">
        {data?.cta1 && data?.cta1.label && (
          <a
            href={data?.cta1.link}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            {data?.cta1.label}
          </a>
        )}
        {data?.cta2 && data?.cta2.label && (
          <a
            href={data?.cta2.link}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            {data?.cta2.label}
          </a>
        )}
      </div>
    </div>
  );
}