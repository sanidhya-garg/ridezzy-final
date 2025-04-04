import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between">
        <h1 className="text-xl font-bold">Ridezzy</h1>
        <div className="space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-white hover:text-blue-400"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-white hover:text-blue-400"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-white hover:text-blue-400"
            }
          >
            Contact
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
