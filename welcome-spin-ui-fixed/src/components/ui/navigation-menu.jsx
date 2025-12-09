import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cn } from "@/lib/utils";

export const NavigationMenu = React.forwardRef(
  ({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.Root
      ref={ref}
      className={cn("relative flex max-w-max flex-1 items-center justify-center", className)}
      {...props}
    />
  )
);
NavigationMenu.displayName = "NavigationMenu";

export const NavigationMenuList = React.forwardRef(
  ({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.List
      ref={ref}
      className={cn("flex items-center space-x-1", className)}
      {...props}
    />
  )
);
NavigationMenuList.displayName = "NavigationMenuList";

export const NavigationMenuItem = NavigationMenuPrimitive.Item;

export const NavigationMenuTrigger = React.forwardRef(
  ({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      className={cn(
        "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
);
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

export const NavigationMenuContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.Content
      ref={ref}
      className={cn("w-full rounded-md border bg-popover p-4 text-popover-foreground shadow-lg", className)}
      {...props}
    />
  )
);
NavigationMenuContent.displayName = "NavigationMenuContent";
