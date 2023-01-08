export const classJoin = (classes: (string | undefined)[]) =>
  classes
    .filter(cls => cls) // @ts-ignore
    .map((cls: string) => cls.trim())
    .join(" ");
