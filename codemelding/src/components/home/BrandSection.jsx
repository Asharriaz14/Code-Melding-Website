import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import BrandOne from "../../assets/Brand-One.png";
import BrandTwo from "../../assets/Brand-Two.png";
import BrandThree from "../../assets/Brand-Three.png";
import BrandFour from "../../assets/Brand-Four.png";
import BrandFive from "../../assets/Brand-Five.png";
import BrandSix from "../../assets/Brand-Six.png";
import BrandSeven from "../../assets/Brand-Seven.png";
import BrandEight from "../../assets/Brand-Eight.png";
import BrandNine from "../../assets/Brand-Nine.png";
import BrandTen from "../../assets/Brand-Ten.png";
import BrandEleven from "../../assets/Brand-Eleven.png";
import BrandTwelve from "../../assets/Brand-Twelve.png";
import BrandThirteen from "../../assets/Brand-Thirteen.png";
import LazyLoad from "react-lazyload";

function BrandSection() {
  const commonSettings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 300,
    pauseOnHover: false,
    pauseOnFocus: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const rtlSettings = {
    ...commonSettings,
    rtl: true, // Enable right-to-left sliding
  };

  const brands = [
    BrandOne,
    BrandTwo,
    BrandThree,
    BrandFour,
    BrandFive,
    BrandSix,
    BrandSeven,
    BrandEight,
    BrandNine,
    BrandTen,
    BrandEleven,
    BrandTwelve,
    BrandThirteen,
  ];

  return (
    <div className="bg-white max-w-screen-xl px-4 my-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center pb-8">
        We are blessed to work with amazing <br /> brands worldwide
      </h2>

      <LazyLoad className="max-w-full mx-auto">
        <Slider {...commonSettings} className="md:pl-12">
          {brands.map((brand, index) => (
            <div key={index}>
              <img alt="BrandLogo" className="h-20 mx-auto" src={brand} />
            </div>
          ))}
        </Slider>
        <Slider {...rtlSettings} className="mt-10 md:pr-12">
          {brands
            .slice()
            .reverse()
            .map((brand, index) => (
              <div key={index}>
                <img alt="BrandLogo" className="h-20 mx-auto" src={brand} />
              </div>
            ))}
        </Slider>
      </LazyLoad>
    </div>
  );
}

export default BrandSection;
