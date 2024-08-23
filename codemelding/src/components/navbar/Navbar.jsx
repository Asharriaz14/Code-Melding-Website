import { useState } from 'react';
import { FaAngleDown, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { navbarLinks } from './NavLinks';
import CompanyLogo from "../../assets/Logo.png";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleDropdownToggle = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setDropdownOpen(null); 
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white p-4 lg:py-5 lg:px-16 flex items-center justify-between  z-50">
      {/* Left Side: Logo */}
      <div className="flex items-center">
        <img src={CompanyLogo} alt="Logo" className="h-10" />
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button onClick={handleMobileMenuToggle} className="text-gray-800">
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-4">
        {navbarLinks.map((link, index) => (
          <div key={index} className="relative group">
            <Link
              to={link.to}
              className={`flex items-center px-6 text-sm font-semibold uppercase transition-colors ${
                location.pathname === link.to ? 'text-orange-500' : 'text-gray-800 hover:text-orange-500'
              }`}
              onClick={link.dropdown ? (e) => { e.preventDefault(); handleDropdownToggle(index); } : undefined}
            >
              {link.name}
              {link.dropdown && (
                <FaAngleDown className={`ml-1 transition-transform ${dropdownOpen === index ? 'rotate-180' : ''}`} />
              )}
            </Link>
            {link.dropdown && (
              <div
                className={`absolute left-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-md transition-opacity ${
                  link.name === 'Services' ? 'hidden group-hover:block' : dropdownOpen === index ? 'block' : 'hidden'
                }`}
              >
                {link.dropdown.map((item, i) => (
                  <Link key={i} to={item.to} className="block px-4 py-2 hover:bg-gray-200">
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right Side: Contact Button */}
      <div className="hidden md:flex">
        <button className="relative h-[40px] w-32 flex items-center justify-center bg-orange-500 text-white rounded-xl shadow-2xl transition-all hover:shadow-orange-400 font-semibold overflow-hidden">
          <span className="relative z-10">Let’s Start</span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-16 left-0 w-full bg-gray-800 transition-transform ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        {navbarLinks.map((link, index) => (
          <div key={index} className="relative">
            <Link
              to={link.to}
              className="text-white px-4 py-2 hover:bg-gray-700 flex items-center"
              onClick={link.dropdown ? (e) => { e.preventDefault(); handleDropdownToggle(index); } : undefined}
            >
              {link.name}
              {link.dropdown && dropdownOpen === index && (
                <FaAngleDown className="ml-1" />
              )}
            </Link>
            {link.dropdown && dropdownOpen === index && (
              <div className="bg-white text-gray-800 shadow-lg rounded-md w-full">
                {link.dropdown.map((item, i) => (
                  <Link key={i} to={item.to} className="block px-4 py-2 hover:bg-gray-200">
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <button className="w-full px-4 py-2 my-3 bg-orange-500 text-white rounded-xl shadow-2xl font-semibold hover:shadow-orange-600">Let’s Start</button>
      </div>
    </nav>
  );
};

export default Navbar;
