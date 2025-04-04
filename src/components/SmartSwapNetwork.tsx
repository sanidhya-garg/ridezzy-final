import React, { useEffect, useState } from "react";
import indiaMap from "../assets/map.png"; // Import the map image

const Counter: React.FC<{ label: string; target: number; step: number }> = ({ label, target, step }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev < target ? prev + step : target));
    }, 200);

    return () => clearInterval(interval);
  }, [target, step]);

  return (
    <div className="text-center">
      <h3 className="text-4xl font-bold">{count}+</h3>
      <p className="text-lg">{label}</p>
    </div>
  );
};

const SmartSwapNetwork: React.FC = () => {
  return (
    <section id="smart-swap-network" className="bg-yellow-500 text-black p-10 rounded-lg text-center relative">
      <h2 className="text-3xl font-bold">Smart Swap Network</h2>
      <p className="mt-4 max-w-2xl mx-auto">
        Mooving's battery swap stations are seamlessly connected to the cloud, ensuring real-time tracking,
        intelligent demand forecasting, and optimized battery availability. Our network dynamically adapts to rider
        demand, ensuring that a reliable, high-charge battery is always accessible when needed.
      </p>
      <div className="flex justify-center gap-10 mt-6">
        <Counter label="Cities" target={14} step={1} />
        <Counter label="Swapping Stations" target={400} step={10} />
        <Counter label="Fleet Operators" target={40} step={1} />
      </div>
      <button
        className="mt-6 bg-black text-yellow-500 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-800"
        aria-label="Book a callback"
      >
        Book a callback
      </button>
      <img
        src={indiaMap}
        alt="Map of India highlighting battery swap stations"
        className="absolute right-0 bottom-0 opacity-50 max-w-xs"
      />
    </section>
  );
};

export default SmartSwapNetwork;
