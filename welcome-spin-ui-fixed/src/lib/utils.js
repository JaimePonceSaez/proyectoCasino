export function cn(...classes) {
  return classes
    .flatMap((c) => {
      if (!c) return [];
      if (typeof c === "string") return c.split(" ");
      if (Array.isArray(c)) return c;
      if (typeof c === "object")
        return Object.entries(c)
          .filter(([_, value]) => Boolean(value))
          .map(([key]) => key);
      return [];
    })
    .filter(Boolean)
    .join(" ");
}
