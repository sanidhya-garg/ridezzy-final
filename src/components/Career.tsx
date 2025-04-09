import { useEffect, useState } from "react";

const roles = [
  {
    title: "Founder’s Office Intern",
    desc: "Work directly with the founders on strategy, growth, and special projects that shape Ridezzy’s future.",
    location: "Remote / Delhi NCR",
    applyLink: "https://www.linkedin.com/jobs/view/4179017579/", // Replace with real link
  },
];

const CareerSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = roles[index];

  return (
    <section className="px-6 py-20 bg-gray-50" id="careers">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Title and Description */}
        <div className="text-left">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-yellow-500">Careers</span> at Ridezzy
          </h2>
          <p className="text-gray-700 text-lg max-w-xl">
            Join us in revolutionizing urban mobility. At Ridezzy, we’re building a future of cleaner, smarter, and more efficient transportation. Be part of a passionate team driving impactful change.
          </p>
        </div>

        {/* Right: Rotating Card with Dots */}
        <div className="relative h-full">
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:border-yellow-500 transition-all duration-500 ease-in-out"
          >
            <h3 className="text-xl font-semibold mb-2">{current.title}</h3>
            <p className="text-gray-600 mb-4">{current.desc}</p>
            <p className="text-sm text-gray-500 mb-4">📍 {current.location}</p>
            <a
              href={current.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition"
            >
              Apply Now
            </a>

            {/* Dots */}
            <div className="mt-6 flex justify-center gap-2">
              {roles.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-3 h-3 rounded-full ${
                    index === i
                      ? "bg-yellow-500"
                      : "bg-gray-300 hover:bg-yellow-300"
                  } transition`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerSection;
