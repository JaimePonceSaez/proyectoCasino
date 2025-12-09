import * as React from "react";
import { cn } from "@/lib/utils";

export function Toast({ className, title, description, ...props }) {
  return (
    <div
      className={cn(
        "rounded-md border bg-background p-4 shadow-lg",
        className
      )}
      {...props}
    >
      {title && <p className="font-medium">{title}</p>}
      {description && (
        <p className="text-sm text-muted-foreground mt-1">
          {description}
        </p>
      )}
    </div>
  );
}
