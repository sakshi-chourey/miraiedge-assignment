export function joinClasses(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
