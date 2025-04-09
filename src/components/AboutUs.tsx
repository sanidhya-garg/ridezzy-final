import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../Navbar";
import Footer from "./Footer";
import amarImage from "../assets/amar.jpeg";
import sanidhyaImage from "../assets/sanidhya.jpeg";
import amitImage from "../assets/amit.jpeg";
import satyaImage from "../assets/satya.jpeg";
import scooterImage from "../assets/about-scooter.png";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const teamRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );

    gsap.fromTo(
      teamRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: teamRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <>
      <Navbar />
      <section className="pt-28 pb-20 bg-white" ref={sectionRef}>
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div>
            <h1 ref={titleRef} className="text-5xl font-bold text-black mb-6">
              About Ridezzy
            </h1>
            <p ref={textRef} className="text-gray-700 text-lg leading-7">
              Ridezzy is reshaping the last-mile delivery space in India through EV rentals that are accessible, affordable, and eco-friendly. Our mission is to empower delivery partners with cost-effective electric vehicles and build infrastructure that scales sustainably across cities.
              <br /><br />
              We're not just building a fleet—we're building a movement. A movement to cut carbon, increase gig worker earnings, and improve operational efficiency for brands in the quick commerce revolution.
              <br /><br />
              We're led by a passionate team that believes in solving real problems for real people. If you're excited about transforming urban mobility and making cities cleaner, smarter, and more efficient—join us.
            </p>
            <p className="mt-4 font-semibold text-yellow-500 text-lg">Be Electric. Be Limitless.</p>
          </div>

          {/* Right: Illustration */}
          <div className="flex justify-center">
            <img
              src={scooterImage}
              alt="Ridezzy Scooter"
              className="w-full max-w-md"
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-20 px-6" ref={teamRef}>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-black mb-6">Co-Founding Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Ridezzy is led by driven entrepreneurs and advisors with deep industry experience and a passion for urban transformation.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-center">
            {[
              {
                name: "Amar Kumar",
                role: "Founder & CEO",
                image: amarImage,
                linkedin: "https://www.linkedin.com/in/amarkumar100/",
              },
              {
                name: "Sanidhya Garg",
                role: "Co-Founder & COO",
                image: sanidhyaImage,
                linkedin: "https://www.linkedin.com/in/sanidhyagarg/",
              },
              {
                name: "Amit",
                role: "Growth Advisor",
                image: amitImage,
                linkedin: "#", // Replace with real link
              },
              {
                name: "Satya",
                role: "Growth Advisor",
                image: satyaImage,
                linkedin: "#", // Replace with real link
              },
            ].map((member, idx) => (
              <a
                key={idx}
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="transition duration-300 ease-in-out transform hover:scale-105 group"
              >
                <div className="rounded-xl overflow-hidden text-center bg-white hover:bg-yellow-50 transition-colors duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-72 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-yellow-500 transition">
                      {member.name}
                    </h4>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
