import { GoArrowUpRight } from "react-icons/go";
import HaroonImage from "../../assets/HaroonImageNavbar.webp";
import Link from "../buttons/CustomLink";
import LazyLoad from "react-lazyload";

const NewsletterNavbar = () => {
  return (
    <div className="p-2">
      <div className="bg-Orange flex flex-wrap items-center w-full max-w-3xl p-5 mx-4 border border-gray-200 rounded lg:flex-nowrap md:p-4">
        <LazyLoad>
          <img
            src={HaroonImage}
            alt="Circle Image"
            className="w-20 h-20 rounded-full mr-3"
          />
        </LazyLoad>
        <div className="flex-1 md:pr-5 lg:px-6">
          <p className="text-White font-medium">
            Ready to Build Futuristic Digital Solutions? Let’s
            <br />
            Collaborate to Conquer Challenges and Achieve Success!
          </p>
        </div>
        {/* Button on the right */}
        <div className="w-full md:w-auto px-1">
          <div className="flex gap-2">
            <Link
              to="#"
              className="bg-White rounded-lg text-sm font-semibold p-3 hover:bg-Orange hover:text-White"
              style={{ color: "#1D1D1D" }}
            >
              Consult Experts
              <GoArrowUpRight
                className="ml-1 inline-block transition-colors duration-300"
                style={{ color: "#FF3D00" }}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterNavbar; // Fixed the component name here
