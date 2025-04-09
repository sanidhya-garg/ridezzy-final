import {
    CheckCircle,
    Rocket,
    MapPin,
    TrendingUp,
    BarChart3,
    Zap,
  } from "lucide-react";
  import { JSX } from "react/jsx-runtime";
  
  const benefits = [
    {
      icon: <MapPin className="text-yellow-500 w-6 h-6" />,
      title: "Hyperlocal Reach",
      desc: "Target your audience down to a pin code with Ridezzy’s fleet coverage across key urban centers.",
    },
    {
      icon: <TrendingUp className="text-yellow-500 w-6 h-6" />,
      title: "Elevated Brand Visibility",
      desc: "Place your brand on highly visible EVs traveling thousands of kilometers monthly.",
    },
    {
      icon: <BarChart3 className="text-yellow-500 w-6 h-6" />,
      title: "Data-Driven Insights",
      desc: "Get real-time reporting on impressions, routes, and active campaign zones through IoT integration.",
    },
    {
      icon: <Rocket className="text-yellow-500 w-6 h-6" />,
      title: "Quick Turnaround",
      desc: "Deploy your campaign in days, not weeks, with our in-house printing and application process.",
    },
    {
      icon: <Zap className="text-yellow-500 w-6 h-6" />,
      title: "Sustainable Branding",
      desc: "Ride the EV wave while aligning your brand with sustainability and green logistics.",
    },
    {
      icon: <CheckCircle className="text-yellow-500 w-6 h-6" />,
      title: "Affordably Scalable",
      desc: "From 10 to 1,000 bikes — scale your campaign as you grow, with flexible monthly plans.",
    },
  ];
  
  const AdvertisementPage = (): JSX.Element => {
    return (
      <div className="bg-white text-black">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-yellow-50 to-white pt-24 pb-20 px-4 md:px-20">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Advertise with <span className="text-yellow-500">Ridezzy</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
              Unlock hyperlocal visibility by branding electric scooters zipping
              through the busiest streets of your city.
            </p>
            <img
              src="/illustrations/branding-banner.svg"
              alt="Branding illustration"
              className="mx-auto max-w-xl"
            />
          </div>
        </section>
  
        {/* Benefits Section */}
        <section className="py-20 bg-white px-4 md:px-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold text-center mb-12 text-gray-900">
              Why Brands Choose Ridezzy
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-3xl p-6 shadow-md hover:shadow-xl transition"
                >
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* CTA Section */}
        <section className="bg-yellow-50 py-20 px-4 md:px-20 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to get your brand moving?
            </h2>
            <p className="text-gray-700 mb-8">
              Book your advertisement slot today and get real-time IoT campaign
              reporting, unmatched visibility, and access to the fastest-growing EV
              delivery fleet.
            </p>
            <a
              href="/contact"
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-full shadow-md transition"
            >
              Get Started
            </a>
          </div>
        </section>
      </div>
    );
  };
  
  export default AdvertisementPage;
  