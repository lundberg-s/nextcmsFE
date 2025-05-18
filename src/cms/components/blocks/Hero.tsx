import { ElementItem } from "@/cms/features/element/ElementItem";

interface HeroProps {
  block: Block;
}

export function Hero({ block }: HeroProps) {
  const { content, config } = block;

  const colours = {
    backgroundColor: config?.backgroundColor || "",
    color: config?.textColor || "",
    mask: config?.mask
      ? `linear-gradient(red calc(100% - ${config.mask}), transparent)`
      : undefined,
  };

  const overlayAlpha = config?.overlayAlpha ?? 0

  const coloredOverlay = "backgrund-color: hsl(from #ff0000 h s 30% / 1);";

  const backgroundImage = config?.backgroundImage
    ? {
      backgroundImage: `
      conic-gradient(hsl(0 0% 100% / ${overlayAlpha}) 0 0),
      url(${config?.backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }
    : {};

  const imageWithText = Object.entries(content || {}).filter(
    ([type]) => type === "image" || type === "text"
  );

  const Element: React.FC<{ type: ElementType; value: string }> = ({ type, value }) => {
    return (
      <ElementItem
        mode="render"
        key={type}
        type={type}
        component={value}
        kind="content"
      />
    );
  };


  return (
    <div
      className={`min-h-[600px] w-full h-full flex items-center justify-center`}
      style={{ ...colours, ...backgroundImage }}
    >
      {imageWithText.length > 0 ? (
        <div className="container flex flex-col lg:flex-row">
          {imageWithText.map(([type, value]) => (
            <div
              key={type}
              className="flex-1 flex items-center justify-center"
            >
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