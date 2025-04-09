import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Hamburger and close icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo in center for mobile, left for desktop */}
        <div className="flex-1 flex justify-center md:justify-start">
          <h1 className="text-xl font-bold">Ridezzy</h1>
        </div>

        {/* Hamburger - shown only on mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          {["Home", "About", "Contact"].map((page) => (
            <NavLink
              key={page}
              to={`/${page === "Home" ? "" : page.toLowerCase()}`}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-white hover:text-blue-400"
              }
            >
              {page}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col items-center space-y-4">
          {["Home", "About", "Contact"].map((page) => (
            <NavLink
              key={page}
              to={`/${page === "Home" ? "" : page.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-white hover:text-blue-400"
              }
            >
              {page}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
