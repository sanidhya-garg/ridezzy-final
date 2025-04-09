import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "./assets/logo.jpeg"; // Make sure to update this path

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ["About","Bana", "Contact"];

  return (
    <header className="bg-white bg-opacity-95 backdrop-blur-md text-black px-6 py-4 fixed top-0 left-0 w-full flex justify-between items-center shadow-md z-50 border-b border-gray-200">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img
          src={logo}
          alt="Ridezzy Logo"
          className="w-32 h-auto object-contain"
        />
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex space-x-8 text-lg font-medium">
        {navItems.map((item, index) => (
          <li key={index} className="list-none relative group">
            <NavLink
              to={`/${item.toLowerCase()}`}
              className="text-gray-700 hover:text-yellow-500 transition-all duration-300 ease-in-out"
            >
              {item}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          </li>
        ))}
      </nav>

      {/* Hamburger for Mobile */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg px-6 py-4 flex flex-col space-y-4 md:hidden z-40">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={`/${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="text-gray-800 hover:text-yellow-500 font-medium transition-all duration-300"
            >
              {item}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
