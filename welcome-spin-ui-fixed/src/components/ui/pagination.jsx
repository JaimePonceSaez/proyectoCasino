import * as React from "react";
import { cn } from "@/lib/utils";

export function Pagination({ className, children, ...props }) {
  return (
    <nav
      className={cn("flex items-center space-x-2", className)}
      {...props}
    >
      {children}
    </nav>
  );
}

export function PaginationItem({ className, ...props }) {
  return (
    <button
      className={cn(
        "h-9 w-9 flex items-center justify-center rounded-md border text-sm hover:bg-accent",
        className
      )}
      {...props}
    />
  );
}
