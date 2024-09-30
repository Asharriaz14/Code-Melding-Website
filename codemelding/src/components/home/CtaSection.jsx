import HaroonImage from "../../assets/HaroonImage.webp";
import backgroundImage from "../../assets/CtaBackground.webp";
import { GoArrowUpRight } from "react-icons/go";
import LazyLoad from "react-lazyload";

function Cta() {
  return (
    <div className="my-16">
      <div
        className="flex flex-row   md:px-8 h-[250px] bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-col justify-center px-4 lg:px-12 py-4 w-full lg:w-1/2">
          <p className="text-2xl lg:text-4xl  mb-4 text-white font-semibold">
            What We Can Do
          </p>
          <p className="text-sm md:text-lg mb-8 md:mb-4 text-white">
            Excepteur sint occaecat cupidatat non proident
          </p>
          <div className="flex gap-2">
            <button className="bg-White rounded-lg text-Content text-sm font-medium text-center self-center p-3 hover:bg-Orange hover:text-White">
              Consult Experts
              <GoArrowUpRight
                className="ml-1 inline-block transition-colors duration-300 text-Orange"
                style={{ color: "currentColor" }}
              />
            </button>
          </div>
        </div>
        <LazyLoad className="w-full lg:w-1/2 relative flex items-end ">
          <img
            src={HaroonImage}
            alt="Haroon"
            className="w-full sm:h-[250px] md:h-[350px] object-contain"
          />
        </LazyLoad>
      </div>
    </div>
  );
}

export default Cta;
