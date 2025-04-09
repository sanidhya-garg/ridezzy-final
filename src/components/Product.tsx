import React from "react";
import image from "../assets/RidezzyScooter.png";
import { Zap, BatteryCharging, Navigation } from "lucide-react";

export default function ProductSection() {
  const product = {
    name: "BANA",
    description:
      "Revolutionizing urban mobility with futuristic design and unmatched efficiency.",
    image: image,
    cta: "Discover BANA",
    features: [
      { icon: <Zap size={18} />, title: "Top Speed", value: "65 km/h" },
      { icon: <BatteryCharging size={18} />, title: "Range", value: "120 km" },
      { icon: <Navigation size={18} />, title: "Smart Navigation", value: "Built-in GPS" },
      { icon: <Zap size={18} />, title: "Charging Time", value: "2.5 hrs" },
    ],
  };

  return (
    <section className="relative bg-white py-10 px-6 md:px-20 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-[#fff3b3] rounded-full blur-2xl opacity-30 z-0" />
      <div className="absolute bottom-[-80px] right-[-100px] w-[250px] h-[250px] bg-[#fff3b3] rounded-full blur-2xl opacity-30 z-0" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-6">
        {/* Text Side */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-black">{product.name}</h2>
          <p className="text-base text-gray-800 leading-relaxed max-w-lg">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-md">
            {product.features.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 bg-[#fff8d0] px-4 py-2 rounded-md shadow-sm"
              >
                <div className="text-yellow-500">{feat.icon}</div>
                <div>
                  <p className="text-sm text-gray-600">{feat.title}</p>
                  <p className="font-semibold text-black text-sm">{feat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="bg-[#FFD400] hover:bg-[#e6c700] transition text-black px-6 py-2 text-base font-semibold rounded-full shadow">
            {product.cta}
          </button>
        </div>

        {/* Big Image Side */}
        <div className="relative flex justify-center items-center h-[450px]">
          <span className="absolute text-[90px] md:text-[200px] font-black text-black opacity-5 z-0 h-125 select-none">
            {product.name}
          </span>
          <img
            src={product.image}
            alt={product.name}
            className="relative z-10 object-contain h-full w-auto scale-[1.0] -translate-y-4"
          />
        </div>
      </div>
    </section>
  );
}
