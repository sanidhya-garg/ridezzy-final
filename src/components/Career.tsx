import React from "react";

const CareerSection = () => {
  return (
    <section className="px-6 py-16 bg-gray-50" id="careers">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">
          <span className="text-yellow-500">Careers</span> at Ridezzy
        </h2>
        <p className="text-gray-700 text-lg max-w-3xl mx-auto mb-10">
          Join us in revolutionizing urban mobility. At Ridezzy, we’re building a future of cleaner, smarter, and more efficient transportation. Be part of a passionate team driving impactful change.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Frontend Developer",
              desc: "Build stunning, responsive UIs with React and Tailwind to power our digital experiences.",
              location: "Remote / Delhi NCR",
            },
            {
              title: "Backend Engineer",
              desc: "Develop scalable systems and APIs that fuel our electric mobility ecosystem.",
              location: "Remote / On-site",
            },
            {
              title: "Operations Associate",
              desc: "Coordinate logistics, fleet management, and battery swapping infrastructure.",
              location: "Delhi NCR Only",
            },
          ].map((job, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg p-6 border hover:border-yellow-500 transition-all"
            >
              <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
              <p className="text-gray-600 mb-4">{job.desc}</p>
              <p className="text-sm text-gray-500">📍 {job.location}</p>
              <button className="mt-4 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerSection;
