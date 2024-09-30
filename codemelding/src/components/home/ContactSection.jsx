import { useEffect, useState, useCallback } from "react";
import Button from "../buttons/button";
import FlagDropdown from "../customComponents/FlagDropdown";
import { SiTicktick } from "react-icons/si";

function Contact() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("PK");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    askquery: "",
    message: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [dataError, setFormError] = useState(null);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.lastname ||
      !formData.email ||
      formData.phone ||
      !formData.askquery ||
      !formData.message
    ) {
      setFormError("Please fill the all field");
    }
    console.log(formData);
    setShowSuccessModal(true);

    // try {
    //   const res = await fetch("/api/contact", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   if (!res.ok) {
    //     throw new Error("Error sending form data: " + res.statusText);
    //   }
    //   await res.json();
    //   setShowSuccessModal(true); // Show modal on success
    //   setFormData({
    //     firstname: "",
    //     lastname: "",
    //     email: "",
    //     phone: "",
    //     askquery: "",
    //     message: "",
    //   }); // Reset form data
    // } catch (error) {
    //   console.log("Error while sending form data: ", error);
    // }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
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
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                  <div className="md:w-1/2">
                    <input
                      type="text"
                      name="firstname"
                      placeholder="First Name*"
                      className="w-full bg-white border border-[#E1E5EF] rounded-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 py-2 px-4 text-gray-900 text-sm"
                      id="firstname"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="md:w-1/2">
                    <input
                      type="text"
                      name="lastname"
                      placeholder="Last Name*"
                      className="w-full bg-white border border-[#E1E5EF] rounded-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 py-2 px-4 text-gray-900 text-sm"
                      id="lastname"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email*"
                    className="w-full bg-white border border-[#E1E5EF] rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500 py-2 px-4 text-gray-900 text-sm"
                    onChange={handleChange}
                  />
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
                      id="phone"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <select
                    name="askquery"
                    onChange={handleChange}
                    className="w-full bg-white border border-[#E1E5EF] rounded-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 py-2 px-4 text-gray-900 text-sm"
                  >
                    <option value="" disabled>
                      Select Type of Inquiry
                    </option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message*"
                    className="w-full bg-white border border-[#E1E5EF] rounded-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 h-32 py-2 px-4 text-gray-900 text-sm resize-none"
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div>
                  <Button type="submit" className="rounded-lg">
                    Submit
                  </Button>
                </div>
                {dataError && <div className="text-red-600">{dataError}</div>}
              </form>
            )}
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 sm:mx-0 sm:h-10 sm:w-10">
                <SiTicktick className="h-6 w-6 text-Orange" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-semibold text-gray-900">
                  Your Message has been Successfully Sent!
                </h3>
                <div className="mt-2">
                  <p className="text-sm leading-5 text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Autem mollitia inventore quod. Yay!
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-Orange text-base leading-6 font-medium text-white shadow-sm hover:bg-orange-500 focus:outline-none focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  onClick={closeModal}
                >
                  Close
                </button>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contact;
