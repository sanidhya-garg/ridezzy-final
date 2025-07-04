import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { Battery, Zap, Shield, Truck, CreditCard, MapPin, Clock, Star, Play, ChevronDown, X, Check, Leaf, Wrench, Package, Clipboard, Smartphone, Rocket, Car, Palette, Sparkles } from "lucide-react";

const RidezzyPremiumScooter = () => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showBookingPanel, setShowBookingPanel] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedHeroImage, setSelectedHeroImage] = useState(0);
  const [isColorTransitioning, setIsColorTransitioning] = useState(false);
  const [colorHoverIndex, setColorHoverIndex] = useState<number | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    city: ''
  });
  
  const heroRef = useRef<HTMLDivElement>(null);
  const vehicleRef = useRef<HTMLDivElement>(null);
  const colorSelectorRef = useRef<HTMLDivElement>(null);
  
  // Enhanced scroll animations
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: vehicleScrollProgress } = useScroll({
    target: vehicleRef,
    offset: ["start end", "end start"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const vehicleScale = useTransform(vehicleScrollProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const vehicleRotation = useTransform(vehicleScrollProgress, [0, 1], [0, 360]);
  
  const [heroRef2, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [customizeRef, customizeInView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  // Enhanced color change animation
  const handleColorChange = (index: number) => {
    if (index === selectedColor) return;
    
    setIsColorTransitioning(true);
    setTimeout(() => {
      setSelectedColor(index);
      setIsColorTransitioning(false);
    }, 300);
  };
  
  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = vehicleRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };
    
    const vehicleElement = vehicleRef.current;
    if (vehicleElement) {
      vehicleElement.addEventListener('mousemove', handleMouseMove);
      return () => vehicleElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const scooterColors = [
    { 
      name: "Lightning Yellow", 
      color: "#FFD700", 
      gradient: "from-yellow-400 to-yellow-600",
      shadowColor: "rgba(255, 215, 0, 0.5)",
      glowColor: "rgba(255, 215, 0, 0.3)"
    },
    { 
      name: "Electric Blue", 
      color: "#0EA5E9", 
      gradient: "from-blue-400 to-blue-600",
      shadowColor: "rgba(14, 165, 233, 0.5)",
      glowColor: "rgba(14, 165, 233, 0.3)"
    },
    { 
      name: "Neon Green", 
      color: "#10B981", 
      gradient: "from-green-400 to-green-600",
      shadowColor: "rgba(16, 185, 129, 0.5)",
      glowColor: "rgba(16, 185, 129, 0.3)"
    },
    { 
      name: "Crimson Red", 
      color: "#EF4444", 
      gradient: "from-red-400 to-red-600",
      shadowColor: "rgba(239, 68, 68, 0.5)",
      glowColor: "rgba(239, 68, 68, 0.3)"
    },
    { 
      name: "Stealth Black", 
      color: "#1F2937", 
      gradient: "from-gray-700 to-gray-900",
      shadowColor: "rgba(31, 41, 55, 0.5)",
      glowColor: "rgba(31, 41, 55, 0.3)"
    }
  ];

  const heroImages = [
    { src: "/src/assets/RidezzyScooter.png", alt: "Front View", label: "Front View" },
    { src: "/src/assets/hero image.jpg", alt: "Side View", label: "Side View" },
    { src: "/src/assets/buy-pulse-hero.png", alt: "Detail View", label: "Detail View" },
    { src: "/src/assets/about-scooter.png", alt: "Features", label: "Features" }
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

  const handleBookingSubmit = () => {
    // Validate form
    if (!formData.customerName || !formData.customerEmail || !formData.customerPhone) {
      alert('Please fill in all required fields');
      return;
    }

    // Navigate to booking confirmation page with form data
    navigate('/booking-confirmation', {
      state: {
        selectedColor: scooterColors[selectedColor].name,
        selectedVariant: 'Premium',
        bookingAmount,
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        city: formData.city
      }
    });
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
      <motion.section 
        ref={heroRef} 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Hero Background Image */}
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <img 
            src="/src/assets/buy-pulse-hero.png" 
            alt="Ridezzy Premium Scooter" 
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to gradient background if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.parentElement?.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'block';
            }}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
          {/* Gradient overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
        </motion.div>

        {/* Fallback background (hidden by default) */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-yellow-900 hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-transparent to-orange-500/20 animate-pulse"></div>
        </div>

        {/* Dynamic light effects */}
        <motion.div
          className="absolute w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 rounded-full bg-gradient-to-r from-yellow-300 to-orange-300 opacity-5 blur-3xl"
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            ref={heroRef2}
            initial={{ opacity: 0, y: 100 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center"
          >
            {/* Premium badge */}
            <motion.div
              className="inline-flex items-center px-4 py-2 lg:px-6 lg:py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold mb-6 lg:mb-8 text-sm lg:text-base shadow-lg"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Zap className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
              Premium Electric Series
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 lg:mb-8 text-white leading-tight drop-shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
            >
              PULSE - ev8
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mt-2 lg:mt-4 text-yellow-400 drop-shadow-lg">
                The Future Rides Here
              </span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl lg:text-2xl text-gray-200 mb-8 lg:mb-12 leading-relaxed max-w-3xl mx-auto drop-shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Revolutionary electric mobility with Battery Smart integration
            </motion.p>

            {/* Minimal stats */}
            <motion.div
              className="flex justify-center items-center gap-8 lg:gap-12 mb-8 lg:mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
            >
              {[
                { label: "Range", value: "120KM", icon: Battery },
                { label: "Top Speed", value: "45KM/H", icon: Zap },
                { label: "Charge Time", value: "0 MIN", icon: Clock },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-6 h-6 lg:w-8 lg:h-8 text-yellow-400" />
                  </div>
                  <div className="text-xl lg:text-2xl font-bold text-white drop-shadow-lg">{stat.value}</div>
                  <div className="text-sm lg:text-base text-gray-300">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <motion.button
                onClick={handleBookNow}
                className="px-8 py-4 lg:px-12 lg:py-5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-full text-lg lg:text-xl hover:shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300 min-w-[200px]"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Now - ₹{bookingAmount.toLocaleString()}
              </motion.button>
              
              <motion.button
                className="px-8 py-4 lg:px-12 lg:py-5 border-2 border-white/50 text-white rounded-full font-semibold hover:bg-white/20 backdrop-blur-sm transition-all duration-300 flex items-center justify-center text-lg lg:text-xl min-w-[200px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-5 h-5 lg:w-6 lg:h-6 mr-2" />
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-white drop-shadow-lg" />
        </motion.div>
      </motion.section>

      {/* Hero Image Gallery Section */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-2">
              Explore Every Angle
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Click to view different perspectives of your Ridezzy Premium
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {heroImages.map((image, index) => (
              <motion.div
                key={index}
                className={`group relative bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                  selectedHeroImage === index ? 'ring-4 ring-yellow-400 ring-opacity-75' : ''
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedHeroImage(index)}
              >
                <div className="aspect-square relative">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNTBMMTUwIDEwMEwxMDAgMTUwTDUwIDEwMEwxMDAgNTBaIiBmaWxsPSIjRURCODQyIi8+CjwvZz48L3N2Zz4=';
                    }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent transition-opacity duration-300 ${
                    selectedHeroImage === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}></div>
                  {selectedHeroImage === index && (
                    <div className="absolute top-2 right-2 bg-yellow-400 rounded-full p-1">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent transition-transform duration-300 ${
                  selectedHeroImage === index ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'
                }`}>
                  <p className="text-white text-sm font-medium">{image.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Features Overview */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
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
                <div className="mb-2 lg:mb-3 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  <feature.icon className="w-8 h-8 lg:w-12 lg:h-12 text-yellow-600" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm lg:text-base text-gray-600">{feature.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-20 relative bg-white" ref={featuresRef}>
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-gray-900 to-yellow-600 bg-clip-text text-transparent">
              Professional Grade Features
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Engineered for excellence with cutting-edge technology and premium materials
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
                className="group relative p-6 lg:p-8 bg-white rounded-2xl hover:shadow-2xl transition-all duration-300 border border-gray-200"
                initial={{ opacity: 0, y: 50 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <div className={`inline-flex p-3 lg:p-4 rounded-full bg-gradient-to-r ${feature.color} mb-4 lg:mb-6`}>
                    <feature.icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Features Section */}
      <section className="py-16 lg:py-20 bg-white" ref={featuresRef}>
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-gray-900 to-yellow-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: featuresInView ? ["0% 50%", "100% 50%", "0% 50%"] : "0% 50%"
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Advanced Vehicle Features
            </motion.h2>
            <motion.p 
              className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover the innovative features that make Ridezzy the perfect choice for commercial delivery
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {vehicleFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative p-6 lg:p-8 bg-gray-50 rounded-2xl hover:shadow-2xl transition-all duration-300 border border-gray-200 overflow-hidden"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={featuresInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.1)"
                }}
              >
                {/* Animated background gradient */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"
                  animate={{
                    background: [
                      "linear-gradient(45deg, #FCD34D, #F59E0B)",
                      "linear-gradient(135deg, #FCD34D, #F59E0B)",
                      "linear-gradient(45deg, #FCD34D, #F59E0B)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Floating icon effect */}
                <div className="relative z-10">
                  <motion.div 
                    className="mb-4 lg:mb-6 flex justify-center"
                    whileHover={{ 
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.2,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    <motion.div
                      className="relative"
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                        ease: "easeInOut"
                      }}
                    >
                      <feature.icon className="w-10 h-10 lg:w-12 lg:h-12 text-yellow-600" />
                      
                      {/* Glow effect */}
                      <motion.div
                        className="absolute inset-0 w-10 h-10 lg:w-12 lg:h-12 bg-yellow-400 rounded-full blur-xl opacity-0 group-hover:opacity-30"
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                  </motion.div>
                  
                  <motion.h3 
                    className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4 text-gray-900"
                    initial={{ opacity: 0 }}
                    animate={featuresInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p 
                    className="text-sm lg:text-base text-gray-600 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={featuresInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                  >
                    {feature.description}
                  </motion.p>
                </div>

                {/* Animated border effect */}
                <motion.div
                  className="absolute inset-0 border-2 border-yellow-400 rounded-2xl opacity-0 group-hover:opacity-100"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ 
                    duration: 1.5,
                    ease: "easeInOut",
                    delay: index * 0.1
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-gray-900 to-yellow-600 bg-clip-text text-transparent">
              Technical Specifications
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Detailed technical information about your commercial delivery vehicle
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-4 lg:p-6">
                <h3 className="text-xl lg:text-2xl font-bold text-white text-center">Vehicle Specifications</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {technicalSpecs.map((spec, index) => (
                  <motion.div
                    key={index}
                    className={`p-4 lg:p-6 border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-yellow-50 transition-colors duration-300`}
                    initial={{ opacity: 0, x: -50 }}
                    animate={featuresInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900 text-sm lg:text-base">{spec.label}</span>
                      <span className="text-yellow-600 font-bold text-sm lg:text-base">{spec.value}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6 bg-gradient-to-r from-gray-900 to-yellow-600 bg-clip-text text-transparent">
              Trusted by Professionals
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">
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
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 sm:p-6 lg:p-8 text-center border border-gray-200 shadow-xl">
                  <div className="flex justify-center mb-3 sm:mb-4 lg:mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-lg sm:text-xl lg:text-2xl text-gray-800 mb-4 sm:mb-6 lg:mb-8 italic">
                    "{testimonials[currentTestimonial].quote}"
                  </blockquote>
                  <div className="flex items-center justify-center">
                    <img
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full mr-3 sm:mr-4"
                    />
                    <div>
                      <div className="font-semibold text-gray-900 text-sm sm:text-base">{testimonials[currentTestimonial].name}</div>
                      <div className="text-gray-600 text-xs sm:text-sm">{testimonials[currentTestimonial].company}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Customization Section */}
      <section className="py-16 lg:py-20 bg-gray-50" ref={customizeRef}>
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            initial={{ opacity: 0 }}
            animate={customizeInView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
          >
            <div>
              <motion.h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-gray-900 to-yellow-600 bg-clip-text text-transparent"
                initial={{ x: -50, opacity: 0 }}
                animate={customizeInView ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Customize Your Ride
              </motion.h2>
              <motion.p 
                className="text-lg lg:text-xl text-gray-600 mb-6 lg:mb-8"
                initial={{ x: -50, opacity: 0 }}
                animate={customizeInView ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Choose from premium color options and configure your perfect scooter
              </motion.p>

              <div className="space-y-6">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={customizeInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <h3 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4 text-gray-900 flex items-center">
                    <Palette className="w-5 h-5 mr-2 text-yellow-600" />
                    Color Options
                  </h3>
                  <div className="flex flex-wrap gap-3 lg:gap-4" ref={colorSelectorRef}>
                    {scooterColors.map((color, index) => (
                      <motion.button
                        key={index}
                        className={`relative w-12 h-12 lg:w-16 lg:h-16 rounded-full border-4 ${
                          selectedColor === index ? 'border-yellow-500 shadow-lg' : 'border-gray-300'
                        } transition-all duration-300 overflow-hidden group`}
                        style={{ 
                          backgroundColor: color.color,
                          boxShadow: selectedColor === index ? `0 0 30px ${color.glowColor}` : 'none'
                        }}
                        onClick={() => handleColorChange(index)}
                        onMouseEnter={() => setColorHoverIndex(index)}
                        onMouseLeave={() => setColorHoverIndex(null)}
                        whileHover={{ 
                          scale: 1.1,
                          boxShadow: `0 0 25px ${color.glowColor}`,
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ rotate: 0 }}
                        animate={{ 
                          rotate: selectedColor === index ? 360 : 0,
                          scale: selectedColor === index ? 1.1 : 1
                        }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      >
                        {/* Animated ring effect */}
                        {selectedColor === index && (
                          <motion.div
                            className="absolute inset-0 rounded-full border-2 border-yellow-400"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1.5, opacity: 0 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }}
                          />
                        )}
                        
                        {/* Sparkle effect on hover */}
                        {(colorHoverIndex === index || selectedColor === index) && (
                          <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{
                              background: `conic-gradient(from 0deg, transparent, ${color.glowColor}, transparent)`
                            }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                  <motion.p 
                    className="text-yellow-600 font-semibold mt-2 flex items-center"
                    key={selectedColor}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sparkles className="w-4 h-4 mr-1" />
                    {scooterColors[selectedColor].name}
                  </motion.p>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={customizeInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <h3 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4 text-gray-900">Quantity</h3>
                  <div className="flex items-center space-x-4">
                    <motion.button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors text-gray-700"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      -
                    </motion.button>
                    <motion.span 
                      className="text-xl lg:text-2xl font-bold text-gray-900 min-w-[3rem] text-center"
                      key={quantity}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {quantity}
                    </motion.span>
                    <motion.button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors text-gray-700"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      +
                    </motion.button>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-white rounded-2xl p-4 lg:p-6 border border-gray-200 shadow-lg"
                  initial={{ y: 20, opacity: 0 }}
                  animate={customizeInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <div className="flex justify-between items-center mb-3 lg:mb-4">
                    <span className="text-base lg:text-lg text-gray-600">Scooter Price</span>
                    <span className="text-lg lg:text-xl font-bold text-gray-900">₹{scooterPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-3 lg:mb-4">
                    <span className="text-base lg:text-lg text-gray-600">Quantity</span>
                    <span className="text-lg lg:text-xl font-bold text-gray-900">{quantity}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 lg:pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg lg:text-xl font-semibold text-gray-900">Total</span>
                      <motion.span 
                        className="text-xl lg:text-2xl font-bold text-yellow-600"
                        key={totalPrice}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        ₹{totalPrice.toLocaleString()}
                      </motion.span>
                    </div>
                  </div>
                </motion.div>

                <motion.button
                  onClick={handleBookNow}
                  className="w-full py-3 lg:py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-full text-lg lg:text-xl hover:shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={customizeInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  Book Now - Pay ₹{bookingAmount.toLocaleString()}
                </motion.button>
              </div>
            </div>

            {/* Enhanced 3D Vehicle Showcase */}
            <div className="relative mt-8 lg:mt-0" ref={vehicleRef}>
              <motion.div
                className="w-full h-80 lg:h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-2xl border border-gray-200"
                style={{
                  scale: vehicleScale,
                  rotateY: vehicleRotation,
                }}
                animate={{
                  background: `linear-gradient(135deg, ${scooterColors[selectedColor].color}20, ${scooterColors[selectedColor].color}10)`,
                }}
                transition={{ duration: 0.5 }}
              >
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: `linear-gradient(45deg, ${scooterColors[selectedColor].color}40, transparent, ${scooterColors[selectedColor].color}20)`
                  }}
                  animate={{
                    background: [
                      `linear-gradient(45deg, ${scooterColors[selectedColor].color}40, transparent, ${scooterColors[selectedColor].color}20)`,
                      `linear-gradient(225deg, ${scooterColors[selectedColor].color}40, transparent, ${scooterColors[selectedColor].color}20)`,
                      `linear-gradient(45deg, ${scooterColors[selectedColor].color}40, transparent, ${scooterColors[selectedColor].color}20)`
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Floating particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full opacity-60"
                    style={{
                      backgroundColor: scooterColors[selectedColor].color,
                      left: `${20 + i * 15}%`,
                      top: `${30 + (i % 2) * 40}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 0.8, 0.3],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2 + i * 0.3,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}

                {/* Enhanced 3D Vehicle */}
                <motion.div
                  className="flex justify-center items-center relative"
                  style={{
                    rotateY: useTransform(scrollYProgress, [0, 1], [0, 360]),
                  }}
                  animate={{
                    rotateY: isColorTransitioning ? 360 : 0,
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full blur-xl opacity-50"
                    style={{
                      background: `radial-gradient(circle, ${scooterColors[selectedColor].glowColor}, transparent)`,
                      width: '200%',
                      height: '200%',
                      left: '-50%',
                      top: '-50%',
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />

                  <motion.div
                    className="relative z-10"
                    style={{
                      filter: `drop-shadow(0 0 20px ${scooterColors[selectedColor].glowColor})`,
                    }}
                  >
                    <Car 
                      className="w-24 h-24 lg:w-32 lg:h-32 transition-colors duration-500"
                      style={{ color: scooterColors[selectedColor].color }}
                    />
                  </motion.div>

                  {/* Interactive spotlight effect */}
                  <motion.div
                    className="absolute pointer-events-none"
                    style={{
                      left: `${mousePosition.x}%`,
                      top: `${mousePosition.y}%`,
                      width: '100px',
                      height: '100px',
                      background: `radial-gradient(circle, ${scooterColors[selectedColor].glowColor}, transparent)`,
                      transform: 'translate(-50%, -50%)',
                      opacity: 0.3,
                      filter: 'blur(20px)',
                    }}
                  />
                </motion.div>

                {/* Color info badge */}
                <motion.div 
                  className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs lg:text-sm font-medium border border-gray-200"
                  key={selectedColor}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ color: scooterColors[selectedColor].color }}
                >
                  <div className="flex items-center">
                    <motion.div
                      className="w-2 h-2 rounded-full mr-2"
                      style={{ backgroundColor: scooterColors[selectedColor].color }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    {scooterColors[selectedColor].name}
                  </div>
                </motion.div>

                {/* Performance indicator */}
                <motion.div
                  className="absolute top-4 right-4 flex items-center space-x-2 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs lg:text-sm font-medium border border-gray-200"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <Zap className="w-3 h-3 text-yellow-500" />
                  <span className="text-gray-700">45 km/h</span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Ridezzy Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-gray-900 to-yellow-600 bg-clip-text text-transparent">
              Why Choose Ridezzy?
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Compare Ridezzy with traditional delivery vehicles and see the difference
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Traditional Vehicles */}
            <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 border border-gray-200">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6 text-center">Traditional Vehicles</h3>
              <div className="space-y-3 lg:space-y-4">
                <div className="flex items-center">
                  <span className="text-red-500 mr-3 text-lg">✗</span>
                  <span className="text-sm lg:text-base text-gray-600">High fuel costs</span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-500 mr-3 text-lg">✗</span>
                  <span className="text-sm lg:text-base text-gray-600">Frequent maintenance</span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-500 mr-3 text-lg">✗</span>
                  <span className="text-sm lg:text-base text-gray-600">Environmental impact</span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-500 mr-3 text-lg">✗</span>
                  <span className="text-sm lg:text-base text-gray-600">Complex registration</span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-500 mr-3 text-lg">✗</span>
                  <span className="text-sm lg:text-base text-gray-600">Limited payload</span>
                </div>
              </div>
            </div>

            {/* Ridezzy */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 lg:p-8 border-2 border-yellow-300 relative overflow-hidden md:col-span-2 lg:col-span-1">
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-center py-2 text-xs lg:text-sm font-bold">
                RECOMMENDED
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6 text-center mt-4">Ridezzy Premium</h3>
              <div className="space-y-3 lg:space-y-4">
                <div className="flex items-center">
                  <span className="text-green-500 mr-3 text-lg">✓</span>
                  <span className="text-sm lg:text-base text-gray-700 font-medium">Zero fuel costs</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-3 text-lg">✓</span>
                  <span className="text-sm lg:text-base text-gray-700 font-medium">Minimal maintenance</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-3 text-lg">✓</span>
                  <span className="text-sm lg:text-base text-gray-700 font-medium">100% eco-friendly</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-3 text-lg">✓</span>
                  <span className="text-sm lg:text-base text-gray-700 font-medium">No registration needed</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-3 text-lg">✓</span>
                  <span className="text-sm lg:text-base text-gray-700 font-medium">150 kg payload capacity</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-3 text-lg">✓</span>
                  <span className="text-sm lg:text-base text-gray-700 font-medium">Smart battery swapping</span>
                </div>
              </div>
            </div>

            {/* Other Electric */}
            <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 border border-gray-200 md:col-span-2 lg:col-span-1">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6 text-center">Other Electric</h3>
              <div className="space-y-3 lg:space-y-4">
                <div className="flex items-center">
                  <span className="text-green-500 mr-3 text-lg">✓</span>
                  <span className="text-sm lg:text-base text-gray-600">No fuel costs</span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-500 mr-3 text-lg">✗</span>
                  <span className="text-sm lg:text-base text-gray-600">Long charging times</span>
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-3 text-lg">~</span>
                  <span className="text-sm lg:text-base text-gray-600">Limited range</span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-500 mr-3 text-lg">✗</span>
                  <span className="text-sm lg:text-base text-gray-600">Expensive maintenance</span>
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-3 text-lg">~</span>
                  <span className="text-sm lg:text-base text-gray-600">Average payload</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 lg:mt-12 text-center">
            <motion.button
              onClick={handleBookNow}
              className="inline-flex items-center px-6 py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-full text-base lg:text-lg hover:shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Rocket className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
              Book Your Ridezzy Today
            </motion.button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6 bg-gradient-to-r from-gray-900 to-yellow-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
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
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  className="w-full p-4 sm:p-5 lg:p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  <span className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold text-gray-900 pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 transition-transform flex-shrink-0 ${
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
                      <div className="p-4 sm:p-5 lg:p-6 pt-0 text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed border-t border-gray-200">
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
              className="fixed right-0 top-0 h-full w-full sm:max-w-md bg-white border-l border-gray-200 z-50 p-4 sm:p-5 lg:p-6 overflow-y-auto shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex items-center justify-between mb-4 sm:mb-5 lg:mb-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Book Your Ridezzy</h2>
                <button
                  onClick={() => setShowBookingPanel(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                </button>
              </div>

              <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                {/* Order Summary */}
                <div className="bg-gray-50 rounded-2xl p-4 sm:p-5 lg:p-6 border border-gray-200">
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Order Summary</h3>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm sm:text-base text-gray-600">Ridezzy Premium</span>
                      <span className="text-sm sm:text-base text-gray-900 font-semibold">₹{scooterPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm sm:text-base text-gray-600">Quantity</span>
                      <span className="text-sm sm:text-base text-gray-900 font-semibold">{quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm sm:text-base text-gray-600">Color</span>
                      <span className="text-sm sm:text-base text-gray-900 font-semibold">{scooterColors[selectedColor].name}</span>
                    </div>
                    <div className="border-t border-gray-300 pt-2 sm:pt-3">
                      <div className="flex justify-between">
                        <span className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900">Total</span>
                        <span className="text-sm sm:text-base lg:text-lg font-bold text-yellow-600">₹{totalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Form */}
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.customerName}
                      onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.customerEmail}
                      onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Enter your city"
                    />
                  </div>
                </div>

                {/* Payment Info */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-3 sm:p-4">
                  <div className="flex items-center mb-1 sm:mb-2">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 mr-2" />
                    <span className="text-sm sm:text-base text-yellow-700 font-semibold">Secure Booking</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700">
                    Pay only ₹{bookingAmount.toLocaleString()} to secure your booking. 
                    Rest amount due on delivery.
                  </p>
                </div>

                {/* Book Now Button */}
                <motion.button
                  className="w-full py-3 sm:py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-full text-sm sm:text-base lg:text-lg hover:shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBookingSubmit}
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