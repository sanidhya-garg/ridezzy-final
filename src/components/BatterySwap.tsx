import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, 
  MapPin, 
  Zap, 
  Smartphone, 
  Battery, 
  ArrowRight,
  CheckCircle,
  Infinity as InfinityIcon
} from "lucide-react";

const BatterySwapSection = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: "Locate Station",
      description: "Find nearby swap stations using our app",
      icon: <MapPin className="w-6 h-6" />,
      color: "blue",
      bgColor: "bg-blue-100",
      iconBg: "bg-blue-500"
    },
    {
      id: 2,
      title: "Remove Battery",
      description: "Quick-release mechanism for easy removal",
      icon: <Battery className="w-6 h-6" />,
      color: "orange",
      bgColor: "bg-orange-100",
      iconBg: "bg-orange-500"
    },
    {
      id: 3,
      title: "Insert New Battery",
      description: "Snap in a fully charged battery",
      icon: <Zap className="w-6 h-6" />,
      color: "green",
      bgColor: "bg-green-100",
      iconBg: "bg-green-500"
    },
    {
      id: 4,
      title: "Ready to Go!",
      description: "Back on the road in 30 seconds",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "purple",
      bgColor: "bg-purple-100",
      iconBg: "bg-purple-500"
    }
  ];

  const benefits = [
    {
      title: "Zero Downtime",
      description: "Continue deliveries without charging breaks",
      icon: <Clock className="w-5 h-5" />,
      color: "text-yellow-600"
    },
    {
      title: "Unlimited Range",
      description: "Extend your operational hours indefinitely",
      icon: <InfinityIcon className="w-5 h-5" />,
      color: "text-blue-600"
    },
    {
      title: "Smart Integration",
      description: "App-guided station finder and monitoring",
      icon: <Smartphone className="w-5 h-5" />,
      color: "text-green-600"
    }
  ];

  // Auto-cycle through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white py-16 px-6 md:px-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Instant Power: <span className="text-yellow-500">30-Second</span> Battery Swaps
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Say goodbye to downtime with our revolutionary smart battery network. 
            Keep your deliveries moving with the fastest swap technology in the industry.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Visual Demo */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Main Demo Area */}
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              
              {/* Timer Display */}
              <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full font-bold text-sm">
                30 SEC
              </div>

              {/* Step Visualization */}
              <div className="text-center mb-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
                    animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                    exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <div className={`w-32 h-32 mx-auto rounded-full ${steps[currentStep].bgColor} flex items-center justify-center mb-6 shadow-lg`}>
                      <div className={`w-16 h-16 rounded-full ${steps[currentStep].iconBg} flex items-center justify-center text-white`}>
                        {steps[currentStep].icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {steps[currentStep].title}
                    </h3>
                    <p className="text-gray-600">
                      {steps[currentStep].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress Indicator */}
              <div className="flex justify-center space-x-2 mb-6">
                {steps.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      index === currentStep ? 'bg-yellow-500 w-8' : 'bg-gray-300 w-2'
                    }`}
                    animate={{ 
                      backgroundColor: index === currentStep ? '#EAB308' : '#D1D5DB',
                      width: index === currentStep ? 32 : 8
                    }}
                  />
                ))}
              </div>

              {/* Step Navigation */}
              <div className="grid grid-cols-4 gap-2">
                {steps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(index)}
                    className={`p-3 rounded-lg text-center transition-all duration-300 ${
                      index === currentStep
                        ? `${step.bgColor} border-2 border-${step.color}-500 shadow-md`
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <div className={`w-8 h-8 mx-auto rounded-full ${
                      index === currentStep ? step.iconBg : 'bg-gray-400'
                    } flex items-center justify-center text-white mb-1`}>
                      {React.cloneElement(step.icon, { className: 'w-4 h-4' })}
                    </div>
                    <span className="text-xs font-medium text-gray-700">
                      Step {step.id}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Floating Stats */}
            <motion.div
              className="absolute -top-6 -left-6 bg-yellow-400 text-black px-4 py-2 rounded-xl shadow-lg font-bold"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="text-2xl">30s</div>
              <div className="text-xs">Swap Time</div>
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -right-6 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg font-bold"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
            >
              <div className="text-2xl">24/7</div>
              <div className="text-xs">Available</div>
            </motion.div>
          </motion.div>

          {/* Right Side - Benefits & CTA */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            
            {/* Key Benefits */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Why Choose Smart Battery Swapping?
              </h3>
              
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-md border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                >
                  <div className={`${benefit.color} bg-gray-50 p-3 rounded-lg`}>
                    {benefit.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Network Stats */}
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-xl border border-yellow-200">
              <h4 className="font-bold text-gray-900 mb-4">Our Growing Network</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-yellow-600">500+</div>
                  <div className="text-sm text-gray-600">Swap Stations</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">24/7</div>
                  <div className="text-sm text-gray-600">Availability</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">99%</div>
                  <div className="text-sm text-gray-600">Uptime</div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="space-y-4">
              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
                <span>See How It Works</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button className="w-full bg-transparent border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-4 px-8 rounded-xl transition-all duration-300">
                Discover Our Network
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BatterySwapSection;
