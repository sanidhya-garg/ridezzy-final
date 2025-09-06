import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import {
  UserCheck,
  FileText,
  BatteryCharging,
  LayoutDashboard,
  Headset,
} from "lucide-react";

const story = [
  {
    id: "signup",
    step: 1,
    title: "Sign Up & Get Verified",
    description: "Download the Ridezzy app and complete your KYC verification to get started",
    icon: <UserCheck className="w-10 h-10 text-white" />,
    iconBg: "bg-blue-500",
    color: "blue",
    bgColor: "bg-blue-100",
    tileBg: "bg-blue-50",
    borderColor: "border-blue-500",
    image: "/src/assets/app-onboard.jpg",
  },
  {
    id: "plan",
    step: 2,
    title: "Choose Your Scooter Plan",
    description: "Pick an electric scooter plan that perfectly fits your delivery needs and budget",
    icon: <FileText className="w-10 h-10 text-white" />,
    iconBg: "bg-green-500",
    color: "green",
    bgColor: "bg-green-100",
    tileBg: "bg-green-50",
    borderColor: "border-green-500",
    image: "/src/assets/app-plan.jpg",
  },
  {
    id: "battery",
    step: 3,
    title: "Smart Battery Swapping",
    description: "Access our extensive battery swapping network anytime, anywhere across the city",
    icon: <BatteryCharging className="w-10 h-10 text-white" />,
    iconBg: "bg-yellow-500",
    color: "yellow",
    bgColor: "bg-yellow-100",
    tileBg: "bg-yellow-50",
    borderColor: "border-yellow-500",
    image: "/src/assets/app-battery.jpg",
  },
  {
    id: "dashboard",
    step: 4,
    title: "Track Vehicle Health",
    description: "Monitor your vehicle's performance and health in real-time through the dashboard",
    icon: <LayoutDashboard className="w-10 h-10 text-white" />,
    iconBg: "bg-purple-500",
    color: "purple",
    bgColor: "bg-purple-100",
    tileBg: "bg-purple-50",
    borderColor: "border-purple-500",
    image: "/src/assets/app-iot.jpg",
  },
  {
    id: "support",
    step: 5,
    title: "24/7 Live Support",
    description: "Get instant help and support through our dedicated customer service team",
    icon: <Headset className="w-10 h-10 text-white" />,
    iconBg: "bg-red-500",
    color: "red",
    bgColor: "bg-red-100",
    tileBg: "bg-red-50",
    borderColor: "border-red-500",
    image: "/src/assets/app-support.jpg",
  },
];

const HowToRide = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [internalScrollProgress, setInternalScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastStepChangeRef = useRef<number>(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Use internal scroll progress when component is in view
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Calculate which step should be active based on scroll with smoother transitions
  const activeProgress = isInView ? internalScrollProgress : scrollYProgress.get();
  const stepValue = activeProgress * (story.length - 1);
  const smoothStepProgress = useSpring(stepValue, { damping: 25, stiffness: 80, mass: 1 });

  useEffect(() => {
    const unsubscribe = smoothStepProgress.onChange((value) => {
      const now = Date.now();
      const newStep = Math.round(Math.max(0, Math.min(story.length - 1, value)));
      
      // Prevent rapid step changes by adding a minimum delay
      if (newStep !== currentStep && now - lastStepChangeRef.current > 50) {
        setCurrentStep(newStep);
        lastStepChangeRef.current = now;
      }
    });

    return unsubscribe;
  }, [smoothStepProgress, currentStep]);

  // Update step based on activeProgress changes
  useEffect(() => {
    smoothStepProgress.set(stepValue);
  }, [stepValue, smoothStepProgress]);

  // Add scroll event listener to control scroll speed within this component
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Check if we're within the component bounds
      const rect = container.getBoundingClientRect();
      const isComponentInView = rect.top <= window.innerHeight && rect.bottom >= 0;
      
      if (isComponentInView) {
        const scrollingDown = e.deltaY > 0;
        const scrollingUp = e.deltaY < 0;
        
        // Check if we should allow normal page scrolling
        const shouldAllowScroll = 
          (scrollingDown && internalScrollProgress >= 1) || // At last tile, scrolling down
          (scrollingUp && internalScrollProgress <= 0);     // At first tile, scrolling up
        
        if (shouldAllowScroll) {
          // Allow normal page scrolling
          return;
        }
        
        // Prevent default scroll and update internal progress
        e.preventDefault();
        
        setInternalScrollProgress(prev => {
          const scrollSensitivity = 0.002; // Adjust this to control how fast tiles change
          const deltaProgress = e.deltaY * scrollSensitivity;
          return Math.max(0, Math.min(1, prev + deltaProgress));
        });
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [internalScrollProgress]);

  // Handle tile click with smooth transition
  const handleStepChange = (newStep: number) => {
    if (newStep !== currentStep) {
      setCurrentStep(newStep);
      setInternalScrollProgress(newStep / (story.length - 1));
    }
  };

  const currentStory = story[currentStep];

  return (
    <section 
      ref={containerRef}
      className="bg-gradient-to-br from-gray-50 to-white py-20 relative overflow-hidden"
      style={{ height: '150vh' }}
    >
      {/* Background decorations */}
      <motion.div 
        className="absolute top-20 right-10 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 left-10 w-80 h-80 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-15"
        animate={{ 
          scale: [1, 1.1, 1],
          x: [0, -40, 0],
          y: [0, 20, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      />
      
      {/* Sticky Content */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How to <span className="text-yellow-500">Ridezzy</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow these simple steps to start your journey with sustainable electric vehicle logistics
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Side - Step Information */}
            <motion.div 
              className="lg:col-span-4 space-y-8"
              key={`step-${currentStep}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                {/* Step Number */}
                <motion.div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${currentStory.iconBg} text-white font-bold text-xl mb-6`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  {currentStory.step}
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {currentStory.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    {currentStory.description}
                  </p>
                </motion.div>

                {/* Progress Steps */}
                <div className="flex items-center space-x-3">
                  {story.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        index === currentStep 
                          ? `bg-${currentStory.color}-500 w-8` 
                          : index < currentStep 
                            ? `bg-${currentStory.color}-300 w-4`
                            : 'bg-gray-300 w-4'
                      }`}
                      initial={{ width: 16 }}
                      animate={{ 
                        width: index === currentStep ? 32 : 16,
                        backgroundColor: index <= currentStep ? undefined : '#d1d5db'
                      }}
                    />
                  ))}
                </div>

                {/* Scroll Hint */}
                <motion.div
                  className="mt-4 text-sm text-gray-500 flex items-center space-x-2"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: (internalScrollProgress <= 0 || internalScrollProgress >= 1) ? 1 : 0.3 
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {internalScrollProgress <= 0 && (
                    <span>↑ Scroll up to continue browsing</span>
                  )}
                  {internalScrollProgress >= 1 && (
                    <span>↓ Scroll down to continue browsing</span>
                  )}
                  {internalScrollProgress > 0 && internalScrollProgress < 1 && (
                    <span>🖱️ Scroll to navigate steps</span>
                  )}
                </motion.div>
              </div>
            </motion.div>

            {/* Center - Phone Mockup */}
            <motion.div 
              className="lg:col-span-4 flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                {/* Phone Frame */}
                <div className="w-80 h-[600px] bg-gradient-to-b from-gray-900 to-black rounded-[3rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-[2.5rem] relative overflow-hidden">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
                    
                    {/* Screen Content */}
                    <div className="h-full flex flex-col items-center justify-center relative overflow-hidden">
                      {/* App Screenshot */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`image-${currentStep}`}
                          className="absolute inset-0 w-full h-full"
                          initial={{ opacity: 0, scale: 1.1, y: 50 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: -50 }}
                          transition={{ 
                            duration: 0.6,
                            ease: "easeOut"
                          }}
                        >
                          <img 
                            src={currentStory.image}
                            alt={currentStory.title}
                            className="w-full h-full object-fill"
                            style={{ 
                              filter: 'none',
                              objectFit: 'fill'
                            }}
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Floating Tiles Around Phone */}
                <motion.div
                  className="absolute -top-4 -left-16 w-20 h-20 bg-white rounded-xl shadow-lg border-2 border-blue-200 p-3 hidden lg:flex items-center justify-center"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <UserCheck className="w-8 h-8 text-blue-500" />
                </motion.div>

                <motion.div
                  className="absolute -top-4 -right-16 w-20 h-20 bg-white rounded-xl shadow-lg border-2 border-green-200 p-3 hidden lg:flex items-center justify-center"
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                >
                  <FileText className="w-8 h-8 text-green-500" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-16 w-20 h-20 bg-white rounded-xl shadow-lg border-2 border-yellow-200 p-3 hidden lg:flex items-center justify-center"
                  animate={{ 
                    y: [0, -8, 0],
                    rotate: [0, 3, 0]
                  }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                >
                  <BatteryCharging className="w-8 h-8 text-yellow-500" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -right-16 w-20 h-20 bg-white rounded-xl shadow-lg border-2 border-purple-200 p-3 hidden lg:flex items-center justify-center"
                  animate={{ 
                    y: [0, -12, 0],
                    rotate: [0, -3, 0]
                  }}
                  transition={{ duration: 2.8, repeat: Infinity, delay: 1.5 }}
                >
                  <LayoutDashboard className="w-8 h-8 text-purple-500" />
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Feature List */}
            <motion.div 
              className="lg:col-span-4 space-y-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {story.map((step, index) => (
                <motion.div
                  key={step.id}
                  className={`p-4 rounded-xl border-2 transition-all duration-400 ease-out cursor-pointer ${
                    index === currentStep
                      ? `${step.tileBg} ${step.borderColor} shadow-lg scale-105`
                      : index < currentStep
                        ? 'bg-gray-50 border-gray-300 opacity-60'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleStepChange(index)}
                  whileHover={{ scale: index === currentStep ? 1.05 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  layout
                  transition={{
                    layout: { duration: 0.3, ease: "easeOut" },
                    scale: { duration: 0.2 },
                    backgroundColor: { duration: 0.3 },
                    borderColor: { duration: 0.3 }
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <motion.div 
                      className={`w-12 h-12 ${step.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}
                      transition={{ duration: 0.5 }}
                    >
                      {React.cloneElement(step.icon, { 
                        className: `w-6 h-6 text-${step.color}-600` 
                      })}
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{step.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToRide;
