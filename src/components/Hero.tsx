import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import bikeVideo from "../assets/vecteezy_men-bike-riding-animation-on-green-screen-background_55473922 (1).mp4";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.play().catch(e => console.log("Video play prevented:", e));
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Full-screen video - completely unobstructed */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={bikeVideo} type="video/mp4" />
      </video>

      {/* Minimalist UI elements */}
      <div className="relative z-10 h-full flex flex-col justify-between p-6">
        {/* Top-left badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="self-start border-2 border-yellow-300 rounded-full px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="text-sm font-medium text-yellow-300 flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
            ELECTRIC DELIVERY
          </span>
        </motion.div>

        {/* Centered title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          
         
        </motion.div>

        {/* Bottom info blocks */}
        <div className="grid grid-cols-3 gap-4">
          {/* Business block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border-2 border-white/20 rounded-lg p-4 text-center"
          >
            <div className="text-yellow-300 text-2xl font-bold mb-1">5K+</div>
            <div className="text-white text-sm">Business Partners</div>
          </motion.div>

          {/* Cities block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="border-2 border-white/20 rounded-lg p-4 text-center"
          >
            <div className="text-yellow-300 text-2xl font-bold mb-1">28</div>
            <div className="text-white text-sm">Cities Served</div>
          </motion.div>

          {/* CTA block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="border-2 border-yellow-300 rounded-lg p-4 text-center"
          >
            <button className="text-yellow-300 text-sm font-medium">
              Get Started →
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;