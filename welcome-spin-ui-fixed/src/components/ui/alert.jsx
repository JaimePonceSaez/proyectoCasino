import * as React from "react";
import { cn } from "@/lib/utils";

export function Alert({ className, ...props }) {
  return (
    <div
      role="alert"
      className={cn(
        "w-full rounded-lg border p-4 text-sm shadow-sm bg-background text-foreground",
        className
      )}
      {...props}
    />
  );
}

export function AlertTitle({ className, ...props }) {
  return (
    <h5
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    />
  );
}

export function AlertDescription({ className, ...props }) {
  return (
    <div className={cn("text-sm opacity-90", className)} {...props} />
  );
}
