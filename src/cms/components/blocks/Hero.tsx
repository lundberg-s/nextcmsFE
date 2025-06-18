import { ElementItem } from "@/cms/features/element/ElementItem";
import { getBlockStyles } from "@/cms/lib/utilities/getBlockStyles";

interface HeroProps {
  block: Block;
}

export function Hero({ block }: HeroProps) {
  const { content, style } = block;

  const {
    backgroundColor,
    textColor,
    height,
    backgroundImage,
    waveOverlay,

  } = getBlockStyles(style);

  const imageWithText = Object.entries(content || {}).filter(
    ([type]) => type === "image" || type === "text"
  );

  const Element: React.FC<{ type: ElementType; value: ContentElement }> = ({
    type,
    value,
  }) => {
    return (
      <ElementItem
        mode="render"
        key={type}
        type={type as ContentType}
        value={value}
        kind="content"
        onChange={() => {}}
        onRemove={() => {}}
      />
    );
  };

  return (
    <div
      className={`w-full h-full flex items-center justify-center overflow-hidden`}
      style={{position: "relative", ...textColor, ...backgroundColor, ...backgroundImage, ...height }}
    >
    {style?.overlay?.overlayPatternHeight && (
       <div
        style={{ ...waveOverlay } as React.CSSProperties}
      />
    )}
     
      {imageWithText.length > 0 ? (
        <div className="container flex flex-col lg:flex-row">
          {imageWithText.map(([type, value]) => (
            <div key={type} className="flex-1 flex items-center justify-center">
              <Element type={type as ElementType} value={value} />
            </div>
          ))}
        </div>
      ) : (
        content &&
        Object.entries(content).map(([type, value]) => (
          <Element key={type} type={type as ElementType} value={value} />
        ))
      )}
    </div>
  );
}
