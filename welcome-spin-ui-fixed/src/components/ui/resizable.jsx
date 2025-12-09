import * as React from "react";
import { cn } from "@/lib/utils";

export function Resizable({ className, children, ...props }) {
  return (
    <div
      className={cn("resize overflow-auto rounded-md border p-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}
