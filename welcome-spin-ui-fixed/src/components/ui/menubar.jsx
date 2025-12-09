import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { cn } from "@/lib/utils";

export const Menubar = ({ className, ...props }) => (
  <MenubarPrimitive.Root
    className={cn("flex h-10 items-center space-x-1 rounded-md border p-1", className)}
    {...props}
  />
);

export const MenubarMenu = MenubarPrimitive.Menu;
export const MenubarTrigger = MenubarPrimitive.Trigger;

export const MenubarContent = React.forwardRef(
  ({ className, sideOffset = 8, ...props }, ref) => (
    <MenubarPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-2 text-popover-foreground shadow-md",
        className
      )}
      {...props}
    />
  )
);
MenubarContent.displayName = "MenubarContent";

export const MenubarItem = React.forwardRef(
  ({ className, inset, ...props }, ref) => (
    <MenubarPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  )
);
MenubarItem.displayName = "MenubarItem";

export const MenubarSeparator = MenubarPrimitive.Separator;
export const MenubarLabel = MenubarPrimitive.Label;
export const MenubarCheckboxItem = MenubarPrimitive.CheckboxItem;
export const MenubarRadioItem = MenubarPrimitive.RadioItem;
export const MenubarGroup = MenubarPrimitive.Group;
export const MenubarSub = MenubarPrimitive.Sub;
export const MenubarPortal = MenubarPrimitive.Portal;
export const MenubarSubContent = MenubarPrimitive.SubContent;
export const MenubarSubTrigger = MenubarPrimitive.SubTrigger;
