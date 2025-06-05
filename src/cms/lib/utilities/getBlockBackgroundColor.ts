export function getBlockBackgroundColor(style?: Block["style"]) {
  return {
    backgroundColor: style?.backgroundColor || ""
  }
}