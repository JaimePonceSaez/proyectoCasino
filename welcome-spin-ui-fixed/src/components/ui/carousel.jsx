import * as React from "react";
import * as CarouselPrimitive from "@radix-ui/react-carousel";
import { cn } from "@/lib/utils";

export const Carousel = CarouselPrimitive.Root;

export const CarouselViewport = React.forwardRef(
  ({ className, ...props }, ref) => (
    <CarouselPrimitive.Viewport
      ref={ref}
      className={cn("overflow-hidden rounded-md", className)}
      {...props}
    />
  )
);

CarouselViewport.displayName = "CarouselViewport";

export const CarouselItem = React.forwardRef(
  ({ className, ...props }, ref) => (
    <CarouselPrimitive.Item
      ref={ref}
      className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
      {...props}
    />
  )
);

CarouselItem.displayName = "CarouselItem";

export const CarouselNext = CarouselPrimitive.Next;
export const CarouselPrevious = CarouselPrimitive.Previous;
