export function uuid() {
  return `${Date.now()}_${Math.random()
    .toString()
    .replace('.', '')}`;
}
