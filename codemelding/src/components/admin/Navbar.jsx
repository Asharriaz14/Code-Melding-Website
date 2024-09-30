import { useCallback, useState } from "react";
import { FaBars, FaSearch, FaCaretDown } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signoutSuccess } from "../../redux/user/userSlice.js";

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleNavbar = () => setNavbarOpen((prev) => !prev);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

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

  const handleSignout = useCallback(async () => {
    try {
      const data = await signOutUser();
      dispatch(signoutSuccess(data));
      navigate("/login");
    } catch (error) {
      // Handle error if necessary
    }
  }, [dispatch, navigate]);

  return (
    <nav className="flex p-2 justify-between items-center border-b border-gray-300 flex-wrap">
      {/* Logo Section */}
      <div className="flex items-center">
        <h2 className="font-bold text-2xl text-orange ml-2">Code Melding</h2>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden">
        <button onClick={toggleNavbar}>
          <FaBars className="text-2xl text-gray-600" />
        </button>
      </div>

      {/* Search bar, Buttons, and Admin Dropdown (hidden on mobile) */}
      <div className="hidden md:flex items-center gap-4">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-200 rounded-md py-1 px-2"
          />
          <FaSearch className="absolute right-2 h-6 w-6 text-gray-400 hover:text-gray-500" />
        </div>

        {/* Admin Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 border px-2 py-1 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Admin <FaCaretDown />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <button
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={handleSignout}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {navbarOpen && (
        <div className="w-full mt-4 flex flex-col items-center gap-2 md:hidden">
          {/* Search bar in mobile view */}
          <div className="relative flex items-center w-full px-4">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-200 rounded-md py-1 px-2 w-full"
            />
            <FaSearch className="absolute right-6 h-6 w-6 text-gray-400 hover:text-gray-500" />
          </div>

          {/* Admin Dropdown in Mobile */}
          <div className="relative w-full px-4">
            <button
              className="flex justify-between items-center gap-2 border px-2 py-1 rounded-md text-gray-700 w-full hover:bg-gray-100"
              onClick={toggleDropdown}
            >
              Admin <FaCaretDown />
            </button>

            {/* Mobile Dropdown Menu */}
            {isDropdownOpen && (
              <div className="mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={handleSignout}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
