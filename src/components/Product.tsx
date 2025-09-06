import { Link } from "react-router-dom";
import image from "../assets/RidezzyScooter.png";
import { Zap, BatteryCharging, Navigation, Clock, MapPin, ArrowRight, Wifi } from "lucide-react";

export default function ProductSection() {
  const product = {
    name: "PULSE",
    description:
      "Revolutionizing urban mobility with cutting-edge technology and sustainable design for the future of delivery.",
    image: image,
    cta: "Discover PULSE",
    features: [
      { icon: <Zap size={20} />, title: "Top Speed", value: "65 km/h" },
      { icon: <BatteryCharging size={20} />, title: "Range", value: "120 km" },
      { icon: <Navigation size={20} />, title: "Smart GPS", value: "Built-in" },
      { icon: <Clock size={20} />, title: "Battery Swap", value: "30 sec" },
    ],
  };

  const batteryFeatures = [
    {
      image: "../assets/battery-image.jpg", // Replace with actual battery image
      icon: <BatteryCharging className="w-8 h-8" />,
    },
    {
      image: "../assets/swap-station-image.jpg", // Replace with actual swap station image
      icon: <MapPin className="w-8 h-8" />,
    },
    {
      image: "../assets/network-app-image.jpg", // Replace with actual network/app image
      icon: <Wifi className="w-8 h-8" />,
    },
    {
      image: "../assets/battery-tech-image.jpg", // Replace with actual battery tech image
      icon: <Zap className="w-8 h-8" />,
    }
  ];

  return (
    <section className="relative bg-white py-12 px-6 md:px-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-[#fff3b3] rounded-full blur-3xl opacity-30 z-0" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-[#fff3b3] rounded-full blur-3xl opacity-20 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        
        {/* Main Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-black text-black mb-3">
            Meet the <span className="text-[#FFD400]">PULSE</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Revolutionary electric scooter with 30-second battery swap technology
          </p>
        </div>

        {/* Unified Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left - Product Info & Specs */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-black">{product.name}</h2>
              <p className="text-base text-gray-800 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Compact Feature Cards Grid */}
            <div className="grid grid-cols-2 gap-3">
              {product.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="bg-[#fff8d0] hover:bg-[#fff3b3] transition-all duration-300 border border-gray-200 hover:border-[#FFD400] rounded-lg p-3 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-2">
                    <div className="text-[#FFD400] bg-white p-1.5 rounded-md">
                      {feat.icon}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-700">{feat.title}</p>
                      <p className="text-sm font-bold text-black">{feat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Compact CTA */}
            <Link to="/pulse">
              <button className="w-full group bg-[#FFD400] hover:bg-[#e6c700] transition-all duration-300 text-black px-6 py-3 text-base font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2">
                <span>{product.cta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>

          {/* Center - Scooter Image */}
          <div className="relative flex justify-center items-center h-[400px]">
            {/* Floating Elements */}
            <div className="absolute top-8 left-0 w-12 h-12 bg-[#fff3b3] rounded-full opacity-40 animate-pulse"></div>
            <div className="absolute bottom-16 right-0 w-8 h-8 bg-[#fff3b3] rounded-full opacity-50 animate-bounce"></div>
            
            {/* Background Text */}
            <span className="absolute text-[80px] md:text-[120px] font-black text-black opacity-5 z-0 select-none leading-none">
              {product.name}
            </span>
            
            {/* Main Image */}
            <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
              <img
                src={product.image}
                alt={product.name}
                className="object-contain h-full w-auto drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Right - Battery Technology */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <p className="text-sm text-gray-700">Battery Swap Ecosystem</p>
            </div>

            {/* 4 Square Images Layout */}
            <div className="grid grid-cols-2 gap-4">
              {batteryFeatures.map((feature, idx) => (
                <div key={idx} className="group">
                  {/* Square Image Placeholder */}
                  <div className="relative w-full h-40 bg-gradient-to-br from-[#fff3b3] to-[#FFD400] rounded-lg overflow-hidden shadow-md">
                    <img
                      src={feature.image}
                      alt={`Battery feature ${idx + 1}`}
                      className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        const sibling = target.nextElementSibling as HTMLElement;
                        target.style.display = 'none';
                        if (sibling) {
                          sibling.style.display = 'flex';
                        }
                      }}
                    />
                    <div className="hidden w-full h-full items-center justify-center text-gray-700">
                      {feature.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
