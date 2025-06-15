export function getBlockHeight(style?: Block["style"]) {
  return {
    minHeight: style?.size?.height ? `${style.size.height}px` : "600px",
  };
}