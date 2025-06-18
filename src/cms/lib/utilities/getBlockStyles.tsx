export function getBlockStyles(style: Block["style"] = {}) {
  const backgroundColor = style?.background?.backgroundColor
    ? { backgroundColor: style.background.backgroundColor }
    : {};

  const textColor = style?.text?.textColor
    ? { color: style.text.textColor }
    : {};

  const height =
    style?.size?.height
      ? { minHeight: `${style.size.height}px` }
      : { minHeight: "600px" };


  const backgroundImage = style?.background?.backgroundImage
      ? {
        backgroundImage: `${
          style?.overlay?.overlayOpacity
            ? `conic-gradient(rgba(0, 0, 255, 0.${style.overlay.overlayOpacity}) 0 100%),`
            : ""
        }url(${style.background.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {};

  const rawHeight = style?.overlay?.overlayPatternHeight;
  const overlayHeight =
    typeof rawHeight === "string" ? parseInt(rawHeight, 10) : rawHeight;

  const overlayType = style?.overlay?.overlayPatternType || "curve";

  let waveSVG = "";

  if (overlayHeight) {
    if (overlayType === "zigzag") {
      waveSVG = `data:image/svg+xml,%3csvg viewBox='0 0 1440 ${overlayHeight}' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3e%3cpath fill='white' d='M0,0 L360,${overlayHeight} L720,0 L1080,${overlayHeight} L1440,0 L1440,${overlayHeight} L0,${overlayHeight} Z' /%3e%3c/svg%3e`;
    } else if (overlayType === "multiple") {
      waveSVG = `data:image/svg+xml,%3csvg viewBox='0 0 1440 ${overlayHeight}' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3e%3cpath fill='white' fill-opacity='0.3' d='M0,${overlayHeight} C360,${overlayHeight - 40} 1080,${overlayHeight + 40} 1440,${overlayHeight} L1440,${overlayHeight} L0,${overlayHeight} Z' /%3e%3cpath fill='white' fill-opacity='0.6' d='M0,${overlayHeight - 20} C360,${overlayHeight + 20} 1080,${overlayHeight - 60} 1440,${overlayHeight - 20} L1440,${overlayHeight} L0,${overlayHeight} Z' /%3e%3cpath fill='white' d='M0,${overlayHeight - 40} C360,${overlayHeight} 1080,${overlayHeight - 80} 1440,${overlayHeight - 40} L1440,${overlayHeight} L0,${overlayHeight} Z' /%3e%3c/svg%3e`;
    } else {
      // Default: curve
      waveSVG = `data:image/svg+xml,%3csvg viewBox='0 0 1440 ${overlayHeight}' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3e%3cpath fill='white' d='M0,30 C360,150 1080,-20 1440,30 L1440,180 L0,180 Z' /%3e%3c/svg%3e`;
    }
  }

  const waveOverlay = overlayHeight
    ? {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "200px",
      backgroundImage: `url("${waveSVG}")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      pointerEvents: "none",
      zIndex: 10,
    }
    : {};

  return {
    backgroundColor,
    textColor,
    height,
    backgroundImage,
    waveOverlay,
  };
}
