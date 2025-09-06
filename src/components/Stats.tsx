import { motion } from "framer-motion";
import { TrendingUp, Users, Zap, MapPin } from "lucide-react";

const stats = [
  {
    icon: <Users className="w-8 h-8" />,
    number: "10,000+",
    label: "Active Riders",
    description: "Trusted delivery partners",
    color: "bg-gradient-to-br from-blue-500 to-blue-600"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    number: "50,000+",
    label: "Battery Swaps",
    description: "Zero downtime deliveries",
    color: "bg-gradient-to-br from-yellow-500 to-yellow-600"
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    number: "25+",
    label: "Cities Covered",
    description: "Expanding nationwide",
    color: "bg-gradient-to-br from-green-500 to-green-600"
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    number: "99.9%",
    label: "Uptime",
    description: "Reliable service guarantee",
    color: "bg-gradient-to-br from-purple-500 to-purple-600"
  }
];

export default function Stats() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-green-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center px-4 py-2 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
            Our Impact
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Driving the Future of
            <span className="text-yellow-400"> Urban Mobility</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join thousands of businesses already transforming their delivery operations with Ridezzy's sustainable EV solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                <div className={`inline-flex items-center justify-center w-20 h-20 ${stat.color} rounded-2xl text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <div className="text-4xl sm:text-5xl font-bold text-yellow-400 mb-3 group-hover:scale-105 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                  {stat.label}
                </div>
                <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
