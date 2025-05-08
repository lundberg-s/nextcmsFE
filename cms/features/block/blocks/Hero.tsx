import { ElementItem } from "@/cms/features/element/ElementItem";

interface HeroProps {
  block: Block;
}

export function Hero({ block }: HeroProps) {
  const { content, config } = block;

  const colours = {
    backgroundColor: config?.backgroundColor || "",
    color: config?.textColor || "",
  };

  const backgroundImage = config?.backgroundImage
    ? {
        backgroundImage: `url(${config?.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {};

  const imageContent = Object.entries(content || {}).filter(
    ([type]) => type === "image"
  );
  const textContent = Object.entries(content || {}).filter(
    ([type]) => type === "text"
  );

  return (
    <div
      className={`min-h-[600px] w-full h-full flex items-center justify-center`}
      style={{ ...colours, ...backgroundImage }}
    >
      {imageContent.length > 0 && textContent.length > 0 ? (
        <div className="container flex flex-col lg:flex-row w-full h-full ">
          <div className="flex-1 flex items-center justify-center">
            {imageContent.map(([type, value]) => (
              <ElementItem
                mode="render"
                key={type}
                type={type as ElementType}
                component={value}
                kind="content"
              />
            ))}
          </div>

          <div className="flex-1 flex items-center justify-center">
            {textContent.map(([type, value]) => (
              <ElementItem
                mode="render"
                key={type}
                type={type as ElementType}
                component={value}
                kind="content"
              />
            ))}
          </div>
        </div>
      ) : (
        content &&
        Object.entries(content).map(([type, value]) => (
          <ElementItem
            mode="render"
            key={type}
            type={type as ElementType}
            component={value}
            kind="content"
          />
        ))
      )}
    </div>
  );
}