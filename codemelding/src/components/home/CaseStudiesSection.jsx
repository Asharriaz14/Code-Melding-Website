import CustomLink from '../buttons/CustomLink';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { caseStudies } from './SeriveNoteBook'; // Update the import path as needed

function CaseStudies() {
    const commonSettings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 8000,
        pauseOnHover: false,
        pauseOnFocus: false,
        arrows: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
        appendDots: dots => (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <ul style={{ margin: 0, padding: 0 }}>{dots}</ul>
            </div>
        ),
        customPaging: () => (
            <div
                style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#000',
                    opacity: 0.5,
                }}
            />
        ),
    };

    return (
        <div className="relative overflow-hidden my-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
                Case Studies
            </h2>
            <Slider {...commonSettings}>
                {caseStudies.map((study, index) => (
                    <div key={index} className="bg-white px-4">
                        <div className="grid max-w-screen-xl px-4 pt-8 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-12">
                            <div className="lg:col-span-7 order-2 lg:order-1">
                                <h1 className="max-w-2xl mb-4 text-4xl font-bold leading-none tracking-tight md:text-3xl xl:text-4xl text-gray-900">
                                    {study.heading}
                                </h1>
                                <p className="max-w-xl mb-4 text-gray-600 lg:mb-4 md:text-sm lg:text-lg">
                                    {study.description}
                                </p>
                                <p className="max-w-xl mb-6 text-gray-600 lg:mb-8 md:text-sm lg:text-lg flex flex-wrap">
                                    {study.points.map((point, index) => (
                                        <span key={index} className='border border-[#DADADA] rounded-xl p-3 text-sm my-2 mr-6 text-[#8D8585] flex text-center items-center'>
                                            <span className='mr-2'>{point.icon}</span>
                                            {point.text}
                                        </span>
                                    ))}
                                </p>
                                <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                                    {study.links.map((link, idx) => (
                                        <CustomLink
                                            key={idx}
                                            // to={link.url}
                                            to="/"
                                            className={`py-3 px-6 text-sm rounded-xl font-medium ${
                                                idx === 1 ? 'bg-white text-orange-500 border border-[#DADADA]' : ''
                                            }`}
                                            style={idx === 1 ? { color: '#000000' } : {}}
                                        >
                                            {link.icon}
                                            {link.text}
                                        </CustomLink>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-6 lg:mt-0 col-span-5 flex items-center justify-center order-1 lg:order-2">
                                <img src={study.image} alt="Case Study" className="w-full h-auto object-cover" />
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
            <div className="flex justify-center items-center mt-16">
                <CustomLink  to="/" className='py-3 px-8 rounded-lg' > View All </CustomLink>
            </div>
        </div>
    );
}

export default CaseStudies;
