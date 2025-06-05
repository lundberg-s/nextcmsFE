export function getBlockHeight(style?: Block["style"]) {
  return {
    minHeight: style?.height ? `${style.height}px` : "600px",
  };
}