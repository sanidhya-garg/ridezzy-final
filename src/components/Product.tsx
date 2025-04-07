import React, { useState } from "react";

interface Product {
  name: string;
  description: string;
  image: string;
  cta: string;
}

const products: Product[] = [
  {
    name: "Wynn XP",
    description: "It’s intelligent. It’s easy-to-ride. It’s for everyone. India’s first EasyMo is here!",
    image: "/images/wynn.png",
    cta: "Know More",
  },
  {
    name: "Miracle NV",
    description: "Redefining smart commutes with smooth electric experience and next-gen design.",
    image: "/images/miracle.png",
    cta: "Explore",
  },
  {
    name: "DeX NV",
    description: "Built for delivery excellence with optimized cargo solutions and battery performance.",
    image: "/images/dex.png",
    cta: "Learn More",
  },
  {
    name: "Battery",
    description: "Powering every ride with swappable, fast-charging and efficient EV battery tech.",
    image: "/images/battery.png",
    cta: "See Tech",
  },
];

export default function ProductSection() {
  const [selected, setSelected] = useState(0);
  const current = products[selected];

  return (
    <section className="bg-[#e6eff7] min-h-screen py-16 px-6 md:px-20 relative overflow-hidden">
      {/* Product Tabs */}
      <div className="flex justify-center gap-8 mb-12 flex-wrap">
        {products.map((product, idx) => (
          <button
            key={product.name}
            onClick={() => setSelected(idx)}
            className={`text-lg md:text-xl font-semibold tracking-wide relative pb-1 ${
              selected === idx
                ? "text-black after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-1 after:w-full after:rounded-full after:border-2 after:border-[#00CFFF]"
                : "text-gray-500 hover:text-black"
            } transition-all`}
          >
            {product.name}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
        {/* Text Content */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-black">{current.name}</h2>
          <p className="text-lg text-gray-700 max-w-lg">{current.description}</p>
          <button className="bg-[#00CFFF] hover:bg-[#00b9e1] transition text-white px-6 py-3 font-semibold rounded">
            {current.cta}
          </button>
        </div>

        {/* Product Image with Big Word in Background */}
        <div className="relative w-full flex justify-center items-center">
          <span className="absolute text-[120px] md:text-[200px] font-black text-white opacity-20 z-0">
            {current.name.split(" ")[0]}
          </span>
          <img
            src={current.image}
            alt={current.name}
            className="relative z-10 max-h-[300px] md:max-h-[420px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}
