
import { Link } from "react-router-dom";

import Testimonial from "./components/Testimonial";
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from './assets/logo.jpeg';
import Product from "./components/Product"
import Career from "./components/Career"
import  About from "./components/About"
import Hero from "./components/Hero";
import Footer from "./components/Footer";

export default function RidezzyLanding() {
    
  return (
    
    <div className="bg-gray-100 text-gray-900">
      {/* Taskbar Header */}
      (
        <header className="bg-white bg-opacity-95 backdrop-blur-md text-black px-6 py-4 fixed top-0 left-0 w-full flex justify-between items-center shadow-md z-50 border-b border-gray-200">
      
      {/* Logo Image */}
      <Link to="/" className="flex items-center">
        <img
          src={logo}
          alt="Ridezzy Logo"
          className="w-32 h-auto object-contain" // Resize logo here
        />
      </Link>

      {/* Navigation */}
      <nav>
        <ul className="flex space-x-8 text-lg font-medium">
          {["Home", "About", "Features", "Office"].map((item, index) => (
            <li key={index} className="relative group">
              <Link
                to={`/${item.toLowerCase()}`}
                className="text-gray-700 hover:text-yellow-500 transition-all duration-300 ease-in-out"
              >
                {item}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* CTA Button */}
      <Link
        to="/get-started"
        className="bg-yellow-400 text-black px-5 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-all duration-300"
      >
        Get Started
      </Link>
    </header>


     <Hero />

      <About />
      <Product />
<Career />
<Testimonial/>
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
      <div className="bg-yellow-50 rounded-3xl p-10 border border-yellow-100 shadow-md max-w-3xl mx-auto transition hover:shadow-lg">
  <h2 className="text-3xl font-bold text-gray-900 text-center mb-8 tracking-tight">
    Contact Our Team
  </h2>

  <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Full Name */}
    <div className="col-span-1">
      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
        Full Name<span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="fullName"
        name="fullName"
        required
        placeholder="e.g. Anshdeep Singh"
        className="w-full px-4 py-3 rounded-xl border border-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-gray-900"
      />
    </div>

    {/* Phone Number */}
    <div className="col-span-1">
      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
        Phone Number<span className="text-red-500">*</span>
      </label>
      <input
        type="tel"
        id="phoneNumber"
        name="phoneNumber"
        required
        placeholder="+91 1234567890"
        className="w-full px-4 py-3 rounded-xl border border-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-gray-900"
      />
    </div>

    {/* Email */}
    <div className="col-span-1 md:col-span-2">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
        Email<span className="text-red-500">*</span>
      </label>
      <input
        type="email"
        id="email"
        name="email"
        required
        placeholder="you@example.com"
        className="w-full px-4 py-3 rounded-xl border border-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-gray-900"
      />
    </div>

    {/* Message */}
    <div className="col-span-1 md:col-span-2">
      <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
        Message<span className="text-red-500">*</span>
      </label>
      <textarea
        id="reason"
        name="reason"
        required
        placeholder="How can we help you?"
        rows={4}
        className="w-full px-4 py-3 rounded-xl border border-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-gray-900 resize-none"
      ></textarea>
    </div>

    {/* Submit Button */}
    <div className="col-span-1 md:col-span-2">
      <button
        type="submit"
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-xl transition-colors duration-300 shadow-md"
      >
        Send Message
      </button>
    </div>
  </form>
</div>


    </div>
  </div>
</section>

<Footer />
      {/* Google Map Section */}
     
      {/* Professional Footer */}

    </div>
  );
}
