import React, { useState } from "react";
import {
  UserCheck,
  FileText,
  BatteryCharging,
  LayoutDashboard,
  Headset,
} from "lucide-react";

const steps = [
  {
    title: "Sign Up & Get Verified",
    description: "Download the Ridezzy app and complete your KYC",
    icon: <UserCheck size={20} />,
    image: "../assets/apps1.png",
  },
  {
    title: "Choose Your Scooter Plan",
    description: "Pick an electric scooter plan that fits your needs",
    icon: <FileText size={20} />,
    image: "/screens/plan.png",
  },
  {
    title: "Swap Batteries on the Go",
    description: "Access our battery swapping network anytime",
    icon: <BatteryCharging size={20} />,
    image: "/screens/battery-map.png",
  },
  {
    title: "Track Your Vehicle Health",
    description: "Stay in control with your vehicle dashboard",
    icon: <LayoutDashboard size={20} />,
    image: "/screens/dashboard.png",
  },
  {
    title: "On-Demand Support",
    description: "Get instant help through the app",
    icon: <Headset size={20} />,
    image: "/screens/support.png",
  },
];

const HowToRide = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <section className="bg-[f9fafb] py-12 px-6 md:px-20">
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Left: App mockup */}
        <div className="flex-1 flex justify-center">
          <img
            src={steps[currentStep].image}
            alt="App screen"
            className="w-[280px] md:w-[320px] rounded-xl shadow-lg border border-yellow-300"
          />
        </div>

        {/* Center: Steps */}
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl font-bold text-black mb-4">How to Ridezzy</h2>
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
            src="/mnt/data/image.png"
            alt="Rider"
            className="w-full max-w-sm object-cover rounded-xl shadow-lg border border-yellow-300"
          />
        </div>
      </div>
    </section>
  );
};

export default HowToRide;
