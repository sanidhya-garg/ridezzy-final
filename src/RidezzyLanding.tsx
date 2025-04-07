import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import anshdeep from "./assets/ansh.jpeg";
import sanidhya from "./assets/sanidhya.jpeg";
import amar from "./assets/amar.jpeg";
import amit from "./assets/amit.jpeg";
import satya from "./assets/satya.jpeg";
import Testimonial from "./components/Testimonial";
import appImage from "./assets/app.jpeg"
import '@fortawesome/fontawesome-free/css/all.min.css';

import News from "./components/News";
import Product from "./components/Product"
import  About from "./components/About"
import Hero from "./components/Hero";
import SmartSwapNetwork from "./components/SmartSwapNetwork";
import Footer from "./components/Footer";
import { MdOutlineSpeed, MdOutlineBatteryChargingFull } from "react-icons/md";

import { FaChargingStation } from "react-icons/fa6";
import { BsGrid3X3GapFill } from "react-icons/bs";

import { AiOutlineSearch } from "react-icons/ai";
import { GiNetworkBars } from "react-icons/gi";

export default function RidezzyLanding() {
    const features = [
        {
          icon: <FaChargingStation className="text-red-500 text-3xl" />,
          title: "Smart Swap Stations",
          description: "Always on, always connected and always ready for your energy needs.",
        },
        {
          icon: <BsGrid3X3GapFill className="text-red-500 text-3xl" />,
          title: "Modular Design",
          description: "Easy to install, all-in-one module, makes deployment in new cities or expansion within a city quick and easy.",
        },
        {
          icon: <MdOutlineBatteryChargingFull className="text-red-500 text-3xl" />,
          title: "Intelligent Charging",
          description: "Charging speed varies based on data tracking efficiency of overall network to maximize battery availability while minimizing degradation due to battery aging effects.",
        },
        {
          icon: <AiOutlineSearch className="text-red-500 text-3xl" />,
          title: "Smart & Self Diagnosing",
          description: "Software and remote monitoring enables 24/7 performance tracking.",
        },
        {
          icon: <GiNetworkBars className="text-red-500 text-3xl" />,
          title: "Smart Grid Ready",
          description: "Designed for bidirectional energy exchange to ensure efficient power distribution.",
        },
        {
          icon: <MdOutlineSpeed className="text-red-500 text-3xl" />,
          title: "Optimized Energy Utilization",
          description: "AI-driven analytics ensure efficient power usage and distribution.",
        },
      ];
  return (
    
    <div className="bg-gray-100 text-gray-900">
      {/* Taskbar Header */}
      <header className="bg-black bg-opacity-80 backdrop-blur-md text-white px-6 py-4 fixed top-0 left-0 w-full flex justify-between items-center shadow-lg z-50 border-b border-gray-700">
  {/* Logo */}
  <h1 className="text-4xl font-bold tracking-wide text-yellow-400">
    Ridezzy
  </h1>

  {/* Navigation */}
  <nav>
    <ul className="flex space-x-8 text-lg font-medium">
      {["Home", "About", "Features", "Office"].map((item, index) => (
        <li key={index} className="relative group">
          <Link
            to={`/${item.toLowerCase()}`}
            className="text-gray-300 hover:text-yellow-400 transition-all duration-300 ease-in-out"
          >
            {item}
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
      ))}
    </ul>
  </nav>

  {/* Call-to-Action Button */}
  <Link
    to="/get-started"
    className="bg-yellow-400 text-black px-5 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-all duration-300"
  >
    Get Started
  </Link>
</header>


     <Hero />
<Product />
      {/* About Us Section */}
      <About />
      
      {/* Features Section */}
     
      <Testimonial/>
      <div className="bg-white min-h-screen flex justify-center items-center p-8">
      <section className="w-full flex justify-center bg-yellow-50 py-12 px-6">
     <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12 px-6 py-12">
  
  {/* Left Side - Animated Image */}
  <motion.div
    className="w-full md:w-1/2 flex justify-center"
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, ease: "easeOut", type: "spring" }}
    whileHover={{ scale: 1.05, rotate: 2 }}
  >
    <motion.img
      src={appImage}
      alt="Mobile App"
      className="w-[270px] h-[480px] object-cover rounded-xl shadow-xl border-4 border-yellow-400"
      animate={{
        y: [0, -10, 0], // Floating effect
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    />
  </motion.div>

  {/* Right Side - Animated Text */}
  <motion.div
    className="w-full md:w-1/2 text-left"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
  >
    <p className="text-yellow-500 font-semibold text-sm uppercase tracking-wide">
      01 — Seamless Experience
    </p>
    <h2 className="text-4xl font-extrabold text-gray-900 mt-2 leading-snug">
      Effortless Installation & Intuitive Experience
    </h2>

    {/* Animated List Items */}
    <motion.ul
      className="mt-6 space-y-4 text-gray-800 text-lg"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.2 },
        },
      }}
    >
      {[
        "Quick, hassle-free installation process.",
        "User-friendly interface for all ages.",
        "Locate nearby battery swap stations instantly.",
        "Check real-time battery availability with ease.",
        "Seamlessly manage your account & preferences.",
      ].map((text, index) => (
        <motion.li
          key={index}
          className="flex items-center gap-3"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileHover={{ scale: 1.1, color: "#facc15" }} // Glowing effect on hover
        >
          <span className="text-yellow-500 text-xl">✔️</span> {text}
        </motion.li>
      ))}
    </motion.ul>
  </motion.div>
</div>
    </section>
    </div>
    {/* Meet the Team Section */}
   <section className="py-20 pb-32 min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
  <div className="container mx-auto px-6">
    <h2 className="text-5xl font-bold text-yellow-400 text-center mb-16">Meet Our Team</h2>
    <div className="flex flex-wrap justify-center gap-10">
      {[
        { img: amar, name: "Amar Kumar", role: "Founder & CEO", linkedin: "https://www.linkedin.com/in/amar-kumar23/" },
        { img: sanidhya, name: "Sanidhya Garg", role: "Co-Founder & COO", linkedin: "https://www.linkedin.com/in/sanidhya-garg-iitd/" },
        { img: satya, name: "Satya Vyas", role: "Advisor & Mentor", linkedin: "https://www.linkedin.com/in/satyavyas/" },
        { img: anshdeep, name: "Anshdeep Singh", role: "Software Developer", linkedin: "https://www.linkedin.com/in/anshdeep-singh-a01649231/" },
        { img: amit, name: "Amit Kumar", role: "Advisor & Mentor", linkedin: "#" }
      ].map((member, index) => (
        <motion.div 
          key={index}
          className="w-[350px] bg-gray-800 bg-opacity-90 backdrop-blur-lg rounded-xl shadow-lg border border-yellow-500 hover:border-yellow-400 p-6 flex items-center space-x-6 transition-transform transform hover:-translate-y-2"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <img 
            src={member.img} 
            alt={member.name} 
            className="w-20 h-20 object-cover rounded-full border-4 border-yellow-600 shadow-md"
          />
          <div>
            <h3 className="text-xl font-bold text-yellow-400">{member.name}</h3>
            <p className="text-lg text-gray-300">{member.role}</p>
            {member.linkedin !== "#" && (
              <a 
                href={member.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center text-yellow-500 hover:text-yellow-400 transition-colors duration-300" 
              >
                <svg className="w-5 h-5 fill-current mr-1" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.28h-3v-5.48c0-1.3-.47-2.18-1.65-2.18-.9 0-1.44.61-1.68 1.2-.09.21-.11.51-.11.81v5.65h-3s.04-9.17 0-10.13h3v1.44c.4-.61 1.12-1.47 2.74-1.47 2 0 3.5 1.29 3.5 4.06v6.1z"/>
                </svg>
                <span className="font-medium">View Profile</span>
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
<SmartSwapNetwork />

{/*contact us*/}
<section className="py-12 bg-white">
  <div className="container mx-auto px-6">
    <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">Contact Us</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Contact Information */}
      <div className="bg-yellow-50 rounded-xl p-6 shadow-lg border-2 border-yellow-100 hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Get in Touch With Our Team</h3>
        <div className="space-y-4">
          {/* Phone Information */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-yellow-100 rounded-full">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
            </div>
            <div>
              <p className="text-base text-gray-600">Mon-Sat from 10am to 7pm</p>
              <p className="text-base font-semibold text-gray-800">+91 80627 24585</p>
            </div>
          </div>

          {/* Office Information */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-yellow-100 rounded-full">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <div>
              <p className="text-base text-gray-600">Come say hello at our office HQ</p>
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-semibold text-yellow-600 hover:text-yellow-700 transition-colors duration-300"
              >
                Get Directions →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-yellow-50 rounded-xl p-6 shadow-lg border-2 border-yellow-100 hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Send Us a Message</h3>
        <form className="space-y-4">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-base font-medium text-gray-700">Full Name*</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="w-full px-3 py-2 rounded-lg border-2 border-yellow-100 focus:border-yellow-300 focus:ring-2 focus:ring-yellow-200 outline-none"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-base font-medium text-gray-700">Phone Number*</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              className="w-full px-3 py-2 rounded-lg border-2 border-yellow-100 focus:border-yellow-300 focus:ring-2 focus:ring-yellow-200 outline-none"
              placeholder="Enter your phone number"
              required
            />
          
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-base font-medium text-gray-700">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 rounded-lg border-2 border-yellow-100 focus:border-yellow-300 focus:ring-2 focus:ring-yellow-200 outline-none"
              placeholder="Enter your email"
              required
            />
            
          </div>

          {/* State and City Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         
            
          </div>

          {/* Reason for Contact */}
          <div>
            <label htmlFor="reason" className="block text-base font-medium text-gray-700">Reason for Contact*</label>
            <textarea
              id="reason"
              name="reason"
              rows="3"
              className="w-full px-3 py-2 rounded-lg border-2 border-yellow-100 focus:border-yellow-300 focus:ring-2 focus:ring-yellow-200 outline-none"
              placeholder="Tell us how we can help"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  </div>
</section>
<News />
<Footer />
      {/* Google Map Section */}
     
      {/* Professional Footer */}

    </div>
  );
}
