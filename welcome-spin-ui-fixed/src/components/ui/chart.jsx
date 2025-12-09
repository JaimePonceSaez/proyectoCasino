import * as React from "react";
import { cn } from "@/lib/utils";

export function ChartContainer({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-background shadow-sm p-4",
        className
      )}
      {...props}
    />
  );
}

export function ChartTitle({ className, ...props }) {
  return (
    <h2 className={cn("text-lg font-semibold mb-2", className)} {...props} />
  );
}

export function ChartDescription({ className, ...props }) {
  return (
    <p className={cn("text-sm text-muted-foreground mb-4", className)} {...props} />
  );
}
