import React from "react";
import logo from "../assets/logo.jpeg"; // Replace with your actual logo path

export default function Footer() {
  return (
    <footer className="bg-[#f9fafb] text-black px-6 md:px-20 py-16 font-inter">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Logo + Description */}
        <div className="col-span-1">
          <img src={logo} alt="Ridezzy Logo" className="h-10 mb-4" />
          <p className="text-sm text-gray-600">
            EV Fleet for Quick Commerce
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="font-semibold text-yellow-500 text-sm mb-4 uppercase tracking-wider">
            Company
          </h4>
          <ul className="space-y-2 text-sm text-gray-600">
            {["About", "Bana", "Careers", "Blogs", "Contact Us"].map((item, idx) => (
              <li key={idx} className="hover:text-yellow-500 transition cursor-pointer">{item}</li>
            ))}
          </ul>
        </div>

        {/* Product Links
        <div>
          <h4 className="font-semibold text-yellow-500 text-sm mb-4 uppercase tracking-wider">
            Products
          </h4>
          <ul className="space-y-2 text-sm text-gray-600">
            {["Wynn XP", "Miracle NV", "DeX NV", "Miracle GR", "DeX GR"].map((item, idx) => (
              <li key={idx} className="hover:text-yellow-500 transition cursor-pointer">{item}</li>
            ))}
          </ul>
        </div> */}

        {/* Address */}
        <div>
          <h4 className="font-semibold text-yellow-500 text-sm mb-4 uppercase tracking-wider">
            Address
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            Plot no 7, B2 block,  Sewak park,<br />
            Uttam Nagar, Delhi 110059, India
          </p>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="font-semibold text-yellow-500 text-sm mb-4 uppercase tracking-wider">
            Follow Us
          </h4>
          <div className="flex gap-4 text-gray-600 text-xl">
            <i className="fab fa-facebook-f hover:text-yellow-500 transition cursor-pointer"></i>
            <i className="fab fa-instagram hover:text-yellow-500 transition cursor-pointer"></i>
            <i className="fab fa-linkedin-in hover:text-yellow-500 transition cursor-pointer"></i>
            <i className="fab fa-twitter hover:text-yellow-500 transition cursor-pointer"></i>
            <i className="fab fa-youtube hover:text-yellow-500 transition cursor-pointer"></i>
          </div>
        </div>
      </div>

      <hr className="border-t border-gray-300 my-10" />

      <p className="text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Ridezzy Logistics Pvt Ltd. All rights reserved.
      </p>
    </footer>
  );
}
