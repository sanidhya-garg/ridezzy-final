import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import bgImage from "../assets/hero image.jpg";

const HeroSection = () => {
  const words = [
    "Go Quick in E-Commerce",
    "Powering EV Logistics",
    "Scale Your Fleet with Ease",
  ];
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentWord = words[index];
    if (charIndex < currentWord.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentWord[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 80);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedText("");
        setCharIndex(0);
        setIndex((prev) => (prev + 1) % words.length);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, index]);

  return (
    <div
      className="relative h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-between px-6 py-6"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Centered Hero Content (text aligned left on desktop) */}
      <div className="flex-1 flex items-center">
        <div className="z-10 max-w-2xl text-left mx-auto md:mx-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            {displayedText}
            <span className="animate-pulse">|</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.6 }}
            className="text-lg text-gray-700 font-medium mt-2"
          >
            Accelerating the future of deliveries with seamless efficiency and reliability. Experience logistics designed to keep pace with the speed of modern commerce.
          </motion.p>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-3 gap-4 z-10 mb-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="border-2 border-black/20 rounded-lg p-4 text-center bg-white/50 backdrop-blur-md"
        >
          <div className="text-yellow-300 text-2xl font-bold mb-1">200</div>
          <div className="text-black text-sm">Fleet Size</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="border-2 border-black/20 rounded-lg p-4 text-center bg-white/50 backdrop-blur-md"
        >
          <div className="text-yellow-300 text-2xl font-bold mb-1">28</div>
          <div className="text-black text-sm">Pincodes Served</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="border-2 border-black/20 rounded-lg p-4 text-center bg-white/50 backdrop-blur-md"
        >
          <div className="text-yellow-300 text-2xl font-bold mb-1">1500+</div>
          <div className="text-black text-sm">Deliveries</div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
