import { ElementItem } from "@/cms/features/element/ElementItem";
import { getBlockBackgroundImage } from "@/cms/lib/utilities/getBlockBackgroundImage";
import { getBlockBackgroundColor } from "@/cms/lib/utilities/getBlockBackgroundColor";
import { getBlockHeight } from "@/cms/lib/utilities/getBlockHeight";
import { getBlockWaveOverlay } from "@/cms/lib/utilities/getBlockWaveOverlay";
import { getBlockWaveOverlayStyle } from "@/cms/lib/utilities/getBlockWaveOverlayStyle";
import { getBlockTextColor } from "@/cms/lib/utilities/getBlockTextColor";

interface HeroProps {
  block: Block;
}

export function Hero({ block }: HeroProps) {
  const { content, style } = block;

  const backgroundColor = getBlockBackgroundColor(style);
  const textColor = getBlockTextColor(style);
  const height = getBlockHeight(style);
  const backgroundImage = getBlockBackgroundImage(style);
  const waveSVG = getBlockWaveOverlay(style?.waveOverlay);
  const waveOverlay = getBlockWaveOverlayStyle(style?.waveOverlay, waveSVG);

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
      style={{ ...textColor, ...backgroundColor, ...backgroundImage, ...height }}
    >
    {style?.waveOverlay && (
       <div
        style={waveOverlay}
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
