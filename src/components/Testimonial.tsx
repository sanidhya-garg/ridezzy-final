import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";

const testimonials = [
  {
    name: "Vivek Satpute",
    text: "I use it for daily commute to the office, have taken more than 550 rides by now. With the saver packs, the commute becomes pretty affordable. Great for fun activities too. Most bikes are well maintained.",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "R Shyam Sharma",
    text: "Within a short time of association with Yulu, we have achieved significant milestones. This has only been possible due to the trust showered on us by users.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Anjali Gupta",
    text: "Yulu has completely changed my daily commute. The bikes are easy to access and super affordable! Highly recommend it to everyone.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  }
];

export default function TestimonialSection() {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="bg-yellow-400 py-16 px-6 flex flex-col md:flex-row items-center text-left relative">
      {/* Left Section */}
      <div className="w-full md:w-1/3 flex flex-col items-start space-y-4">
        <h2 className="text-4xl font-extrabold text-black">Hear what our customers are saying</h2>
        <div className="flex space-x-3 text-black text-xl">
          <FaFacebookF />
          <FaInstagram />
          <FaLinkedinIn />
          <FaTwitter />
          <FaYoutube />
        </div>
        <p className="text-lg font-bold">{`${index + 1} / ${testimonials.length}`}</p>
      </div>
      
      {/* Testimonial Section */}
      <div className="relative w-full md:w-2/3 max-w-4xl overflow-hidden flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-2xl mx-auto relative"
          >
            <img
              src={testimonials[index].image}
              alt={testimonials[index].name}
              className="w-20 h-20 rounded-full mb-4 border-4 border-yellow-500 shadow-lg"
            />
            <p className="text-base text-gray-700 italic leading-relaxed text-center">"{testimonials[index].text}"</p>
            <h3 className="text-xl font-bold text-black mt-4">{testimonials[index].name}</h3>
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation Buttons */}
        <div className="mt-5 flex space-x-3">
          <button
            onClick={handlePrev}
            className="p-3 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition"
          >
            <FaChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="p-3 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition"
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
