import * as React from "react";
import { cn } from "@/lib/utils";

export function Command({ className, ...props }) {
  return (
    <div
      className={cn(
        "flex h-10 w-full items-center rounded-md border px-3 text-sm shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export function CommandInput({ className, ...props }) {
  return (
    <input
      className={cn(
        "w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

export function CommandList({ className, ...props }) {
  return (
    <div className={cn("mt-2 max-h-60 overflow-y-auto", className)} {...props} />
  );
}

export function CommandItem({ className, ...props }) {
  return (
    <div
      className={cn(
        "cursor-pointer rounded-md px-3 py-2 text-sm hover:bg-accent",
        className
      )}
      {...props}
    />
  );
}
