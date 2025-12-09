import * as React from "react";
import { cn } from "@/lib/utils";

export const Toggle = React.forwardRef(
  ({ className, pressed = false, ...props }, ref) => (
    <button
      ref={ref}
      aria-pressed={pressed}
      className={cn(
        "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
        pressed
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-foreground",
        className
      )}
      {...props}
    />
  )
);

Toggle.displayName = "Toggle";
