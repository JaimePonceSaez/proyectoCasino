import * as React from "react";
import { cn } from "@/lib/utils";

export function Form({ className, onSubmit, ...props }) {
  return (
    <form
      className={cn("space-y-4", className)}
      onSubmit={onSubmit}
      {...props}
    />
  );
}

export function FormField({ className, ...props }) {
  return <div className={cn("flex flex-col space-y-1", className)} {...props} />;
}

export function FormLabel({ className, ...props }) {
  return (
    <label className={cn("text-sm font-medium", className)} {...props} />
  );
}

export function FormMessage({ className, ...props }) {
  return (
    <p className={cn("text-xs text-muted-foreground", className)} {...props} />
  );
}
