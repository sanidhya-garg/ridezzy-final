import { motion } from "framer-motion";
import { ArrowRight, Battery, Smartphone, MapPin, Clock } from "lucide-react";

const steps = [
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "Download & Register",
    description: "Get the Ridezzy app and complete your quick onboarding process with just a few taps",
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
    lightColor: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    title: "Find Nearest Vehicle",
    description: "Locate available EVs near you using our real-time map and smart location services",
    color: "bg-gradient-to-br from-green-500 to-green-600",
    lightColor: "bg-green-50",
    iconColor: "text-green-600"
  },
  {
    icon: <Battery className="w-8 h-8" />,
    title: "Smart Battery System",
    description: "Enjoy unlimited range with our revolutionary 30-second battery swap technology",
    color: "bg-gradient-to-br from-yellow-500 to-yellow-600",
    lightColor: "bg-yellow-50",
    iconColor: "text-yellow-600"
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Start Earning",
    description: "Begin your journey with zero downtime and maximize your earning potential daily",
    color: "bg-gradient-to-br from-purple-500 to-purple-600",
    lightColor: "bg-purple-50",
    iconColor: "text-purple-600"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
            Simple Process
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            How Ridezzy
            <span className="text-yellow-500"> Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your delivery business in four simple steps and start earning more with our sustainable EV solutions
          </p>
        </motion.div>

        <div className="relative">
          {/* Mobile Layout */}
          <div className="block lg:hidden space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="flex items-start space-x-6 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <div className={`flex-shrink-0 w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                    {step.icon}
                    <div className="absolute -top-2 -left-2 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
                {/* Mobile connector */}
                {index < steps.length - 1 && (
                  <div className="flex justify-start ml-7 mt-4 mb-4">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-gray-300 to-transparent"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-4 gap-8 relative">
              {/* Enhanced Connecting Line */}
              <div className="absolute top-24 left-16 right-16 h-1 bg-gradient-to-r from-blue-200 via-green-200 to-purple-200 rounded-full z-0"></div>
              
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative z-10 text-center group"
                >
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group-hover:border-gray-200">
                    <div className={`inline-flex items-center justify-center w-20 h-20 ${step.color} rounded-2xl text-white mb-6 relative shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {step.icon}
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                        {index + 1}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Enhanced Arrow */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-24 -right-6 transform -translate-y-1/2 z-20">
                      <div className="w-12 h-12 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <ArrowRight className="w-5 h-5 text-gray-500" />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-10 sm:p-16 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-400 rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-yellow-400 rounded-full translate-x-12 translate-y-12"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Ready to Transform Your
                <span className="text-yellow-400"> Delivery Business?</span>
              </h3>
              <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                Join thousands of delivery partners already earning more with Ridezzy's sustainable EV solutions and smart technology
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-10 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  Start Your Journey
                </button>
                <button className="border-2 border-gray-500 hover:border-gray-400 text-white font-semibold px-10 py-4 rounded-xl transition-all duration-300 hover:bg-white hover:text-gray-900">
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
