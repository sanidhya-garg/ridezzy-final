import React from "react";
import image from "../assets/img_9118-removebg-preview (1).png";

export default function ProductSection() {
  const product = {
    name: "BANA",
    description: "Revolutionizing urban mobility with futuristic design and unmatched efficiency.",
    image: image,
    cta: "Discover BANA",
  };

  return (
    <section className="bg-[#e6eff7] min-h-screen py-16 px-6 md:px-20 relative overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
        {/* Text Content */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-black">{product.name}</h2>
          <p className="text-lg text-gray-700 max-w-lg">{product.description}</p>
          <button className="bg-[#00CFFF] hover:bg-[#00b9e1] transition text-white px-6 py-3 font-semibold rounded">
            {product.cta}
          </button>
        </div>

        {/* Product Image with Big Word in Background */}
        <div className="relative w-full flex justify-center items-center">
          <span className="absolute text-[120px] md:text-[200px] font-black text-white opacity-20 z-0">
            {product.name}
          </span>
          <img
            src={product.image}
            alt={product.name}
            className="relative z-10 max-h-[500px] md:max-h-[600px] object-contain w-full md:w-[90%]"
          />
        </div>
      </div>
    </section>
  );
}
