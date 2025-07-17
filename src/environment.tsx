import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function EnvironmentPage() {
  // Animated Counters
  const [co2Saved, setCo2Saved] = useState(0);
  const [fuelSaved, setFuelSaved] = useState(0);
  const [greenKm, setGreenKm] = useState(0);

  useEffect(() => {
    const targetCo2 = 1200; // tons of CO2 saved (example)
    const targetFuel = 50000; // liters saved
    const targetKm = 250000; // green km driven

    const interval = setInterval(() => {
      setCo2Saved((prev) => (prev < targetCo2 ? prev + 5 : targetCo2));
      setFuelSaved((prev) => (prev < targetFuel ? prev + 200 : targetFuel));
      setGreenKm((prev) => (prev < targetKm ? prev + 1000 : targetKm));
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white text-gray-800">
      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 px-6 bg-gradient-to-b from-green-50 to-white">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold text-green-700"
        >
          Driving a Cleaner, Greener Future
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-lg md:text-xl max-w-2xl"
        >
          Every Ridezzy scooter on the road replaces a fuel-powered vehicle, reducing carbon emissions and making our cities healthier.
        </motion.p>
      </section>

      {/* UN SDG SECTION */}
      <section className="py-20 px-6 bg-yellow-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-6">
            Our Commitment to UN Sustainable Development Goals
          </h2>
          <p className="text-lg mb-12">
            Ridezzy supports key SDGs to build sustainable, livable cities.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: "🌞",
                title: "SDG 7",
                text: "Affordable & Clean Energy through green battery swaps",
              },
              {
                icon: "🏙️",
                title: "SDG 11",
                text: "Sustainable Cities & Communities with zero-emission rides",
              },
              {
                icon: "♻️",
                title: "SDG 12",
                text: "Responsible Consumption & Production with circular batteries",
              },
              {
                icon: "🌍",
                title: "SDG 13",
                text: "Climate Action by reducing urban pollution",
              },
            ].map((goal, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-white shadow-lg rounded-2xl p-6"
              >
                <div className="text-4xl mb-4">{goal.icon}</div>
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  {goal.title}
                </h3>
                <p className="text-gray-700">{goal.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT COUNTERS */}
      <section className="py-20 px-6 bg-gradient-to-b from-green-100 to-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-10">
          Our Green Impact So Far
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <h3 className="text-5xl font-bold text-yellow-500">{co2Saved}+</h3>
            <p className="mt-2 text-lg">Tons of CO₂ emissions avoided</p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <h3 className="text-5xl font-bold text-yellow-500">{fuelSaved}+</h3>
            <p className="mt-2 text-lg">Liters of fuel saved</p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <h3 className="text-5xl font-bold text-yellow-500">{greenKm}+</h3>
            <p className="mt-2 text-lg">Kilometers driven emission-free</p>
          </motion.div>
        </div>
      </section>

      {/* STORYTELLING SECTION */}
      <section className="py-20 px-6 bg-white max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-12"
        >
          From Pollution to Solution
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <Image
              src="/eco-city-before-after.png"
              alt="Clean city animation"
              width={500}
              height={300}
              className="rounded-xl shadow-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <p className="text-lg mb-4">
              Imagine a city filled with smoke and noise from endless fuel-powered vehicles. Now imagine the same streets quiet, clean, and powered by electric rides.
            </p>
            <p className="text-lg font-semibold">
              That’s the transformation Ridezzy brings, one scooter at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FUTURE VISION */}
      <section className="py-20 px-6 bg-green-50 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-green-700 mb-6"
        >
          Our 2030 Vision
        </motion.h2>
        <p className="max-w-2xl mx-auto text-lg mb-8">
          By 2030, we aim to power our entire fleet with 100% renewable energy, expand sustainable delivery networks across India, and create a circular battery recycling program with zero landfill waste.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold shadow-lg"
        >
          Join the Green Revolution
        </motion.button>
      </section>
    </div>
  );
}