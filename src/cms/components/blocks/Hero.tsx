import { ElementItem } from "@/cms/features/element/ElementItem";

interface HeroProps {
  block: Block;
}

export function Hero({ block }: HeroProps) {
  const { content, style } = block;

  const colours = {
    backgroundColor: style?.backgroundColor || "",
    color: style?.textColor || "",
    // mask: style?.mask
    //   ? `linear-gradient(red calc(100% - ${style.mask}), transparent)`
    //   : undefined,
  };

  const size = {
    minHeight: style?.height ? `${style.height}px` : "600px",
  };

  // const overlayAlpha = style?.overlayAlpha ?? 0;

  const coloredOverlay = "backgrund-color: hsl(from #ff0000 h s 30% / 1);";

  const gradient = "conic-gradient(hsl(0 0% 100% / ${overlayAlpha}) 0 0),";

  const backgroundImage = style?.backgroundImage
    ? {
        backgroundImage: `
      url(${style?.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {};

  const waveSVG = `data:image/svg+xml,%3csvg viewBox='0 0 1440 ${style?.waveOverlay}' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3e%3cpath fill='white' d='M0,30 C360,150 1080,-20 1440,30 L1440,180 L0,180 Z' /%3e%3c/svg%3e`;

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
      style={{ ...colours, ...backgroundImage, ...size }}
    >
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "200px",
          backgroundImage: `url("${waveSVG}")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          pointerEvents: "none",
        }}
      />
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
