import logo from "../assets/logo.jpeg"; // Replace with your actual logo path
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#f9fafb] text-black px-6 md:px-20 py-16 font-inter">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Logo + Description */}
        <div className="col-span-1">
          <img src={logo} alt="Ridezzy Logo" className="h-10 mb-4" />
          <p className="text-sm text-gray-600">EV Fleet for Quick Commerce</p>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="font-semibold text-yellow-500 text-sm mb-4 uppercase tracking-wider">
            Company
          </h4>
          <ul className="space-y-1 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-yellow-500 transition cursor-pointer">Home</Link></li>
            <li><Link to="/about" className="hover:text-yellow-500 transition cursor-pointer">About</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-500 transition cursor-pointer">Contact Us</Link></li>
            <li><Link to="/bana" className="hover:text-yellow-500 transition cursor-pointer">Bana</Link></li>
            <li><Link to="/blog" className="hover:text-yellow-500 transition cursor-pointer">Blogs</Link></li>
          </ul>
        </div>

        {/* Address */}
        <div>
          <h4 className="font-semibold text-yellow-500 text-sm mb-4 uppercase tracking-wider">
            Address
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            Plot no 7, B2 block, Sewak park,<br />
            Uttam Nagar, Delhi 110059, India
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-yellow-500 text-sm mb-4 uppercase tracking-wider">
            Get in Touch
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            support.cell@ridezzy.com<br />
            +91 9220424574
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

      <div className="flex flex-col md:flex-row items-center justify-center text-xs text-gray-500 space-y-2 md:space-y-0 md:space-x-6 text-center">
        <span>© {new Date().getFullYear()} Ridezzy Logistics Pvt Ltd. All rights reserved.</span>
        <Link to="/refund-policy" className="hover:text-yellow-600 transition">Refund Policy</Link>
        <Link to="/terms-of-service" className="hover:text-yellow-600 transition">Terms of Service</Link>
        <Link to="/privacy-policy" className="hover:text-yellow-600 transition">Privacy Policy</Link>
      </div>
    </footer>
  );
}
