import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroImage from "../assets/RidezzyScooter.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center min-h-screen py-20">
          {/* Left Content */}
          <div className="flex-1 lg:pr-12 text-center lg:text-left">
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              The Future of
              <br />
              <span className="text-yellow-500">EV Logistics</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 mb-10 max-w-xl"
            >
              Transform your delivery business with zero-emission electric vehicles. 
              Start earning more today.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button className="group bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-10 py-5 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center mx-auto lg:mx-0">
                Get Started Now
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* Right Content - Simple Image */}
          <div className="flex-1 lg:pl-12 mt-16 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <img
                src={heroImage}
                alt="Ridezzy EV Scooter"
                className="w-full h-auto max-w-lg mx-auto"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
