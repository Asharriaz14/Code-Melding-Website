
import UpworkImage from '../../assets/Upwork.png'
import FiverImage from '../../assets/Fiverr.png'
import TrustpilotImage from '../../assets/TrustPilot.png'
import ClutchImage from '../../assets/Clutch.png'
const Companies = () => {
  const images = [
    UpworkImage,
    ClutchImage,
    TrustpilotImage,
    FiverImage,
  ];

  return (
    <div className="max-w-screen-xl  mx-auto my-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center pb-8">
        One of the Best Companies <br /> based on Upwork & Fiverr
      </h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto p-4">
      {images.map((image, index) => (
          <div
          key={index}
          className="bg-[#FAFAFA] flex justify-center items-center h-40 p-2 md:p-4 rounded-xl shadow-md"
          >
          <img src={image} alt={`Image ${index + 1}`} className=" lg:h-24" />
        </div>
      ))}
    </div>
      </div>
  );
};

export default Companies;
