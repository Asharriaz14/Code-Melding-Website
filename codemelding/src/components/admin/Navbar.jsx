import { useState } from 'react';
import { FaBars } from 'react-icons/fa';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-lg font-bold">
          <a href="/">Logo</a>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-6">
          <a href="#home" className="text-white hover:text-gray-400">Home</a>
          <a href="#about" className="text-white hover:text-gray-400">About</a>

          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-white hover:text-gray-400 focus:outline-none"
            >
              Services
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
                <a href="#web-design" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                  Web Design
                </a>
                <a href="#seo" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                  SEO
                </a>
                <a href="#marketing" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                  Marketing
                </a>
              </div>
            )}
          </div>

          <a href="#contact" className="text-white hover:text-gray-400">Contact</a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button className="text-white focus:outline-none" onClick={toggleNavbar}>
            <FaBars className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {navbarOpen && (
        <div className="md:hidden mt-4">
          <a href="#home" className="block text-white py-2 hover:text-gray-400">Home</a>
          <a href="#about" className="block text-white py-2 hover:text-gray-400">About</a>

          {/* Dropdown in Mobile */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="block w-full text-left text-white py-2 hover:text-gray-400 focus:outline-none"
            >
              Services
            </button>
            {dropdownOpen && (
              <div className="mt-2 py-2 w-full bg-white rounded-lg shadow-xl">
                <a href="#web-design" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                  Web Design
                </a>
                <a href="#seo" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                  SEO
                </a>
                <a href="#marketing" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                  Marketing
                </a>
              </div>
            )}
          </div>

          <a href="#contact" className="block text-white py-2 hover:text-gray-400">Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
