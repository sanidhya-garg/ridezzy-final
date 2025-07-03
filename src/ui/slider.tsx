import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={`relative flex w-full touch-none select-none items-center ${className}`}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-3 w-full grow overflow-hidden rounded-full bg-gray-100 border border-gray-200">
      <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full" />
    </SliderPrimitive.Track>
    {props.defaultValue?.map((_, i) => (
      <SliderPrimitive.Thumb
        key={i}
        className="block h-6 w-6 rounded-full border-2 border-yellow-500 bg-white shadow-lg hover:shadow-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer hover:scale-110"
      />
    ))}
  </SliderPrimitive.Root>
));

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
