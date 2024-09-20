import { useState } from "react";
import { FaBars, FaSearch } from "react-icons/fa"; // Importing FaSearch for the search icon

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <nav className="flex p-2 justify-between items-center border-b border-gray-300 flex-wrap">
      {/* Logo Section */}
      <div className="flex items-center">
        <img
          src="https://tailwindflex.com/public/images/logo.svg"
          className="w-10 h-10"
          alt="TailwildFlex logo"
        />
        <h2 className="font-bold text-2xl text-purple-600 ml-2">
          TailwildFlex
        </h2>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden">
        <button onClick={toggleNavbar}>
          <FaBars className="text-2xl text-gray-600" />
        </button>
      </div>

      {/* Search bar and Buttons (hidden on mobile) */}
      <div className="hidden md:flex items-center gap-4">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-200 rounded-md py-1 px-2"
          />
          <FaSearch className="absolute right-2 h-6 w-6 text-gray-400 hover:text-gray-500" />
        </div>

        <button className="border px-2 py-1 rounded-md">Center</button>

        <button className="border px-2 py-1 rounded-md bg-purple-600 text-white hover:bg-purple-700">
          Save
        </button>
      </div>

      {/* Mobile Menu (toggles with FaBars) */}
      {navbarOpen && (
        <div className="w-full mt-4 flex flex-col items-center gap-2 md:hidden">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-200 rounded-md py-1 px-2 w-full"
            />
            <FaSearch className="absolute right-2 h-6 w-6 text-gray-400 hover:text-gray-500" />
          </div>

          <button className="border px-2 py-1 rounded-md w-full">Center</button>

          <button className="border px-2 py-1 rounded-md bg-purple-600 text-white hover:bg-purple-700 w-full">
            Save
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
