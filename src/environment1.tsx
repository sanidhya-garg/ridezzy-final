import { motion } from "framer-motion";
import { Leaf, Zap, Recycle, Globe, TreePine, Car, Battery, Award } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./components/Footer";

export default function EnvironmentPage() {
  const sdgGoals = [
    {
      icon: <Zap className="w-12 h-12 text-yellow-500" />,
      title: "SDG 7",
      subtitle: "Affordable & Clean Energy",
      text: "Powering sustainable mobility through green battery swaps and renewable energy integration",
    },
    {
      icon: <Globe className="w-12 h-12 text-blue-500" />,
      title: "SDG 11",
      subtitle: "Sustainable Cities",
      text: "Building zero-emission urban transport networks for healthier, more livable communities",
    },
    {
      icon: <Recycle className="w-12 h-12 text-green-500" />,
      title: "SDG 12",
      subtitle: "Responsible Consumption",
      text: "Implementing circular battery economy with 100% recyclable components",
    },
    {
      icon: <TreePine className="w-12 h-12 text-emerald-600" />,
      title: "SDG 13",
      subtitle: "Climate Action",
      text: "Reducing urban carbon footprint through widespread electric vehicle adoption",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-white text-gray-800 pt-20">{/* Added pt-20 to account for fixed navbar */}
        {/* HERO SECTION */}
        <section className="relative flex flex-col items-center justify-center text-center py-16 sm:py-24 lg:py-32 px-4 sm:px-6 bg-gradient-to-br from-slate-50 via-white to-gray-50 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-100 opacity-30"
        />
        
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.25, 0.25, 1] }}
          className="relative z-10 flex flex-col items-center gap-4 sm:gap-6 mb-6 sm:mb-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 200 }}
            className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-lg"
          >
            <Leaf className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-gray-800 leading-tight px-4">
            Driving a{" "}
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Cleaner Future
            </span>
          </h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
          className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl max-w-4xl text-gray-600 leading-relaxed font-light px-4"
        >
          Every Ridezzy scooter on the road replaces a fuel-powered vehicle, reducing carbon emissions and making our cities healthier for generations to come.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.25, 0.25, 0.25, 1] }}
          className="mt-8 sm:mt-12 flex flex-wrap gap-3 sm:gap-6 justify-center px-4"
        >
          <div className="flex items-center gap-2 sm:gap-3 bg-white/90 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-md border border-gray-100">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
            <span className="text-xs sm:text-sm font-semibold text-gray-700">Zero Emissions</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 bg-white/90 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-md border border-gray-100">
            <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
            <span className="text-xs sm:text-sm font-semibold text-gray-700">Sustainable Cities</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 bg-white/90 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-md border border-gray-100">
            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
            <span className="text-xs sm:text-sm font-semibold text-gray-700">UN SDG Aligned</span>
          </div>
        </motion.div>
      </section>

      {/* UN SDG SECTION */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 px-4">
              Our Commitment to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                UN Sustainable Development Goals
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed px-4">
              Ridezzy supports key SDGs to build sustainable, livable cities through innovative electric mobility solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {sdgGoals.map((goal, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 80, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: idx * 0.15, 
                  duration: 0.8, 
                  ease: [0.25, 0.25, 0.25, 1],
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                viewport={{ once: true }}
                className="bg-white shadow-md hover:shadow-xl rounded-2xl p-6 sm:p-8 transition-all duration-500 border border-gray-100 group"
              >
                <div className="mb-4 sm:mb-6 flex justify-center">
                  <div className="p-3 sm:p-4 bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors duration-300">
                    {goal.icon}
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                  {goal.title}
                </h3>
                <h4 className="text-xs sm:text-sm font-semibold text-gray-500 mb-3 sm:mb-4 uppercase tracking-wide">
                  {goal.subtitle}
                </h4>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{goal.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT COUNTERS - COMING SOON */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-white text-center">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 px-4">
              Our Green Impact{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Dashboard
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed px-4">
              We're currently calculating our environmental impact data. Real-time metrics coming soon!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative bg-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-lg border border-gray-100"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-12"
            >
              <div className="inline-flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-green-50 to-emerald-50 px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-green-200 mb-4 sm:mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-green-500 border-t-transparent rounded-full"
                />
                <span className="text-sm sm:text-lg text-gray-700 font-semibold">
                  Calculating environmental impact...
                </span>
              </div>
              
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.8 }}
                viewport={{ once: true }}
                className="h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mx-auto max-w-xs sm:max-w-md"
              />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                { icon: <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />, label: "CO₂ Saved", desc: "Tons of emissions prevented" },
                { icon: <Car className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />, label: "Fuel Saved", desc: "Liters of fuel conserved" },
                { icon: <Battery className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />, label: "Green Miles", desc: "Zero-emission kilometers" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + idx * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <div className="p-2 sm:p-3 bg-white rounded-full shadow-sm">
                      {item.icon}
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-800 text-base sm:text-lg mb-1 sm:mb-2">{item.label}</h4>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">{item.desc}</p>
                  <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "60%" }}
                      transition={{ delay: 1.5 + idx * 0.2, duration: 1 }}
                      viewport={{ once: true }}
                      className="h-full bg-gradient-to-r from-gray-400 to-gray-500 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 0.6, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
              className="absolute top-4 sm:top-6 right-4 sm:right-6"
            >
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-md">
                Coming Soon ✨
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* STORYTELLING SECTION */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
              Making a{" "}
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                Real Impact
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed px-4">
              Every ride with Ridezzy is a step towards sustainable urban mobility and cleaner air for our communities.
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: 0.2, 
                duration: 0.8,
                ease: [0.25, 0.25, 0.25, 1],
                type: "spring",
                stiffness: 100,
                damping: 18
              }}
              whileHover={{ scale: 1.05, y: -8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 text-center"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl">🌱</span>
              </div>
              <h4 className="font-bold text-green-600 text-lg sm:text-xl mb-2 sm:mb-3">Cleaner Air</h4>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Zero emissions for healthier cities and communities</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: 0.4, 
                duration: 0.8,
                ease: [0.25, 0.25, 0.25, 1],
                type: "spring",
                stiffness: 100,
                damping: 18
              }}
              whileHover={{ scale: 1.05, y: -8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 text-center"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl">⚡</span>
              </div>
              <h4 className="font-bold text-blue-600 text-lg sm:text-xl mb-2 sm:mb-3">Smart Technology</h4>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Efficient and reliable electric delivery solutions</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: 0.6, 
                duration: 0.8,
                ease: [0.25, 0.25, 0.25, 1],
                type: "spring",
                stiffness: 100,
                damping: 18
              }}
              whileHover={{ scale: 1.05, y: -8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 text-center"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl">🌍</span>
              </div>
              <h4 className="font-bold text-emerald-600 text-lg sm:text-xl mb-2 sm:mb-3">Sustainable Future</h4>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Building tomorrow's mobility infrastructure today</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FUTURE VISION */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white text-center">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                2030 Vision
              </span>
            </h2>
            <p className="max-w-4xl mx-auto text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed font-light px-4">
              By 2030, we aim to power our entire fleet with 100% renewable energy, 
              expand sustainable delivery networks across India, and create a circular 
              battery recycling program with zero landfill waste.
            </p>
          </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: 0.2, 
              duration: 0.8,
              ease: [0.25, 0.25, 0.25, 1],
              type: "spring",
              stiffness: 100,
              damping: 18
            }}
            whileHover={{ scale: 1.05, y: -8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg sm:text-xl mb-2 sm:mb-3">100% Renewable</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Complete transition to clean energy sources for all operations</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: 0.4, 
              duration: 0.8,
              ease: [0.25, 0.25, 0.25, 1],
              type: "spring",
              stiffness: 100,
              damping: 18
            }}
            whileHover={{ scale: 1.05, y: -8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg sm:text-xl mb-2 sm:mb-3">Pan-India Network</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Sustainable delivery network across all major cities</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: 0.6, 
              duration: 0.8,
              ease: [0.25, 0.25, 0.25, 1],
              type: "spring",
              stiffness: 100,
              damping: 18
            }}
            whileHover={{ scale: 1.05, y: -8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Recycle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg sm:text-xl mb-2 sm:mb-3">Zero Waste</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Circular battery economy with complete recycling program</p>
          </motion.div>
        </div>
        </div>
      </section>
      </div>
      <Footer />
    </>
  );
}