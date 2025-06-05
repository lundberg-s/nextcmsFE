export function getBlockBackgroundImage(style?: Block["style"]) {
  return style?.backgroundImage
    ? {
        backgroundImage: `${
          style?.backgroundOverlay
            ? `conic-gradient(rgba(0, 0, 255, 0.${style.backgroundOverlay}) 0 100%),`
            : ""
        }url(${style.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {};
}