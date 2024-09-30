import MobileImage from "../../assets/androidmobile.webp";
import { motion } from "framer-motion";
import "../../App.css";
import LazyLoad from "react-lazyload";
import SkeletonLoader from "../customComponents/SkeletonLoader";

function HeroSection() {
  return (
    <div className=" md:mt-12">
      <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto gap-8 lg:grid-cols-12 lg:py-16 relative">
        {/* Text Content */}
        <div className="mr-auto place-self-center lg:col-span-7 px-4 md:px-8">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-tight tracking-wide md:tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-Orange"> Android App</span>
            <br />
            Development
          </h1>
          <p className="max-w-2xl mb-6 font-medium text-Content sm:mb-8 text-lg">
            By understanding your goals and leveraging advanced solutions, we
            create bespoke outcomes that not only meet today’s needs but are
            adaptable for the future, ensuring your vision thrives in an
            ever-evolving digital landscape.
          </p>
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
            </motion.div>
          </LazyLoad>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
