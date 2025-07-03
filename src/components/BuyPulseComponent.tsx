import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Battery, Zap, Shield, Truck, CreditCard, MapPin, Clock, Star, Play, ChevronDown, X, Check, Leaf, Wrench, Package, Clipboard, Smartphone, Rocket, Car } from "lucide-react";

const RidezzyPremiumScooter = () => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showBookingPanel, setShowBookingPanel] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scaleTransform = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  
  const [heroRef2, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [customizeRef, customizeInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const scooterColors = [
    { name: "Lightning Yellow", color: "#FFD700", gradient: "from-yellow-400 to-yellow-600" },
    { name: "Electric Blue", color: "#0EA5E9", gradient: "from-blue-400 to-blue-600" },
    { name: "Neon Green", color: "#10B981", gradient: "from-green-400 to-green-600" },
    { name: "Crimson Red", color: "#EF4444", gradient: "from-red-400 to-red-600" },
    { name: "Stealth Black", color: "#1F2937", gradient: "from-gray-700 to-gray-900" }
  ];

  const vehicleFeatures = [
    {
      title: "Smart Dockless Technology",
      description: "Advanced dockless electric vehicle with swappable lithium battery via BAAS partner integration",
      icon: Smartphone
    },
    {
      title: "Eco-Friendly Design",
      description: "Perfect for last-mile delivery with zero emissions and sustainable transportation",
      icon: Leaf
    },
    {
      title: "High Performance",
      description: "Top speed of 45 kmph for efficient urban delivery operations",
      icon: Zap
    },
    {
      title: "No Registration Required",
      description: "NMT category vehicle (< 25 kmph mode) - hassle-free operations",
      icon: Clipboard
    },
    {
      title: "Low Maintenance",
      description: "Extremely affordable to run with minimal maintenance requirements",
      icon: Wrench
    },
    {
      title: "High Payload Capacity",
      description: "Up to 150 kg payload capacity for all your delivery needs",
      icon: Package
    }
  ];

  const technicalSpecs = [
    { label: "Vehicle Type", value: "Commercial Delivery 2-Wheeler" },
    { label: "Motor", value: "Rear Wheel Hub Motor" },
    { label: "Brakes", value: "Drum (Front & Rear)" },
    { label: "Wheel Size", value: "10-inch (Front & Rear)" },
    { label: "Payload Capacity", value: "Up to 150 kg" },
    { label: "Battery", value: "Lithium (Removable / Swappable)" },
    { label: "Top Speed", value: "45 kmph" },
    { label: "Range", value: "120 km" }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      company: "Mumbai Express Delivery",
      rating: 5,
      quote: "Ridezzy transformed our delivery operations. 40% faster deliveries with zero emissions!",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Priya Sharma",
      company: "Delhi Logistics Hub",
      rating: 5,
      quote: "The battery swap integration is revolutionary. No downtime, continuous operations!",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c693?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Amit Patel",
      company: "EcoDelivery Solutions",
      rating: 5,
      quote: "Cost-effective, reliable, and eco-friendly. Perfect for modern urban logistics.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(testimonialInterval);
  }, [testimonials.length]);

  const scooterPrice = 30000;
  const bookingAmount = 5000;
  const totalPrice = scooterPrice * quantity;

  const handleBookNow = () => {
    setShowBookingPanel(true);
  };

  return (
    <div className="bg-white text-gray-900 overflow-hidden">
      {/* Floating particles background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-500 rounded-full opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-yellow-50">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-gray-50">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-100/30 via-transparent to-blue-100/30 animate-pulse"></div>
        </div>

        {/* Dynamic light effects */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-yellow-300 to-orange-300 opacity-10 blur-3xl"
          style={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={heroRef2}
            initial={{ opacity: 0, x: -100 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Premium badge */}
            <motion.div
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold mb-6"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Zap className="w-4 h-4 mr-2" />
              Premium Electric Series
            </motion.div>

            <motion.h1
              className="text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-yellow-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            >
              RIDEZZY
              <span className="block text-4xl lg:text-5xl mt-2 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                The Future Rides Here
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Experience revolutionary electric mobility with Battery Smart integration,
              premium build quality, and cutting-edge technology. Built for professionals
              who demand excellence.
            </motion.p>

            {/* Premium stats */}
            <motion.div
              className="grid grid-cols-3 gap-6 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {[
                { label: "Range", value: "120KM", icon: Battery },
                { label: "Top Speed", value: "65KM/H", icon: Zap },
                { label: "Charge Time", value: "45MIN", icon: Clock },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="text-2xl font-bold text-yellow-600">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <motion.button
                onClick={handleBookNow}
                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-full text-lg hover:shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Now - ₹{bookingAmount.toLocaleString()}
              </motion.button>
              
              <motion.button
                className="px-8 py-4 border-2 border-yellow-500 text-yellow-600 rounded-full font-semibold hover:bg-yellow-500 hover:text-white transition-all duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>

          {/* 3D Scooter Display */}
          <motion.div
            className="relative"
            style={{ y: parallaxY, scale: scaleTransform }}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full opacity-20 blur-3xl scale-150 animate-pulse"></div>
              
              {/* Rotating ring */}
              <motion.div
                className="absolute inset-0 border-2 border-yellow-400/40 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Main scooter image */}
              <motion.div
                className="relative z-10 p-8"
                animate={{
                  y: [0, -20, 0],
                  rotateY: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-96 h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/30 to-orange-100/30"></div>
                  <div className="flex justify-center">
                    <Car className="w-32 h-32 text-yellow-600" />
                  </div>
                  <div className="absolute bottom-4 left-4 text-sm text-yellow-600 font-medium">
                    Premium Model 2025
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-yellow-600" />
        </motion.div>
      </section>

      {/* Quick Features Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Battery, title: "Smart Battery", subtitle: "Swappable Technology" },
              { icon: Leaf, title: "Eco-Friendly", subtitle: "Zero Emissions" },
              { icon: Zap, title: "45 KMPH", subtitle: "Top Speed" },
              { icon: Package, title: "150 KG", subtitle: "Payload Capacity" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="mb-3 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  <feature.icon className="w-12 h-12 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-gray-600">{feature.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative bg-white" ref={featuresRef}>
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-yellow-600 bg-clip-text text-transparent">
              Professional Grade Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Engineered for excellence with cutting-edge technology and premium materials
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Battery,
                title: "Battery Smart Integration",
                description: "Seamless battery swapping with Battery Smart network. Never worry about charging downtime again.",
                color: "from-green-400 to-green-600"
              },
              {
                icon: Zap,
                title: "Lightning Performance",
                description: "65 km/h top speed with 120km range. Optimized for urban delivery and commuting.",
                color: "from-yellow-400 to-yellow-600"
              },
              {
                icon: Shield,
                title: "Premium Build Quality",
                description: "Aircraft-grade aluminum frame with weather-resistant coating. Built to last.",
                color: "from-blue-400 to-blue-600"
              },
              {
                icon: Truck,
                title: "Smart Cargo Solutions",
                description: "Modular cargo system with GPS tracking and temperature control options.",
                color: "from-purple-400 to-purple-600"
              },
              {
                icon: MapPin,
                title: "Fleet Management",
                description: "Real-time tracking, route optimization, and comprehensive fleet analytics.",
                color: "from-red-400 to-red-600"
              },
              {
                icon: CreditCard,
                title: "Flexible Financing",
                description: "Multiple payment options including EMI, lease, and subscription models.",
                color: "from-orange-400 to-orange-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group relative p-8 bg-white rounded-2xl hover:shadow-2xl transition-all duration-300 border border-gray-200"
                initial={{ opacity: 0, y: 50 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${feature.color} mb-6`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-yellow-600 bg-clip-text text-transparent">
              Advanced Vehicle Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the innovative features that make Ridezzy the perfect choice for commercial delivery
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicleFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative p-8 bg-gray-50 rounded-2xl hover:shadow-2xl transition-all duration-300 border border-gray-200"
                initial={{ opacity: 0, y: 50 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="mb-6 flex justify-center">
                    <feature.icon className="w-12 h-12 text-yellow-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-yellow-600 bg-clip-text text-transparent">
              Technical Specifications
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Detailed technical information about your commercial delivery vehicle
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-6">
                <h3 className="text-2xl font-bold text-white text-center">Vehicle Specifications</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-0">
                {technicalSpecs.map((spec, index) => (
                  <motion.div
                    key={index}
                    className={`p-6 border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-yellow-50 transition-colors duration-300`}
                    initial={{ opacity: 0, x: -50 }}
                    animate={featuresInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">{spec.label}</span>
                      <span className="text-yellow-600 font-bold">{spec.value}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-yellow-600 bg-clip-text text-transparent">
              Trusted by Professionals
            </h2>
            <p className="text-xl text-gray-600">
              See why leading businesses choose Ridezzy
            </p>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                className="max-w-4xl mx-auto"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 text-center border border-gray-200 shadow-xl">
                  <div className="flex justify-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-2xl text-gray-800 mb-8 italic">
                    "{testimonials[currentTestimonial].quote}"
                  </blockquote>
                  <div className="flex items-center justify-center">
                    <img
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</div>
                      <div className="text-gray-600">{testimonials[currentTestimonial].company}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Customization Section */}
      <section className="py-20 bg-gray-50" ref={customizeRef}>
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            animate={customizeInView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
          >
            <div>
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-yellow-600 bg-clip-text text-transparent">
                Customize Your Ride
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Choose from premium color options and configure your perfect scooter
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Color Options</h3>
                  <div className="flex flex-wrap gap-4">
                    {scooterColors.map((color, index) => (
                      <motion.button
                        key={index}
                        className={`w-16 h-16 rounded-full border-4 ${
                          selectedColor === index ? 'border-yellow-500 shadow-lg shadow-yellow-400/50' : 'border-gray-300'
                        } transition-all duration-300`}
                        style={{ backgroundColor: color.color }}
                        onClick={() => setSelectedColor(index)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      />
                    ))}
                  </div>
                  <p className="text-yellow-600 font-semibold mt-2">
                    {scooterColors[selectedColor].name}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Quantity</h3>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors text-gray-700"
                    >
                      -
                    </button>
                    <span className="text-2xl font-bold text-gray-900 min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors text-gray-700"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg text-gray-600">Scooter Price</span>
                    <span className="text-xl font-bold text-gray-900">₹{scooterPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg text-gray-600">Quantity</span>
                    <span className="text-xl font-bold text-gray-900">{quantity}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-semibold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-yellow-600">₹{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <motion.button
                  onClick={handleBookNow}
                  className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-full text-xl hover:shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book Now - Pay ₹{bookingAmount.toLocaleString()}
                </motion.button>
              </div>
            </div>

            <div className="relative">
              <motion.div
                className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-2xl border border-gray-200"
                animate={{
                  background: `linear-gradient(135deg, ${scooterColors[selectedColor].color}20, ${scooterColors[selectedColor].color}10)`,
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/20 to-orange-100/20"></div>
                <div className="flex justify-center">
                  <Car className="w-32 h-32 text-yellow-600" />
                </div>
                <div className="absolute bottom-4 left-4 text-sm text-yellow-600 font-medium">
                  {scooterColors[selectedColor].name}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Ridezzy Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-yellow-600 bg-clip-text text-transparent">
              Why Choose Ridezzy?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compare Ridezzy with traditional delivery vehicles and see the difference
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Traditional Vehicles */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Traditional Vehicles</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">High fuel costs</span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">Frequent maintenance</span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">Environmental impact</span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">Complex registration</span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">Limited payload</span>
                </div>
              </div>
            </div>

            {/* Ridezzy */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border-2 border-yellow-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-center py-2 text-sm font-bold">
                RECOMMENDED
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center mt-4">Ridezzy Premium</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700 font-medium">Zero fuel costs</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700 font-medium">Minimal maintenance</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700 font-medium">100% eco-friendly</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700 font-medium">No registration needed</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700 font-medium">150 kg payload capacity</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700 font-medium">Smart battery swapping</span>
                </div>
              </div>
            </div>

            {/* Other Electric */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Other Electric</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-600">No fuel costs</span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">Long charging times</span>
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-3">~</span>
                  <span className="text-gray-600">Limited range</span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">Expensive maintenance</span>
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-3">~</span>
                  <span className="text-gray-600">Average payload</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <motion.button
              onClick={handleBookNow}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-full text-lg hover:shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Rocket className="w-5 h-5 mr-2" />
              Book Your Ridezzy Today
            </motion.button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-yellow-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "How does the Battery Smart integration work?",
                answer: "Our scooters are fully compatible with Battery Smart's swapping network. Simply locate a nearby station, swap your depleted battery for a fully charged one in under 2 minutes, and continue your journey. No waiting, no downtime."
              },
              {
                question: "What's included in the ₹30,000 price?",
                answer: "The price includes the complete scooter, basic warranty, initial setup, and first service. Battery Smart integration hardware is pre-installed. Insurance and extended warranty are optional add-ons."
              },
              {
                question: "How much do I need to pay upfront?",
                answer: "The booking amount is ₹5,000. You can choose from various payment options including full payment, EMI plans, or lease arrangements. We also offer corporate financing for bulk orders."
              },
              {
                question: "What's the delivery timeframe?",
                answer: "Standard delivery is 7-14 business days from booking confirmation. Express delivery options are available for urgent requirements. We'll keep you updated throughout the process."
              },
              {
                question: "Is maintenance included?",
                answer: "Basic maintenance is covered for the first year. We also offer extended maintenance packages and 24/7 support for enterprise customers. Battery Smart handles all battery-related maintenance."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-100 transition-colors"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  <span className="text-xl font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown
                    className={`w-6 h-6 text-yellow-600 transition-transform ${
                      activeFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-gray-600 text-lg leading-relaxed border-t border-gray-200">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Side Panel */}
      <AnimatePresence>
        {showBookingPanel && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBookingPanel(false)}
            />
            <motion.div
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white border-l border-gray-200 z-50 p-6 overflow-y-auto shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Book Your Ridezzy</h2>
                <button
                  onClick={() => setShowBookingPanel(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Order Summary */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ridezzy Premium</span>
                      <span className="text-gray-900 font-semibold">₹{scooterPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quantity</span>
                      <span className="text-gray-900 font-semibold">{quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Color</span>
                      <span className="text-gray-900 font-semibold">{scooterColors[selectedColor].name}</span>
                    </div>
                    <div className="border-t border-gray-300 pt-3">
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold text-gray-900">Total</span>
                        <span className="text-lg font-bold text-yellow-600">₹{totalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Enter your city"
                    />
                  </div>
                </div>

                {/* Payment Info */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
                  <div className="flex items-center mb-2">
                    <Check className="w-5 h-5 text-yellow-600 mr-2" />
                    <span className="text-yellow-700 font-semibold">Secure Booking</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    Pay only ₹{bookingAmount.toLocaleString()} to secure your booking. 
                    Rest amount due on delivery.
                  </p>
                </div>

                {/* Book Now Button */}
                <motion.button
                  className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-full text-lg hover:shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowBookingPanel(false)}
                >
                  Confirm Booking - ₹{bookingAmount.toLocaleString()}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RidezzyPremiumScooter;
export { RidezzyPremiumScooter as BuyPulseComponent };