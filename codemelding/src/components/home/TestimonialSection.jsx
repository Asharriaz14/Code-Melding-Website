import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaQuoteLeft } from 'react-icons/fa';
import { MdArrowForwardIos, MdArrowBackIosNew } from 'react-icons/md';

import PropTypes from 'prop-types';
import '../../App.css';

// Custom Arrow Components
const ArrowButton = ({ onClick, direction }) => (
  <button
    className={`absolute -bottom-12 right-5 ${direction === 'right' ? '' : 'mx-10'} items-end text-Content p-2 rounded-full focus:outline-none`}
    onClick={onClick}  
  >
    {direction === 'right' ? <MdArrowForwardIos /> : <MdArrowBackIosNew />}
  </button>
);

const limitedContent = (content, wordLimit) => {
  const words = content.split(' ');
  return words.length > wordLimit ? `${words.slice(0, wordLimit).join(' ')} ...` : content;
};

const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    content: 'are great with time management and produce high-quality work. Because of how satisfied we’ve been with their work on this project.',
    place: 'New York, USA',
    imageUrl: 'https://via.placeholder.com/600x400',
  },
  {
    id: 2,
    name: 'Jane Smith',
    content: 'are great with time management and produce high-quality work. Because of how satisfied we’ve been with their work on this project.',
    place: 'Los Angeles, USA',
    imageUrl: 'https://via.placeholder.com/600x400',
  },
  {
    id: 3,
    name: 'David Williams',
    content: 'are great with time management and produce high-quality work. Because of how satisfied we’ve been with their work on this project.',
    place: 'Chicago, USA',
    imageUrl: 'https://via.placeholder.com/600x400',
  },
];

const TestimonialSection = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '25%',
    arrows: true,
    prevArrow: <ArrowButton direction="left" />, 
    nextArrow: <ArrowButton direction="right" />, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerPadding: '20%',
        },
      },
      {
        breakpoint: 768,
        settings: {
          centerPadding: '10%',
        },
      },
    ],
  };

  return (
    <div className="my-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Testimonials</h2>
        <Slider {...settings}>
          {testimonials.map(({ id, name, content, place, imageUrl }) => (
            <div key={id} className="px-4">
              <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg flex flex-col lg:flex-row border-2 border-Orange">
                <div className="lg:w-3/6 w-full">
                  <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover rounded-lg lg:custom-clip-path"
                  />
                </div>
                <div className="lg:w-3/6 w-full flex flex-col justify-center p-6 space-y-4">
                  <div className="text-Orange text-5xl">
                    <FaQuoteLeft />
                  </div>
                  <p className="text-Content text-md font-medium">
                    {limitedContent(content, 20)}
                  </p>
                  <div className="text-sm text-Content font-medium mt-4">
                    <p>{name}</p>
                    <p>{place}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

ArrowButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
};

export default TestimonialSection;
