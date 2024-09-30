import { useState } from "react";
import { FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import Logo from "../../assets/Logo.webp";
import LoginImage from "../../assets/LoginImage.webp";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setPublishError("Enter your credentials.");
      return;
    }

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setPublishError(data.message || "Error occurred while sending data");
        dispatch(signInFailure(data.message)); // Dispatch signInFailure action
      } else {
        dispatch(signInSuccess(data)); // Dispatch signInSuccess action
        setPublishError(null);
        navigate(data.isAdmin ? "/admin/dashboard" : "/"); // Navigate based on user role
      }
    } catch (error) {
      setPublishError("Something went wrong");
      dispatch(signInFailure(error.message)); // Dispatch signInFailure action
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-lg m-0 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <img src={Logo} alt="Login Logo" className="mb-6" />
          <form
            onSubmit={handleSubmit}
            className="mt-24 flex flex-col items-center"
          >
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  className="w-full px-8 py-4 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-md focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                />

                <label
                  className="block text-sm font-medium text-gray-700 mb-2 mt-5"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    className="w-full px-8 py-4 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-md focus:outline-none focus:border-gray-400 focus:bg-white"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <FiEyeOff className="w-5 h-5 text-gray-600" />
                    ) : (
                      <FiEye className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                </div>

                <label className="block text-sm font-bold text-red-700 my-2">
                  {publishError}
                </label>
                <button className="mt-5 tracking-wide font-semibold bg-orange-400 text-white w-full py-4 rounded-lg hover:bg-orange-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <FiUser className="w-6 h-6 -ml-2" />
                  <span className="ml-2">Login In</span>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="flex-1 bg-orange-100 text-center hidden lg:flex">
          <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
            <img src={LoginImage} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
