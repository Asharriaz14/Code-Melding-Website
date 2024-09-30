import AndroidImage from "../../assets/androidmobileTwo.webp";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

const ServiceProvider = () => {
  return (
    <div className="md:mt-12">
      <div className="max-w-screen-xl px-4 pt-20 pb-8 mx-auto flex flex-col lg:flex-row gap-8 relative">
        {/* 60% Div for Image */}
        <div className="w-full lg:w-3/5 p-4 flex-shrink-0">
          <img
            src={AndroidImage}
            alt="Description of image"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* 40% Div for Heading and Links */}
        <div className="w-full lg:w-2/5 p-4 flex flex-col shadow-xl rounded-xl flex-grow">
          <h2 className="text-2xl font-bold mb-8">Other Services</h2>
          <div className="flex flex-col space-y-12 flex-grow">
            {["Link 1", "Link 2", "Link 3", "Link 4", "Link 5"].map(
              (link, index) => (
                <Link
                  key={index}
                  to="#"
                  className="  text-md flex items-center bg-transparent text-Content  border-none shadow-none hover:underline"
                >
                  <span className="mr-1">{link}</span>
                  <FiArrowUpRight size={14} />
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProvider;
