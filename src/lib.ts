export function addClass(
  ...classNames: (string | undefined | null | false)[]
): string {
  return classNames.filter(Boolean).join(' ');
}
