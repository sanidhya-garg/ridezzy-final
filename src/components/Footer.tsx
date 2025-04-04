import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A192F] text-white py-10">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Logo Section */}
        <div>
          <h2 className="text-2xl font-bold">Ridezzy</h2>
        </div>

        {/* Links Section */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>About</li>
            <li>Careers</li>
            <li>Partner</li>
            <li>FAQs</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Products Section */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Products</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Wynn XP</li>
            <li>Miracle NV</li>
            <li>DeX NV</li>
            <li>Miracle GR</li>
            <li>DeX GR</li>
          </ul>
        </div>

        {/* Address and Socials */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Address</h3>
          <p className="text-sm text-gray-300">
            Ridezzy, 2nd Floor, Etamin Block (Wing A), Prestige Tech Park,
            Kadubeesanahalli, Bengaluru, Karnataka 560103 India
          </p>
          <div className="flex mt-4 space-x-4">
            <FaFacebook className="text-xl" />
            <FaInstagram className="text-xl" />
            <FaLinkedin className="text-xl" />
            <FaTwitter className="text-xl" />
            <FaYoutube className="text-xl" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
