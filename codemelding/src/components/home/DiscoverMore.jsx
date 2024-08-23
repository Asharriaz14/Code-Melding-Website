import Stones from '../../assets/Stones.png';

function DiscoverMore() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center lg:items-start">
        <div className="order-2 lg:order-1 lg:w-1/2 mb-8 lg:mb-0 flex justify-center lg:justify-start">
          <img
            src={Stones}
            alt="Discover Image"
            className="w-full max-w-[500px] h-auto"
          />
        </div>
        <div className="order-1 lg:order-2 lg:w-1/2 text-center lg:text-left md:pr-16">
          <p className="mb-4 text-Orange font-semibold">Code Melding</p>
          <h1 className="text-3xl lg:text-5xl font-bold leading-tight">
            Meet the Minds Behind the Code
          </h1>
          <p className="text-lg mt-4 lg:mt-6 text-justify md:pr-8">
            At Code Melding, we’re a passionate team of developers, designers, and AI specialists who are revolutionizing the digital landscape. We craft exceptional web, mobile, and web app experiences infused with cutting-edge UI/UX design, intelligent AI, and pioneering Web3 development.
          </p>
          <div className="mt-6 lg:mt-8">
            <button
              type="button"
              className="py-2 px-8 bg-Orange hover:bg-orange-400 text-white uppercase rounded transition duration-300"
            >
              Discover More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscoverMore;
