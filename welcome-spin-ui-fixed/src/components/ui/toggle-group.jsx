import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "@/lib/utils";
import { toggleVariants } from "@/components/ui/toggle";

const ToggleGroupContext = React.createContext({
  size: "default",
  variant: "default",
});

export const ToggleGroup = React.forwardRef(
  ({ className, size = "default", variant = "default", children, ...props }, ref) => {
    return (
      <ToggleGroupContext.Provider value={{ size, variant }}>
        <ToggleGroupPrimitive.Root
          ref={ref}
          className={cn("flex gap-1", className)}
          {...props}
        >
          {children}
        </ToggleGroupPrimitive.Root>
      </ToggleGroupContext.Provider>
    );
  }
);

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

export const ToggleGroupItem = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { size, variant } = React.useContext(ToggleGroupContext);

    return (
      <ToggleGroupPrimitive.Item
        ref={ref}
        className={cn(toggleVariants({ size, variant }), className)}
        {...props}
      >
        {children}
      </ToggleGroupPrimitive.Item>
    );
  }
);

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;
