import { motion } from "framer-motion";
import { Truck, Users, TrendingUp, Shield } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";
import FleetQuoteModal from "./FleetQuoteModal";

export default function FranchiseProgram() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Initialize Cal.com embed
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"fleet-demo"});
      cal("ui", {
        "cssVarsPerTheme": {
          "light": {"cal-brand": "#FFD400"},
          "dark": {"cal-brand": "#FFD400"}
        },
        "hideEventTypeDetails": false,
        "layout": "month_view"
      });
    })();
  }, []);

  return (
    <section className="py-12 bg-gradient-to-r from-[#FFD400] to-[#FFA500] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 border border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/20 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-white font-medium"
            >
              <Truck className="w-5 h-5 mr-2" />
              B2B Fleet Solutions
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
                RIDEZZY <span className="text-white/90">FLEET</span>
              </h2>
              <p className="text-lg lg:text-xl font-bold text-white/90 mt-1">
                FOR BUSINESSES
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-lg text-white/95 leading-relaxed max-w-lg"
            >
              Revolutionize your delivery operations with our electric scooter fleet. 
              <span className="font-semibold"> Zero fuel costs, maximum efficiency.</span>
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-4"
            >
              <div className="text-center">
                <div className="text-2xl font-black text-white">80%</div>
                <div className="text-xs text-white/80">Cost Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-white">24/7</div>
                <div className="text-xs text-white/80">Fleet Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-white">100+</div>
                <div className="text-xs text-white/80">Partners</div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <button 
                onClick={() => setIsQuoteModalOpen(true)}
                className="bg-white text-[#FFD400] px-6 py-3 rounded-lg text-base font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Get Fleet Quote
              </button>
              <button 
                data-cal-namespace="fleet-demo"
                data-cal-link="ridezzy/fleet-demo"
                data-cal-config='{"layout":"month_view"}'
                className="border-2 border-white text-white px-6 py-3 rounded-lg text-base font-bold hover:bg-white hover:text-[#FFD400] transition-all duration-300"
              >
                Schedule Demo
              </button>
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main Scooter Circle */}
            <div className="relative mx-auto w-64 h-64 lg:w-80 lg:h-80">
              {/* Rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-dashed border-white/30 rounded-full"
              ></motion.div>
              
              {/* Main circle */}
              <div className="absolute inset-3 bg-white rounded-full shadow-xl flex items-center justify-center">
                <img 
                  src="/src/assets/RidezzyScooter.png" 
                  alt="Ridezzy Electric Scooter Fleet"
                  className="w-48 h-48 lg:w-60 lg:h-60 object-contain"
                />
              </div>

              {/* Feature Icons around the circle */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-3 shadow-lg"
              >
                <Users className="w-5 h-5 text-[#FFD400]" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                viewport={{ once: true }}
                className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg"
              >
                <TrendingUp className="w-5 h-5 text-[#FFD400]" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                viewport={{ once: true }}
                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-3 shadow-lg"
              >
                <Shield className="w-5 h-5 text-[#FFD400]" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                viewport={{ once: true }}
                className="absolute top-1/2 -left-3 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg"
              >
                <Truck className="w-5 h-5 text-[#FFD400]" />
              </motion.div>
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 right-8 bg-white/20 backdrop-blur-sm rounded-lg p-3 text-white text-center"
            >
              <div className="font-bold text-sm">Zero Emissions</div>
              <div className="text-xs opacity-80">Eco-Friendly</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute bottom-8 left-8 bg-white/20 backdrop-blur-sm rounded-lg p-3 text-white text-center"
            >
              <div className="font-bold text-sm">24/7 Support</div>
              <div className="text-xs opacity-80">Always Available</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Fleet Quote Modal */}
      <FleetQuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />
    </section>
  );
}
