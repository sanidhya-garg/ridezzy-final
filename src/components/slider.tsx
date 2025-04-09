// src/components/ui/slider.tsx
import React from "react";

interface SliderProps {
  defaultValue: [number];
  min: number;
  max: number;
  step: number;
  onValueChange: (val: [number]) => void;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  defaultValue,
  min,
  max,
  step,
  onValueChange,
  className = "",
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange([parseInt(e.target.value)]);
  };

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      defaultValue={defaultValue[0]}
      onChange={handleChange}
      className={`w-full ${className}`}
    />
  );
};
