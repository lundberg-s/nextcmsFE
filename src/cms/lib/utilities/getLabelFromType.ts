export function getLabelFromType(str: string) {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^ /, '')
    .replace(/^\w/, c => c.toUpperCase());
}