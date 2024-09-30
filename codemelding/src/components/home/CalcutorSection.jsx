import LazyLoad from "react-lazyload";
import CalculatorImage from "../../assets/CalculateImage.webp";
import CustomLink from "../buttons/CustomLink";
function Calculator() {
  return (
    <LazyLoad className="my-16">
      <div
        className="h-[400px] relative md:min-h-screen bg-cover bg-center flex items-center justify-center py-20 px-4"
        style={{
          backgroundImage: `url(${CalculatorImage})`,
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 sm:p-8  max-w-4xl mx-auto mt-28">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center leading-tight sm:leading-normal mt-20 md:mt-40">
            Calculate the quote of the project{" "}
            <br className="hidden sm:inline-block" />
            or team extension.
          </h1>
          <CustomLink
            to="/"
            className="px-12 py-3 rounded-lg mt-4 sm:mt-8 text-sm sm:text-lg"
          >
            Calculate
          </CustomLink>
        </div>
      </div>
    </LazyLoad>
  );
}

export default Calculator;
