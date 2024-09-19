import MobileImage from "../../assets/MobileVpn.png";
import Mobile1 from "../../assets/Growth.png";
import Mobile2 from "../../assets/Download.png";
import backgroundImage from "../../assets/Circle.png";
import { motion } from "framer-motion";
import CustomLink from "../buttons/CustomLink";
import "../../App.css";
import LazyLoad from "react-lazyload";
import SkeletonLoader from "../customComponents/SkeletonLoader";

function HeroSection() {
  return (
    <div className="bg-gradient-to-b from-white via-white to-Orange md:mt-24">
      <div
        className="absolute inset-0 lg:col-span-7"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: "left center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto gap-8 lg:grid-cols-12 lg:py-16 relative">
        {/* Text Content */}
        <div className="mr-auto place-self-center lg:col-span-7 px-4 md:px-8">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-tight tracking-wide md:tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            We Build Brands <br /> by
            <span className="text-Orange"> Melding Codes</span>
          </h1>
          <p className="max-w-2xl mb-6 font-medium text-Content sm:mb-8 text-lg">
            Empowering Startups with Expert Mobile App{" "}
            <br className="hidden md:block" />
            Development, Web Design, and UI/UX Solutions
          </p>
          <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
            <CustomLink
              to="/"
              target="_blank"
              className="px-5 py-3 rounded-full w-60"
            >
              Get started on your Dream
            </CustomLink>
          </div>
        </div>

        {/* Image Content */}
        <div className="lg:mt-0 lg:col-span-5 lg:flex lg:justify-end">
          <LazyLoad
            className="relative w-full max-w-lg"
            placeholder={<SkeletonLoader />}
          >
            <motion.div
              className="relative box "
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <img
                className="object-cover w-full h-full rounded-lg transform transition-transform duration-500 ease-in-out rotate-6 banner-img"
                src={MobileImage}
                alt="Hero"
              />
              <img
                className="absolute bottom-0 left-0 w-1/3 h-auto rounded-lg"
                src={Mobile1}
                alt="Mobile1"
              />
              <img
                className="absolute bottom-0 right-0 w-1/2 h-auto rounded-lg md:-right-12"
                src={Mobile2}
                alt="Mobile2"
              />
            </motion.div>
          </LazyLoad>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
