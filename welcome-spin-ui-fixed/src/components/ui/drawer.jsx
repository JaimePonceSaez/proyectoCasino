import * as React from "react";
import * as DrawerPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

export const Drawer = DrawerPrimitive.Root;
export const DrawerTrigger = DrawerPrimitive.Trigger;

export const DrawerOverlay = React.forwardRef(
  ({ className, ...props }, ref) => (
    <DrawerPrimitive.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 bg-black/50 backdrop-blur-sm z-40",
        className
      )}
      {...props}
    />
  )
);
DrawerOverlay.displayName = "DrawerOverlay";

export const DrawerContent = React.forwardRef(
  ({ className, children, side = "right", ...props }, ref) => (
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-50 bg-background p-6 shadow-lg transition",
        side === "right" &&
          "inset-y-0 right-0 w-80 transform slide-in-from-right",
        side === "left" &&
          "inset-y-0 left-0 w-80 transform slide-in-from-left",
        className
      )}
      {...props}
    >
      {children}
    </DrawerPrimitive.Content>
  )
);

DrawerContent.displayName = "DrawerContent";
