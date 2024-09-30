import { useState, useCallback, memo } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navbarLinks, tabs } from "./NavLinks";
import Button from "../buttons/Button";
import CompanyLogo from "../../assets/Logo.webp";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../../redux/user/userSlice";
import { MdOutlineArrowOutward } from "react-icons/md";
import NewletterNavbar from "./NewletterNavbar";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

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

// Memoized Navbar component
const Navbar = memo(() => {
  const { currentUser } = useSelector((state) => state.user);

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [boxHidden, setBoxHidden] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0].name);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [openTabIndex, setOpenTabIndex] = useState(null);

  const toggleMobNavbar = () => {
    setIsDropdownOpen((prev) => !prev);
    if (!isDropdownOpen) {
      setIsServicesOpen(false);
      setOpenTabIndex(null);
    }
  };
  // useEffect(() => {
  //   const handleClickOutside = (e) => {
  //     if (!e.target.closest(".dropdown-container")) {
  //       setBoxHidden(false);
  //     }
  //   };

  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  const handleSignout = useCallback(async () => {
    try {
      const data = await signOutUser();
      dispatch(signoutSuccess(data));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, navigate]);

  const openTab = useCallback((tabName) => {
    setActiveTab(tabName);
  }, []);

  const showDropdownDiv = useCallback(() => {
    setBoxHidden((prev) => !prev);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white p-4 lg:py-5 lg:px-16 z-50">
        <div className="flex items-center justify-between dropdown-container">
          {/* Left Side: Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img src={CompanyLogo} alt="Logo" className="h-10" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMobNavbar} className="text-gray-800">
              {isDropdownOpen ? <FaTimes /> : <FaBars />}
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
                  onClick={(e) => {
                    if (link.to === "#") {
                      e.preventDefault();
                      showDropdownDiv();
                    }
                  }}
                >
                  {link.name}
                </Link>
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
            className={`md:hidden absolute top-16 left-0 w-full  transition-transform ${
              isDropdownOpen ? "block" : "hidden"
            }`}
          >
            <nav className="bg-Orange text-White p-4">
              {isDropdownOpen && (
                <div className="flex flex-col mt-2 ">
                  {navbarLinks.map((item, index) => (
                    <div
                      key={index}
                      className="relative py-5 border-b border-White font-semibold"
                    >
                      {item.name === "Services" ? (
                        <>
                          <div className="flex">
                            <button
                              className="px-4 w-full text-left "
                              onClick={() => setIsServicesOpen(!isServicesOpen)}
                            >
                              {item.name}
                            </button>
                            <span>
                              {isServicesOpen ? (
                                <IoIosArrowUp />
                              ) : (
                                <IoIosArrowDown />
                              )}
                            </span>
                          </div>
                          {isServicesOpen && (
                            <div
                              className={` flex flex-col  rounded-md shadow-lg mt-4  `}
                            >
                              {tabs.map((tab, tabIndex) => (
                                <div key={tabIndex} className="relative">
                                  <div className="flex bg-White text-Orange items-center pr-2">
                                    <button
                                      className={`block py-4 px-4 w-full text-left  border-b border-White   ${
                                        tabIndex === 0 ? " border-t " : ""
                                      } ${
                                        tabIndex === 4 ? "border-none" : ""
                                      } `}
                                      onClick={() => {
                                        setOpenTabIndex(
                                          openTabIndex === tabIndex
                                            ? null
                                            : tabIndex
                                        );
                                      }}
                                    >
                                      {tab.name}
                                    </button>
                                    <span>
                                      {openTabIndex === tabIndex ? (
                                        <IoIosArrowUp />
                                      ) : (
                                        <IoIosArrowDown />
                                      )}
                                    </span>
                                  </div>
                                  {openTabIndex === tabIndex && (
                                    <div className="flex flex-col bg-gray-600 rounded-md shadow-lg mt-1 h-40 overflow-y-auto">
                                      {tab.data.map((subItem, subIndex) => (
                                        <a
                                          key={subIndex}
                                          href={subItem.to}
                                          className="block py-2 px-4 hover:bg-gray-500"
                                        >
                                          {subItem.name}
                                        </a>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <a
                          href={item.to}
                          className="py-2 px-4 hover:bg-gray-700"
                        >
                          {item.name}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </nav>
          </div>
        </div>

        {boxHidden && (
          <div className="w-full mx-auto ">
            <div className="bg-[#ffe2d9] rounded-md">
              <div className="mt-12">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    className={`w-1/5 py-4 text-center text-md text-Content focus:outline-none ${
                      activeTab === tab.name
                        ? "text-white font-bold shadow-lg"
                        : ""
                    }`}
                    style={{
                      backgroundColor: activeTab === tab.name ? "#FF3D00" : "",
                      borderRadius: activeTab === tab.name ? ".4rem" : "",
                    }}
                    onClick={() => openTab(tab.name)}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 p-6">
              {tabs
                .find((tab) => tab.name === activeTab)
                ?.data.map((mob, index) => (
                  <div
                    key={index}
                    className="p-1  text-center flex items-center text-sm font-semibold"
                  >
                    <span className="mr-2 text-Orange ">
                      <MdOutlineArrowOutward size={16} />
                    </span>{" "}
                    <Link to={mob.to} className="hover:text-Orange">
                      {mob.name}
                    </Link>
                  </div>
                ))}
            </div>

            <NewletterNavbar />
          </div>
        )}
      </nav>
    </>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
