export function getBlockBackgroundImage(style?: Block["style"]) {
  return style?.background?.backgroundImage
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
}