import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import Navbar from "../Navbar";
import Footer from "./Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto text-center w-full">
          {/* 404 Number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
            className="mb-6 sm:mb-8"
          >
            <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent leading-none">
              404
            </h1>
          </motion.div>

          {/* Main Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-8 sm:mb-10 px-4"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              Page Not Found
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Sorry, we couldn't find the page you're looking for. 
              Let's get you back to where you need to be.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4"
          >
            <Link
              to="/"
              className="w-full sm:w-auto group flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Home className="w-4 h-4 sm:w-5 sm:h-5" />
              Go Home
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto group flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg border-2 border-gray-200 hover:border-gray-300 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              Go Back
            </button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="pt-6 sm:pt-8 border-t border-gray-200 mx-4"
          >
            <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">Quick Links:</p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
              <Link to="/about" className="text-yellow-600 hover:text-yellow-700 hover:underline transition px-2 py-1">About Us</Link>
              <Link to="/environment" className="text-yellow-600 hover:text-yellow-700 hover:underline transition px-2 py-1">Environment</Link>
              <Link to="/advertising" className="text-yellow-600 hover:text-yellow-700 hover:underline transition px-2 py-1">Advertise</Link>
              <Link to="/contact" className="text-yellow-600 hover:text-yellow-700 hover:underline transition px-2 py-1">Contact</Link>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
