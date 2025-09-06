import { motion } from "framer-motion";
import { Shield, Zap, Battery, MapPin, Clock, TrendingUp, CheckCircle } from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../components/Footer";
import { useState, useEffect, useMemo } from "react";

const AppPage = () => {
  const [activeFeature, setActiveFeature] = useState("schedule");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const featureKeys = useMemo(() => ["schedule", "battery", "evmode", "route", "secure", "earnings", "offers", "realtime", "quick"], []);

  // Auto-cycle through features
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveFeature(current => {
        const currentIndex = featureKeys.indexOf(current);
        const nextIndex = (currentIndex + 1) % featureKeys.length;
        return featureKeys[nextIndex];
      });
    }, 2500); // Change every 2.5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, featureKeys]);

  // Handle manual feature selection
  const handleFeatureClick = (feature: string) => {
    setIsAutoPlaying(false); // Stop auto-play when user interacts
    setActiveFeature(feature);
    
    // Resume auto-play after 5 seconds of inactivity
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 5000);
  };

  type FeatureType = {
    title: string;
    subtitle: string;
    icon: React.ReactElement;
    bgColor: string;
    screen: {
      icon: React.ReactElement;
      iconBg: string;
      title: string;
      subtitle: string;
    };
  };

  const features: Record<string, FeatureType> = {
    battery: {
      title: "Battery",
      subtitle: "Management",
      icon: <Battery className="w-8 h-8 text-blue-600" />,
      bgColor: "bg-blue-100",
      screen: {
        icon: <Battery className="w-10 h-10 text-white" />,
        iconBg: "bg-blue-500",
        title: "Battery",
        subtitle: "85% - 245km range"
      }
    },
    evmode: {
      title: "EV Mode",
      subtitle: "",
      icon: <div className="w-8 h-8 bg-green-600 rounded-full"></div>,
      bgColor: "bg-green-100",
      screen: {
        icon: <div className="w-10 h-10 bg-green-600 rounded-full"></div>,
        iconBg: "bg-green-500",
        title: "EV Mode",
        subtitle: "Eco driving active"
      }
    },
    route: {
      title: "Route",
      subtitle: "Planning",
      icon: <MapPin className="w-8 h-8 text-orange-600" />,
      bgColor: "bg-orange-100",
      screen: {
        icon: <MapPin className="w-10 h-10 text-white" />,
        iconBg: "bg-orange-500",
        title: "Route",
        subtitle: "Optimized path ready"
      }
    },
    secure: {
      title: "Secure",
      subtitle: "Payments",
      icon: <Shield className="w-8 h-8 text-red-600" />,
      bgColor: "bg-red-100",
      screen: {
        icon: <Shield className="w-10 h-10 text-white" />,
        iconBg: "bg-red-500",
        title: "Secure",
        subtitle: "Payments protected"
      }
    },
    earnings: {
      title: "Earnings",
      subtitle: "Tracking",
      icon: <TrendingUp className="w-8 h-8 text-yellow-600" />,
      bgColor: "bg-yellow-100",
      screen: {
        icon: <TrendingUp className="w-10 h-10 text-white" />,
        iconBg: "bg-yellow-500",
        title: "Earnings",
        subtitle: "₹2,450 today"
      }
    },
    offers: {
      title: "Offers",
      subtitle: "",
      icon: <div className="w-8 h-8 bg-blue-600 rounded text-white text-sm flex items-center justify-center font-bold">%</div>,
      bgColor: "bg-blue-100",
      screen: {
        icon: <div className="w-10 h-10 bg-blue-600 rounded text-white text-sm flex items-center justify-center font-bold">%</div>,
        iconBg: "bg-blue-500",
        title: "Offers",
        subtitle: "20% off next ride"
      }
    },
    realtime: {
      title: "Real-time",
      subtitle: "Tracking",
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      bgColor: "bg-blue-100",
      screen: {
        icon: <Clock className="w-10 h-10 text-white" />,
        iconBg: "bg-blue-500",
        title: "Real-time",
        subtitle: "Live tracking active"
      }
    },
    quick: {
      title: "Quick",
      subtitle: "Booking",
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      bgColor: "bg-yellow-100",
      screen: {
        icon: <Zap className="w-10 h-10 text-white" />,
        iconBg: "bg-yellow-500",
        title: "Quick",
        subtitle: "Book in 30 seconds"
      }
    },
    schedule: {
      title: "Schedule",
      subtitle: "your order",
      icon: <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
      </svg>,
      bgColor: "bg-red-500",
      screen: {
        icon: <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
        </svg>,
        iconBg: "bg-red-500",
        title: "Schedule",
        subtitle: "your order"
      }
    }
  };

  const benefits = [
    "Zero fuel costs - Save up to ₹15,000 monthly",
    "30-second battery swaps at 500+ stations",
    "Earn up to ₹40,000 monthly with optimized routes",
    "Insurance and maintenance included",
    "Real-time earnings tracking and analytics",
    "24/7 roadside assistance across India"
  ];

  return (
    <div className="bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-20 pb-20 bg-gradient-to-br from-yellow-50 via-amber-25 to-orange-50 relative overflow-hidden">
        {/* Yellow accent decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center min-h-[600px]">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8 lg:col-span-2"
            >
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Download the app now!
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Experience seamless EV logistics 
                  <br />
                  only on the Ridezzy app
                </p>
              </div>

              {/* Play Store Button */}
              <div className="flex justify-start">
                <motion.a
                  href="/ridezzy-app.apk.md"
                  download="ridezzy-app.apk"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <div className="bg-gradient-to-r from-gray-900 to-black text-white px-6 py-3 rounded-lg flex items-center space-x-3 hover:from-black hover:to-gray-800 transition-all duration-300 shadow-lg border border-yellow-400/20">
                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-6 h-6">
                        <path fill="#4285F4" d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5Z"/>
                        <path fill="#34A853" d="M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12Z"/>
                        <path fill="#FBBC04" d="M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81Z"/>
                        <path fill="#EA4335" d="M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-gray-300">GET IT ON</div>
                      <div className="text-lg font-semibold">Google Play</div>
                    </div>
                  </div>
                </motion.a>
              </div>
            </motion.div>

            {/* Right Content - Interactive Phone with Side Features */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative flex justify-center lg:col-span-1 mt-8 lg:mt-16 mr-0 lg:mr-8"
            >
              <div className="relative flex items-center justify-center">
                {/* Left Feature Tiles */}
                <div className="hidden lg:flex flex-col space-y-4 mr-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    onClick={() => handleFeatureClick("battery")}
                    className={`bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all cursor-pointer border-2 w-32 ${
                      activeFeature === "battery" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                    }`}
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
                      <Battery className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900 text-center">Battery</h4>
                    <p className="text-xs text-gray-600 text-center">Management</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    onClick={() => handleFeatureClick("route")}
                    className={`bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all cursor-pointer border-2 w-32 ${
                      activeFeature === "route" ? "border-orange-500 bg-orange-50" : "border-gray-200"
                    }`}
                  >
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
                      <MapPin className="w-6 h-6 text-orange-600" />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900 text-center">Route</h4>
                    <p className="text-xs text-gray-600 text-center">Planning</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    onClick={() => handleFeatureClick("secure")}
                    className={`bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all cursor-pointer border-2 w-32 ${
                      activeFeature === "secure" ? "border-red-500 bg-red-50" : "border-gray-200"
                    }`}
                  >
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
                      <Shield className="w-6 h-6 text-red-600" />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900 text-center">Secure</h4>
                    <p className="text-xs text-gray-600 text-center">Payments</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                    onClick={() => handleFeatureClick("realtime")}
                    className={`bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all cursor-pointer border-2 w-32 ${
                      activeFeature === "realtime" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                    }`}
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900 text-center">Real-time</h4>
                    <p className="text-xs text-gray-600 text-center">Tracking</p>
                  </motion.div>
                </div>

                {/* Phone Frame */}
                <div className="w-80 h-[600px] bg-black rounded-[3rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-[2.5rem] relative overflow-hidden">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
                    
                    {/* Interactive Screen Content */}
                    <div className="h-full flex flex-col items-center justify-center p-8 pt-12">
                      <motion.div
                        key={activeFeature}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className={`w-20 h-20 ${features[activeFeature].screen.iconBg} rounded-3xl flex items-center justify-center mb-6`}
                      >
                        {features[activeFeature].screen.icon}
                      </motion.div>
                      <motion.h3
                        key={`${activeFeature}-title`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="text-2xl font-bold text-gray-900 mb-2"
                      >
                        {features[activeFeature].screen.title}
                      </motion.h3>
                      <motion.p
                        key={`${activeFeature}-subtitle`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="text-lg text-gray-600 text-center"
                      >
                        {features[activeFeature].screen.subtitle}
                      </motion.p>
                    </div>
                  </div>
                </div>

                {/* Right Feature Tiles */}
                <div className="hidden lg:flex flex-col space-y-4 ml-8">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 }}
                    onClick={() => handleFeatureClick("earnings")}
                    className={`bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all cursor-pointer border-2 w-32 ${
                      activeFeature === "earnings" ? "border-yellow-500 bg-yellow-50" : "border-gray-200"
                    }`}
                  >
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
                      <TrendingUp className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900 text-center">Earnings</h4>
                    <p className="text-xs text-gray-600 text-center">Tracking</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 }}
                    onClick={() => handleFeatureClick("quick")}
                    className={`bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all cursor-pointer border-2 w-32 ${
                      activeFeature === "quick" ? "border-yellow-500 bg-yellow-50" : "border-gray-200"
                    }`}
                  >
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
                      <Zap className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900 text-center">Quick</h4>
                    <p className="text-xs text-gray-600 text-center">Booking</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 }}
                    onClick={() => handleFeatureClick("offers")}
                    className={`bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all cursor-pointer border-2 w-32 ${
                      activeFeature === "offers" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                    }`}
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
                      <div className="w-6 h-6 bg-blue-600 rounded text-white text-sm flex items-center justify-center font-bold">%</div>
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900 text-center">Offers</h4>
                    <p className="text-xs text-gray-600 text-center">Discounts</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3 }}
                    onClick={() => handleFeatureClick("evmode")}
                    className={`bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all cursor-pointer border-2 w-32 ${
                      activeFeature === "evmode" ? "border-green-500 bg-green-50" : "border-gray-200"
                    }`}
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
                      <div className="w-6 h-6 bg-green-600 rounded-full"></div>
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900 text-center">EV Mode</h4>
                    <p className="text-xs text-gray-600 text-center">Eco Drive</p>
                  </motion.div>
                </div>
              </div>

              {/* Mobile Feature Grid - Below Phone */}
              <div className="lg:hidden mt-8 grid grid-cols-4 gap-3 max-w-lg mx-auto absolute -bottom-24 left-1/2 transform -translate-x-1/2">
                <div 
                  onClick={() => handleFeatureClick("battery")}
                  className={`bg-white rounded-xl p-3 shadow-md border-2 text-center cursor-pointer transition-all ${
                    activeFeature === "battery" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                  }`}
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-2 mx-auto">
                    <Battery className="w-4 h-4 text-blue-600" />
                  </div>
                  <h4 className="text-xs font-semibold text-gray-900">Battery</h4>
                </div>
                <div 
                  onClick={() => handleFeatureClick("earnings")}
                  className={`bg-white rounded-xl p-3 shadow-md border-2 text-center cursor-pointer transition-all ${
                    activeFeature === "earnings" ? "border-yellow-500 bg-yellow-50" : "border-gray-200"
                  }`}
                >
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mb-2 mx-auto">
                    <TrendingUp className="w-4 h-4 text-yellow-600" />
                  </div>
                  <h4 className="text-xs font-semibold text-gray-900">Earnings</h4>
                </div>
                <div 
                  onClick={() => handleFeatureClick("offers")}
                  className={`bg-white rounded-xl p-3 shadow-md border-2 text-center cursor-pointer transition-all ${
                    activeFeature === "offers" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                  }`}
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-2 mx-auto">
                    <div className="w-4 h-4 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">%</div>
                  </div>
                  <h4 className="text-xs font-semibold text-gray-900">Offers</h4>
                </div>
                <div 
                  onClick={() => handleFeatureClick("quick")}
                  className={`bg-white rounded-xl p-3 shadow-md border-2 text-center cursor-pointer transition-all ${
                    activeFeature === "quick" ? "border-yellow-500 bg-yellow-50" : "border-gray-200"
                  }`}
                >
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mb-2 mx-auto">
                    <Zap className="w-4 h-4 text-yellow-600" />
                  </div>
                  <h4 className="text-xs font-semibold text-gray-900">Quick</h4>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Why Choose Ridezzy */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-yellow-500">Ridezzy?</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of delivery partners earning more with sustainable electric vehicles
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-gray-700 font-medium leading-relaxed">{benefit}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* QR Code Download Section */}
      <div className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Rounded rectangular container */}
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-lg border border-yellow-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6 sm:space-y-8 order-2 lg:order-1"
              >
                <div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                    Download the app now!
                  </h2>
                  <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                    Experience seamless EV logistics
                    <br className="hidden sm:block" />
                    <span className="sm:hidden"> </span>only on the Ridezzy app
                  </p>
                </div>

                {/* Play Store Button */}
                <div className="flex justify-start">
                  <motion.a
                    href="/ridezzy-app.apk.md"
                    download="ridezzy-app.apk"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block w-full sm:w-auto"
                  >
                    <div className="bg-black text-white px-4 sm:px-6 py-3 rounded-xl flex items-center justify-center sm:justify-start space-x-3 hover:bg-gray-800 transition-colors shadow-lg">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-8 sm:h-8">
                          <path fill="#4285F4" d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5Z"/>
                          <path fill="#34A853" d="M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12Z"/>
                          <path fill="#FBBC04" d="M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81Z"/>
                          <path fill="#EA4335" d="M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="text-xs text-gray-300 uppercase tracking-wide">GET IT ON</div>
                        <div className="text-base sm:text-lg font-semibold">Google Play</div>
                      </div>
                    </div>
                  </motion.a>
                </div>
              </motion.div>

              {/* Right Content - Half Phone with QR Code */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                className="flex justify-center lg:justify-end relative order-1 lg:order-2"
              >
                <div className="relative overflow-hidden">
                  {/* Half Phone Frame - Responsive sizing */}
                  <div className="w-64 h-[280px] sm:w-72 sm:h-[320px] lg:w-80 lg:h-[350px] bg-gray-900 rounded-t-[2rem] sm:rounded-t-[2.5rem] lg:rounded-t-[3rem] p-1.5 sm:p-2 shadow-2xl relative overflow-hidden">
                    <div className="w-full h-full bg-white rounded-t-[1.5rem] sm:rounded-t-[2rem] lg:rounded-t-[2.5rem] relative overflow-hidden">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-4 sm:w-28 sm:h-5 lg:w-32 lg:h-6 bg-black rounded-b-xl sm:rounded-b-xl lg:rounded-b-2xl z-10"></div>
                      
                      {/* Screen Content */}
                      <div className="h-full flex flex-col items-center justify-start p-4 sm:p-5 lg:p-6 pt-8 sm:pt-10 lg:pt-12 bg-gradient-to-b from-gray-50 to-white">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                          className="text-center mb-4 sm:mb-5 lg:mb-6"
                        >
                          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                            Scan the QR code to
                          </h3>
                          <p className="text-base sm:text-lg text-gray-600">
                            download the app
                          </p>
                        </motion.div>

                        {/* QR Code - Responsive sizing */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.8 }}
                          className="w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-md border border-gray-200"
                        >
                          <div className="w-full h-full bg-black rounded-md sm:rounded-lg relative overflow-hidden">
                            {/* QR Code Pattern */}
                            <div className="absolute inset-1 grid grid-cols-10 grid-rows-10 gap-px">
                              {/* Corner markers - Top Left */}
                              <div className="col-span-3 row-span-3 bg-white border border-black rounded-sm">
                                <div className="w-full h-full bg-black rounded-sm m-0.5"></div>
                              </div>
                              <div className="bg-white"></div>
                              <div className="bg-black"></div>
                              <div className="bg-white"></div>
                              <div className="bg-black"></div>
                              {/* Corner markers - Top Right */}
                              <div className="col-span-3 row-span-3 bg-white border border-black rounded-sm">
                                <div className="w-full h-full bg-black rounded-sm m-0.5"></div>
                              </div>
                              
                              {/* Data pattern rows */}
                              <div className="bg-white"></div>
                              <div className="bg-black"></div>
                              <div className="bg-white"></div>
                              <div className="bg-black"></div>
                              <div className="bg-white"></div>
                              <div className="bg-black"></div>
                              <div className="bg-white"></div>
                              
                              <div className="bg-black"></div>
                              <div className="bg-white"></div>
                              <div className="bg-black"></div>
                              <div className="bg-white"></div>
                              <div className="bg-black"></div>
                              <div className="bg-white"></div>
                              <div className="bg-black"></div>
                              
                              <div className="bg-white"></div>
                              <div className="bg-black"></div>
                              <div className="bg-white"></div>
                              <div className="bg-black"></div>
                              <div className="bg-white"></div>
                              <div className="bg-black"></div>
                              <div className="bg-white"></div>
                              
                              {/* Corner markers - Bottom Left */}
                              <div className="col-span-3 row-span-3 bg-white border border-black rounded-sm">
                                <div className="w-full h-full bg-black rounded-sm m-0.5"></div>
                              </div>
                              <div className="bg-black"></div>
                              <div className="bg-white"></div>
                              <div className="bg-black"></div>
                              <div className="bg-white"></div>
                              <div className="bg-black"></div>
                              <div className="bg-white"></div>
                            </div>
                            
                            {/* Yellow corner squares - Responsive sizing */}
                            <div className="absolute top-0.5 left-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 bg-yellow-500 rounded-sm"></div>
                            <div className="absolute top-0.5 right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 bg-yellow-500 rounded-sm"></div>
                            <div className="absolute bottom-0.5 left-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 bg-yellow-500 rounded-sm"></div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Fade effect at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-7 lg:h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AppPage;