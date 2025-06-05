export function getBlockTextColor(style?: Block["style"]) {
  return {
    textColor: style?.textColor || ""
  };
}