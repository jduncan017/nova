export function cn(
  ...args: (string | false | undefined | Record<string, boolean>)[]
) {
  return args
    .flatMap((arg) => {
      if (!arg) return [];
      if (typeof arg === "string") return [arg];
      if (typeof arg === "object") {
        return Object.entries(arg)
          .filter(([_, value]) => value)
          .map(([key]) => key);
      }
      return [];
    })
    .join(" ");
}
