import { useState, useCallback } from "react";
import { FaAngleDown, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navbarLinks } from "./NavLinks";
import Button from "../buttons/Button";
import CompanyLogo from "../../assets/Logo.png";
import { useSelector, useDispatch } from "react-redux";
import { singoutSuccess } from "../../redux/user/userSlice";

// Helper Function to fetch user signout
const signOutUser = async () => {
  try {
    const response = await fetch("/api/user/signout", { method: "POST" });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.error("Signout error:", error);
    throw error;
  }
};

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDropdownToggle = useCallback((index) => {
    setDropdownOpen((prevIndex) => (prevIndex === index ? null : index));
  }, []);

  const handleMobileMenuToggle = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
    setDropdownOpen(null);
  }, []);

  const handleSignout = useCallback(async () => {
    try {
      const data = await signOutUser();
      dispatch(singoutSuccess(data));
      navigate("/login");
    } catch (error) {
      // console.log(error);
    }
  }, [dispatch, navigate]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white p-4 lg:py-5 lg:px-16 flex items-center justify-between z-50">
      {/* Left Side: Logo */}
      <div className="flex items-center">
        <Link to="/">
          <img src={CompanyLogo} alt="Logo" className="h-10" />
        </Link>
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
                location.pathname === link.to
                  ? "text-orange-500"
                  : "text-gray-800 hover:text-orange-500"
              }`}
              onClick={
                link.dropdown
                  ? (e) => {
                      e.preventDefault();
                      handleDropdownToggle(index);
                    }
                  : undefined
              }
            >
              {link.name}
              {link.dropdown && (
                <FaAngleDown
                  className={`ml-1 transition-transform ${
                    dropdownOpen === index ? "rotate-180" : ""
                  }`}
                />
              )}
            </Link>
            {link.dropdown && (
              <div
                className={`absolute left-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-md transition-opacity ${
                  dropdownOpen === index ? "block" : "hidden"
                }`}
              >
                {link.dropdown.map((item, i) => (
                  <Link
                    key={i}
                    to={item.to}
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right Side: User Menu */}
      <div className="hidden md:flex items-center space-x-4">
        {currentUser ? (
          <div className="relative group">
            <button onClick={() => setUserDropdownOpen((prev) => !prev)}>
              <img
                src="https://via.placeholder.com/40"
                alt="User Avatar"
                className="w-7 h-7 rounded-full cursor-pointer"
              />
            </button>
            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg">
                <ul>
                  <li>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleSignout}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Button
            onClick={() => alert("Button clicked!")}
            className="text-white rounded-xl font-semibold text-md px-3"
          >
            Let’s Start
          </Button>
        )}
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-16 left-0 w-full bg-gray-800 transition-transform ${
          mobileMenuOpen ? "block" : "hidden"
        }`}
      >
        {navbarLinks.map((link, index) => (
          <div key={index} className="relative">
            <Link
              to={link.to}
              className="text-white px-4 py-2 hover:bg-gray-700 flex items-center"
              onClick={
                link.dropdown
                  ? (e) => {
                      e.preventDefault();
                      handleDropdownToggle(index);
                    }
                  : undefined
              }
            >
              {link.name}
              {link.dropdown && dropdownOpen === index && (
                <FaAngleDown className="ml-1" />
              )}
            </Link>
            {link.dropdown && dropdownOpen === index && (
              <div className="bg-white text-gray-800 shadow-lg rounded-md w-full">
                {link.dropdown.map((item, i) => (
                  <Link
                    key={i}
                    to={item.to}
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <button className="w-full px-4 py-2 my-3 bg-orange-500 text-white rounded-xl shadow-2xl font-semibold hover:shadow-orange-600">
          Let’s Start
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
