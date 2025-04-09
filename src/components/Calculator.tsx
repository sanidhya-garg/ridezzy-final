/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Slider } from "../components/slider"; // Replace with your own Slider if not using shadcn
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const brandingOptions: { label: string; key: keyof typeof costPerBranding }[] = [
  { label: "T-shirt", key: "tshirt" },
  { label: "Helmet", key: "helmet" },
  { label: "Front Box", key: "front" },
  { label: "Back Box", key: "back" },
];

const costPerBranding = {
  tshirt: 100,
  helmet: 80,
  front: 120,
  back: 150,
};

const impressionsPerBranding = {
  tshirt: 3000,
  helmet: 2000,
  front: 3500,
  back: 4000,
};

export default function Calculator() {
  const [selected, setSelected] = useState<(keyof typeof costPerBranding)[]>(["tshirt"]);
  const [scooters, setScooters] = useState<number>(50);

  const toggleOption = (key: keyof typeof costPerBranding) => {
    setSelected(prev =>
      prev.includes(key) ? prev.filter(item => item !== key) : [...prev, key]
    );
  };

  const totalCost = selected.reduce(
    (acc, key) => acc + costPerBranding[key] * scooters,
    0
  );

  const totalImpressions = selected.reduce(
    (acc, key) => acc + impressionsPerBranding[key] * scooters,
    0
  );

  const adComparisons = [
    { name: "Meta", cost: totalImpressions * 0.05 },
    { name: "Google", cost: totalImpressions * 0.06 },
    { name: "YouTube", cost: totalImpressions * 0.04 },
    { name: "Ridezzy", cost: totalCost },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h2 className="text-4xl font-bold text-gray-900 text-center mb-10">
        Ridezzy Ad Cost Calculator
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Scooter Slider */}
          <div>
            <label className="block mb-2 text-lg font-semibold text-gray-800">
              Number of Scooters: <span className="text-yellow-500">{scooters}</span>
            </label>
            <Slider
              defaultValue={[scooters]}
              min={50}
              max={200}
              step={50}
              onValueChange={([val]: [number]) => setScooters(val)}
              className="w-full"
            />
            <div className="flex justify-between mt-2 text-sm text-gray-500 px-1">
              {[50, 100, 150, 200].map(v => (
                <span key={v}>{v}</span>
              ))}
            </div>
          </div>

          {/* Branding Option Selectors */}
          <div>
            <label className="block mb-3 text-lg font-semibold text-gray-800">
              Select Branding Options:
            </label>
            <div className="flex flex-wrap gap-3">
              {brandingOptions.map(({ label, key }) => (
                <button
                  key={key}
                  onClick={() => toggleOption(key)}
                  className={`px-5 py-2 rounded-full border-2 transition-all duration-300 text-sm font-medium ${
                    selected.includes(key)
                      ? "bg-yellow-400 text-black border-yellow-500"
                      : "bg-gray-100 text-gray-600 border-gray-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Estimated Impressions / Month</p>
              <p className="text-3xl font-bold text-gray-900">
                {totalImpressions.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Monthly Cost (₹)</p>
              <p className="text-3xl font-bold text-gray-900">
                ₹{totalCost.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Bar Chart */}
        <div className="h-[28rem] w-full">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Ad Platform Cost Comparison
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={adComparisons}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(val: any) => `₹${val.toFixed(0)}`} />
              <Bar
                dataKey="cost"
                label={{ position: "top", fill: "#000", fontSize: 12 }}
              >
                {adComparisons.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.name === "Ridezzy" ? "#facc15" : "#d1d5db"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
