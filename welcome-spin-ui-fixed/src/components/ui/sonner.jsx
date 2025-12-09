import * as React from "react";
import { Toaster as SonnerToaster, toast } from "sonner";
import { useTheme } from "next-themes";

export function Toaster() {
  const { theme = "system" } = useTheme();

  return (
    <SonnerToaster
      theme={theme}
      className="toaster"
      richColors
      closeButton
      expand
    />
  );
}

export { toast };
