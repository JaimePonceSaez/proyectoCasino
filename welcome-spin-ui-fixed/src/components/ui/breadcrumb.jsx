import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export function Breadcrumb({ className, ...props }) {
  return (
    <nav
      className={cn("flex items-center space-x-1 text-sm", className)}
      {...props}
    />
  );
}

export function BreadcrumbItem({ className, ...props }) {
  return <span className={cn("flex items-center", className)} {...props} />;
}

export function BreadcrumbSeparator({ className, ...props }) {
  return (
    <ChevronRight
      className={cn("h-4 w-4 opacity-50", className)}
      {...props}
    />
  );
}

export function BreadcrumbLink({ className, ...props }) {
  return (
    <a
      className={cn("hover:underline text-foreground", className)}
      {...props}
    />
  );
}

export function BreadcrumbPage({ className, ...props }) {
  return (
    <span
      className={cn("font-semibold text-foreground", className)}
      {...props}
    />
  );
}
