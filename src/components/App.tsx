import { useState } from "react";
import {
  UserCheck,
  FileText,
  BatteryCharging,
  LayoutDashboard,
  Headset,
} from "lucide-react";

import apps1 from "../assets/apps1.png";
import apps2 from "../assets/apps2.png";
import apps3 from "../assets/apps3.jpg";
import deliveryImage from "../assets/delivery.jpeg";

const steps = [
  {
    title: "Sign Up & Get Verified",
    description: "Download the Ridezzy app and complete your KYC",
    icon: <UserCheck size={20} />,
    image: apps1,
  },
  {
    title: "Choose Your Scooter Plan",
    description: "Pick an electric scooter plan that fits your needs",
    icon: <FileText size={20} />,
    image: apps2,
  },
  {
    title: "Swap Batteries on the Go",
    description: "Access our battery swapping network anytime",
    icon: <BatteryCharging size={20} />,
    image: apps3,
  },
  {
    title: "Track Your Vehicle Health",
    description: "Stay in control with your vehicle dashboard",
    icon: <LayoutDashboard size={20} />,
    image: null,
  },
  {
    title: "On-Demand Support",
    description: "Get instant help through the app",
    icon: <Headset size={20} />,
    image: null,
  },
];

const HowToRide = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <section className="bg-[#f9fafb] py-16 px-6 md:px-20 font-inter">
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Left: App Preview */}
        <div className="flex-1 flex justify-center">
          {steps[currentStep].image ? (
            <img
              src={steps[currentStep].image}
              alt="App screen"
              className="w-[280px] md:w-[320px] rounded-2xl shadow-lg border border-yellow-400"
            />
          ) : (
            <div className="w-[280px] md:w-[320px] h-[200px] rounded-2xl border border-dashed border-yellow-400 flex items-center justify-center text-gray-400 text-sm">
              No Preview Available
            </div>
          )}
        </div>

        {/* Center: Steps */}
        <div className="flex-1 w-full space-y-6">
          <h2 className="text-4xl font-bold mb-2">
            <span className="text-yellow-400">How to </span>
            <span className="text-black">Ridezzy</span>
          </h2>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`cursor-pointer flex items-start space-x-4 p-4 rounded-xl transition border ${
                  currentStep === index
                    ? "bg-yellow-100 border-yellow-500"
                    : "hover:bg-yellow-50 border-gray-300"
                }`}
              >
                <div className="text-yellow-600 mt-1">{step.icon}</div>
                <div>
                  <h4 className="font-semibold text-lg text-black">{step.title}</h4>
                  <p className="text-sm text-gray-700">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Rider Image */}
        <div className="hidden md:flex flex-1 justify-end">
          <img
            src={deliveryImage}
            alt="Rider"
            className="w-full max-w-sm object-cover rounded-2xl shadow-lg border border-yellow-300"
          />
        </div>
      </div>
    </section>
  );
};

export default HowToRide;
