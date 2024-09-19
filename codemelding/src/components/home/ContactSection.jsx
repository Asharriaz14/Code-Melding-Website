import { useEffect, useState, useCallback } from "react";
import Button from "../buttons/button";
import FlagDropdown from "../customComponents/FlagDropdown";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

function Contact() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("PK");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCountries = useCallback(async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      if (!response.ok) throw new Error("Failed to fetch countries");
      const data = await response.json();
      const sortedCountries = data.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
      setCountries(sortedCountries);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  const handleCountryChange = (selectedCountry) => {
    setCountry(selectedCountry);
  };

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    onSuccess: () => {
      alert("Your data has been sent successfully");
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      country: country,
    };

    console.log("Form Data:", formData);

    mutation.mutate(formData);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="my-16">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 bg-Orange p-12 rounded-lg shadow-lg flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Innovate with Confidence.
          </h1>
          <h1 className="text-4xl font-bold text-white mb-4">
            Secure Your Future.
          </h1>
          <p className="text-base text-white mb-4 font-light text-justify">
            At Code Melding, we blend cutting-edge technology with innovative
            solutions to protect your business from financial threats. Whether
            you’re seeking expertise in fraud detection, compliance, mobile app
            development, web solutions, or AI-driven advancements, our team is
            ready to provide tailored support and live demos that align with
            your unique needs.
          </p>
          <p className="text-sm text-white font-bold">Haroon Hussain</p>
          <p className="text-base text-white font-light">CEO, Code Melding</p>
        </div>

        <div className="md:w-1/2 mt-8 md:mt-0 px-4 md:px-0 bg-[#FAFAFA] rounded-lg">
          <div className="px-8 py-16">
            <p className="text-2xl font-bold text-gray-800 mb-4">
              Don’t dream for success, contact us
            </p>
            <p className="text-sm font-bold text-gray-800 mb-4">
              Schedule a 30-minute product demo with our experts.
            </p>

            {loading ? (
              <p>Loading countries...</p>
            ) : error ? (
              <p>Error loading countries: {error}</p>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                  <div className="md:w-1/2">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name*"
                      className="w-full bg-white border border-[#E1E5EF] rounded-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 py-2 px-4 text-gray-900 text-sm"
                      {...register("firstName", {
                        required: "First Name is required",
                      })}
                    />
                    {errors.firstName && (
                      <div className="text-red-700">
                        {errors.firstName.message}
                      </div>
                    )}
                  </div>
                  <div className="md:w-1/2">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name*"
                      className="w-full bg-white border border-[#E1E5EF] rounded-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 py-2 px-4 text-gray-900 text-sm"
                      {...register("lastName", {
                        required: "Last Name is required",
                      })}
                    />
                    {errors.lastName && (
                      <p className="text-red-700">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email*"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                    className="w-full bg-white border border-[#E1E5EF] rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500 py-2 px-4 text-gray-900 text-sm"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="flex">
                  <div className="flex-none w-14 h-14">
                    <FlagDropdown
                      countries={countries}
                      selectedCountry={country}
                      onChange={handleCountryChange}
                    />
                  </div>
                  <div className="grow">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      className="w-full bg-white border-y border-r border-[#E1E5EF] rounded-r-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 py-2 px-4 text-gray-900 text-sm"
                      {...register("phone")}
                    />
                  </div>
                </div>
                <div>
                  <select
                    name="inquiryType"
                    className="w-full bg-white border border-[#E1E5EF] rounded-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 py-2 px-4 text-gray-900 text-sm"
                    {...register("inquiryType", {
                      required: "Inquiry type is required",
                    })}
                  >
                    <option value="" disabled>
                      Select Type of Inquiry
                    </option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                  {errors.inquiryType && (
                    <p className="text-red-700">{errors.inquiryType.message}</p>
                  )}
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message*"
                    className="w-full bg-white border border-[#E1E5EF] rounded-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 h-32 py-2 px-4 text-gray-900 text-sm resize-none"
                    {...register("message", {
                      required: "Message is required",
                    })}
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                <div>
                  <Button
                    type="submit"
                    className="rounded-lg"
                    onClick={handleFormSubmit}
                  >
                    {mutation.isLoading ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
