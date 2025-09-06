import { motion } from "framer-motion";
import { 
  Fuel, 
  Wrench, 
  HeadphonesIcon, 
  Banknote,
  Shield,
  CreditCard,
  MapPin,
  Zap
} from "lucide-react";

const features = [
  {
    icon: <Fuel className="w-8 h-8" />,
    title: "Zero",
    subtitle: "Fuel Expense",
    color: "text-white",
    bgColor: "bg-gradient-to-br from-[#FFD400] to-[#FFA500]"
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    title: "Zero",
    subtitle: "Maintenance Cost",
    color: "text-white",
    bgColor: "bg-gradient-to-br from-[#FFD400] to-[#FFA500]"
  },
  {
    icon: <HeadphonesIcon className="w-8 h-8" />,
    title: "End to End",
    subtitle: "Breakdown Support",
    color: "text-white",
    bgColor: "bg-gradient-to-br from-[#FFD400] to-[#FFA500]"
  },
  {
    icon: <Banknote className="w-8 h-8" />,
    title: "Zero",
    subtitle: "Initial Investment",
    color: "text-white",
    bgColor: "bg-gradient-to-br from-[#FFD400] to-[#FFA500]"
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Free",
    subtitle: "Insurance Cover",
    color: "text-white",
    bgColor: "bg-gradient-to-br from-[#FFD400] to-[#FFA500]"
  },
  {
    icon: <CreditCard className="w-8 h-8" />,
    title: "No Licence or",
    subtitle: "Registration Hassles",
    color: "text-white",
    bgColor: "bg-gradient-to-br from-[#FFD400] to-[#FFA500]"
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    title: "IoT/GPS",
    subtitle: "Telematics",
    color: "text-white",
    bgColor: "bg-gradient-to-br from-[#FFD400] to-[#FFA500]"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Independent",
    subtitle: "Charging",
    color: "text-white",
    bgColor: "bg-gradient-to-br from-[#FFD400] to-[#FFA500]"
  }
];

export default function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean professional title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-black leading-tight">
            The <span className="text-[#FFD400]">Ridezzy</span> Advantage
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="h-1 bg-[#FFD400] mx-auto mt-4 rounded-full"
          ></motion.div>
        </motion.div>
        {/* Professional features grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group text-center"
              >
                {/* Enhanced feature card */}
                <div className="bg-white hover:bg-gradient-to-br hover:from-[#fff8d0] hover:to-[#fff3b3] border border-gray-200 hover:border-[#FFD400] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  {/* Beautiful icon container */}
                  <div className="flex justify-center mb-6">
                    <motion.div 
                      className={`${feature.bgColor} p-4 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.4 }
                      }}
                    >
                      {/* Gradient overlay for extra depth */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-xl"></div>
                      <div className={`${feature.color} relative z-10`}>
                        {feature.icon}
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Enhanced text content */}
                  <div className="space-y-2">
                    <h3 className="text-gray-800 font-bold text-lg group-hover:text-gray-900 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">
                      {feature.subtitle}
                    </p>
                  </div>
                  
                  {/* Subtle accent line */}
                  <motion.div
                    className="w-0 h-1 bg-gradient-to-r from-[#FFD400] to-[#FFA500] mx-auto mt-4 rounded-full group-hover:w-12 transition-all duration-300"
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
