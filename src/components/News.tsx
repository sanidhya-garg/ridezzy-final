import React, { useRef } from "react";

const newsData = [
  {
    image: "https://via.placeholder.com/300",
    title: "Ridezzy Implements WhatsApp-based Road Safety Initiative for Delivery Riders",
    source: "Autocar Professional",
    date: "February 27, 2025",
  },
  {
    image: "https://via.placeholder.com/300",
    title: "ET Now On The Go | Riding The Last-Mile Connectivity With Ridezzy",
    source: "ET Now",
    date: "December 26, 2024",
  },
  {
    image: "https://via.placeholder.com/300",
    title: "Quick commerce, e-commerce has fueled Ridezzy's growth - Naveen Dachuri",
    source: "Autocar Professional",
    date: "December 20, 2024",
  },
  {
    image: "https://via.placeholder.com/300",
    title: "Ridezzy Partners with Major E-commerce Platforms for Last-Mile Delivery",
    source: "Business Today",
    date: "November 15, 2024",
  },
  {
    image: "https://via.placeholder.com/300",
    title: "How Ridezzy is Revolutionizing Urban Logistics",
    source: "Forbes India",
    date: "October 30, 2024",
  },
  {
    image: "https://via.placeholder.com/300",
    title: "Ridezzy Expands Operations to 10 New Cities",
    source: "The Economic Times",
    date: "September 5, 2024",
  },
];

const NewsSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-12 bg-white text-gray-800 relative">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl font-bold text-center mb-8 relative">
          Ridezzy in News
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-yellow-400 rounded-full"></span>
        </h2>
        
        <div className="relative group">
          {/* Left scroll button */}
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-yellow-50 transition border border-yellow-100 group-hover:opacity-100 opacity-0 md:opacity-100"
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Scrollable container */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide space-x-6 py-4 px-2"
          >
            {newsData.map((news, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-80 shadow-md rounded-lg overflow-hidden border border-yellow-50 hover:border-yellow-200 transition-all duration-300 bg-white hover:shadow-lg"
              >
                <div className="relative">
                  <img src={news.image} alt={news.title} className="w-full h-48 object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{news.title}</h3>
                  <p className="text-sm text-gray-600">{news.source}</p>
                  <p className="text-xs text-yellow-600 font-medium">{news.date}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Right scroll button */}
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-yellow-50 transition border border-yellow-100 group-hover:opacity-100 opacity-0 md:opacity-100"
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots indicator (optional) */}
        <div className="flex justify-center mt-6 space-x-2">
          {newsData.map((_, index) => (
            <button 
              key={index}
              className="w-2 h-2 rounded-full bg-gray-300 hover:bg-yellow-400 transition"
              aria-label={`Go to news item ${index + 1}`}
              onClick={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollTo({
                    left: index * 320, // Adjust based on your card width + gap
                    behavior: 'smooth'
                  });
                }
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default NewsSection;