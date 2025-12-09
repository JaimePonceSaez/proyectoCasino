import * as React from "react";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

export function AspectRatio({ ratio = 1, ...props }) {
  return <AspectRatioPrimitive.Root ratio={ratio} {...props} />;
}
