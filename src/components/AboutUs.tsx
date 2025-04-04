import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const text = textRef.current;

    gsap.fromTo(
      title,
      { opacity: 0, y: 50, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      text,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.3,
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 px-10 max-w-5xl mx-auto text-center"
    >
      <h2 ref={titleRef} className="text-5xl font-bold text-gray-900">
        About Us
      </h2>
      <p ref={textRef} className="text-xl mt-6 text-gray-700">
        At Ridezzy, we’re revolutionizing last-mile deliveries with scalable,
        eco-friendly EV rental solutions. Our mission is to empower delivery
        partners with affordable and reliable electric vehicles.
      </p>
    </section>
  );
}
