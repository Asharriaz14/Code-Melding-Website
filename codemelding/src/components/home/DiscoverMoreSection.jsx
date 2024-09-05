import Stones from '../../assets/Stones.png';
import CustomLink from '../buttons/CustomLink';
import '../../App.css'
import { motion } from "framer-motion";


function DiscoverMore() {
  return (
    <div className="my-16">
      <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center lg:items-start">
      <motion.div className="relative box order-2 lg:order-1 lg:w-1/2 mb-8 lg:mb-0 flex justify-center lg:justify-start" initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01]
      }}>

       
          <img
            src={Stones}
            alt="Discover Image"
            className="w-full max-w-[500px] h-auto discover-img"
          />
        </motion.div>
        <div className="order-1 lg:order-2 lg:w-1/2 text-center lg:text-left md:pr-16">
          <p className="mb-4 text-Orange font-semibold">Code Melding</p>
          <h1 className="text-3xl lg:text-5xl font-bold leading-tight">
            Meet the Minds Behind the Code
          </h1>
          <p className="text-lg mt-4 lg:mt-6 text-justify md:pr-8">
            At Code Melding, we’re a passionate team of developers, designers, and AI specialists who are revolutionizing the digital landscape. We craft exceptional web, mobile, and web app experiences infused with cutting-edge UI/UX design, intelligent AI, and pioneering Web3 development.
          </p>
          <div className="mt-6 lg:mt-8">
            <CustomLink
              to="#"
              className="py-2 px-8 uppercase rounded w-48 mx-auto lg:mx-0"
            >
              Discover More
            </CustomLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscoverMore;
