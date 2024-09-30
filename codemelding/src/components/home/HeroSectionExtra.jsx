import Spline from "@splinetool/react-spline";
import backgroundImage from "../../assets/Circle.webp";

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-b from-white via-white to-Orange">
      <div
        className="bg-contain bg-no-repeat   -mt-10  overflow-visible"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: "left center", // Position the image to the left
          backgroundSize: "400px auto", // Set the width of the image to 200px
        }}
      >
        <div className="relative flex flex-col items-center max-w-screen-xl px-4 mx-auto md:flex-row pb-20 ">
          {/* Text Content */}
          <div className="relative flex flex-col items-start justify-center py-5 md:w-1/2 md:pr-16 mt-10 md:mt-0">
            <div className="text-left px-0 md:px-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-wide text-Content">
                We Build Brands by
                <span className="text-Orange"> Melding Codes</span>
              </h2>
              <p className="max-w-md mt-4 text-sm sm:text-base md:text-lg text-Content font-medium">
                Empowering Startups with Expert Mobile App Development, Web
                Design, and UI/UX Solutions
              </p>
              <div className="mt-4 sm:mt-6 md:mt-8">
                <div className="md:w-3/5">
                  <a
                    href="#"
                    className="flex items-center justify-center w-full px-8 py-2 text-base text-white transition duration-150 ease-in-out bg-Orange border border-transparent rounded-full hover:bg-orange-400 focus:outline-none focus:shadow-outline-blue"
                  >
                    Get started on your Dream
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Spline Content */}
          <div className="hidden md:flex items-center justify-center w-full md:w-1/2 h-[500px] sm:h-[400px] md:h-[470px] lg:h-[500px]">
            <div className="relative w-full h-full mt-0 md:-mt-16">
              <Spline scene="https://prod.spline.design/c1ZQLiGFwA1hDqM9/scene.splinecode" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
