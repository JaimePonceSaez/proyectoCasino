import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

export const Sheet = SheetPrimitive.Root;
export const SheetTrigger = SheetPrimitive.Trigger;

export const SheetOverlay = React.forwardRef(
  ({ className, ...props }, ref) => (
    <SheetPrimitive.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm",
        className
      )}
      {...props}
    />
  )
);

SheetOverlay.displayName = "SheetOverlay";

export const SheetContent = React.forwardRef(
  ({ side = "right", className, children, ...props }, ref) => (
    <SheetPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-50 bg-background p-6 shadow-lg transition",
        side === "right" &&
          "inset-y-0 right-0 w-80 translate-x-0",
        side === "left" &&
          "inset-y-0 left-0 w-80",
        side === "top" &&
          "inset-x-0 top-0 h-80",
        side === "bottom" &&
          "inset-x-0 bottom-0 h-80",
        className
      )}
      {...props}
    >
      {children}
    </SheetPrimitive.Content>
  )
);

SheetContent.displayName = "SheetContent";
