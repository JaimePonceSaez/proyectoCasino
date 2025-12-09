import * as React from "react";
import { cn } from "@/lib/utils";

export function Table({ className, ...props }) {
  return (
    <table
      className={cn(
        "w-full text-sm border-collapse",
        className
      )}
      {...props}
    />
  );
}

export function TableHeader({ className, ...props }) {
  return (
    <thead
      className={cn("bg-muted text-foreground", className)}
      {...props}
    />
  );
}

export function TableBody({ className, ...props }) {
  return <tbody className={cn("", className)} {...props} />;
}

export function TableRow({ className, ...props }) {
  return (
    <tr
      className={cn(
        "border-b hover:bg-accent transition-colors",
        className
      )}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }) {
  return (
    <th
      className={cn("px-4 py-2 text-left font-medium", className)}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }) {
  return (
    <td
      className={cn("px-4 py-2", className)}
      {...props}
    />
  );
}
