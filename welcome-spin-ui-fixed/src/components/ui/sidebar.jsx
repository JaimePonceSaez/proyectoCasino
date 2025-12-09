import * as React from "react";
import { cn } from "@/lib/utils";

export function Sidebar({ className, children, ...props }) {
  return (
    <aside
      className={cn(
        "flex h-full w-64 flex-col border-r bg-background p-4",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  );
}

export function SidebarItem({ className, ...props }) {
  return (
    <div
      className={cn(
        "mb-2 cursor-pointer rounded-md px-3 py-2 text-sm hover:bg-accent",
        className
      )}
      {...props}
    />
  );
}
