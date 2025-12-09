import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { cn } from "@/lib/utils";

export const ContextMenu = ContextMenuPrimitive.Root;
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

export const ContextMenuContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-2 shadow-md",
        className
      )}
      {...props}
    />
  )
);

ContextMenuContent.displayName = "ContextMenuContent";

export const ContextMenuItem = React.forwardRef(
  ({ className, inset, ...props }, ref) => (
    <ContextMenuPrimitive.Item
      ref={ref}
      className={cn(
        "flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  )
);

ContextMenuItem.displayName = "ContextMenuItem";

export const ContextMenuSeparator = ContextMenuPrimitive.Separator;
export const ContextMenuLabel = ContextMenuPrimitive.Label;
export const ContextMenuCheckboxItem = ContextMenuPrimitive.CheckboxItem;
export const ContextMenuRadioItem = ContextMenuPrimitive.RadioItem;
export const ContextMenuGroup = ContextMenuPrimitive.Group;
export const ContextMenuPortal = ContextMenuPrimitive.Portal;
