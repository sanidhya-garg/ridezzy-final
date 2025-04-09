import { motion } from "framer-motion";
import { CheckCircle, Zap, BatteryCharging, Wrench } from "lucide-react";

const BanaProductPage = () => {
  return (
    <motion.div
      className="p-6 md:p-12 max-w-6xl mx-auto text-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-4 leading-tight">BANA™ eV8</h1>
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Desh Ka Vaahan</h2>
          <p className="mb-6 text-lg text-gray-700">
            At IntuitEV, we are revolutionizing the way you move by reimagining and redesigning
            Bana eV8 to fit the dynamic needs of the modern world. If you're seeking a versatile,
            low-maintenance electric ride, Bana is the ideal Vahaan for you.
          </p>
          <p className="text-md font-medium text-gray-600">
            Join the electric revolution today with Bana—Desh ka Vahaan.
          </p>
        </motion.div>

        <motion.img
          src="/bana-bike.png"
          alt="BANA eV8"
          className="rounded-2xl shadow-xl"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
      </section>

      {/* Features */}
      <section className="mt-16">
        <motion.h3
          className="text-3xl font-semibold mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Features
        </motion.h3>
        <div className="grid md:grid-cols-2 gap-6">
          {[ 
            { icon: <Zap className="text-yellow-500 w-6 h-6" />, text: "Smart dockless electric vehicle with swappable lithium battery (via BAAS partner)" },
            { icon: <BatteryCharging className="text-yellow-500 w-6 h-6" />, text: "Eco-friendly and perfect for last-mile delivery, with a top speed of 45 kmph" },
            { icon: <CheckCircle className="text-yellow-500 w-6 h-6" />, text: "No registration required (NMT category, < 25 kmph)" },
            { icon: <Wrench className="text-yellow-500 w-6 h-6" />, text: "Low maintenance and extremely affordable to run" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex gap-4 items-start bg-gray-50 p-4 rounded-xl shadow-sm"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              {item.icon}
              <span className="text-gray-700 font-medium">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Specifications */}
      <section className="mt-20">
        <motion.h3
          className="text-3xl font-semibold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Technical Specifications
        </motion.h3>
        <div className="overflow-x-auto">
          <motion.table
            className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm md:text-base"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <tbody>
              {[
                ["Vehicle Type", "Commercial Delivery 2-Wheeler"],
                ["Motor", "Rear Wheel Hub Motor"],
                ["Brakes", "Drum (Front & Rear)"],
                ["Wheel Size", "10-inch (Front & Rear)"],
                ["Payload Capacity", "Up to 150 kg"],
                ["Battery", "Lithium (Removable / Swappable)"]
              ].map(([label, value], idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-4 font-semibold bg-gray-50 w-1/2">{label}</td>
                  <td className="p-4">{value}</td>
                </tr>
              ))}
            </tbody>
          </motion.table>
        </div>
      </section>

    </motion.div>
  );
};

export default BanaProductPage;
