import CustomLink from "../buttons/CustomLink";
import { MdArrowOutward } from "react-icons/md";
import { useEffect, useState, useCallback } from "react";
import LazyLoad from "react-lazyload";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "../../layout/Layout";

const BlogSection = () => {
  const [blogData, setBlogData] = useState([]);

  // Fetch blog posts
  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/post/getposts"); // Fixed URL
      if (!res.ok) throw new Error("Failed to fetch posts");

      const data = await res.json();
      setBlogData(data.posts);
    } catch (error) {
      console.error("Error Fetching Posts:", error);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
    window.scrollTo(0, 0);
  }, [fetchPosts]);

  // Filter blogs array for slider items
  const filterBlogs = [
    { name: "Card", to: "/cards" },
    { name: "Call to Action", to: "/cta" },
    { name: "Card", to: "/cards" },
    { name: "Call to Action", to: "/cta" },
    { name: "Card", to: "/cards" },
    { name: "Call to Action", to: "/cta" },
  ];

  // Slider settings
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 20000,
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

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-28">
        <h2 className="text-lg font-medium text-Orange mb-2 text-center">
          Blogs
        </h2>

        {/* Slider for filterBlogs */}
        <div className="mb-8">
          <Slider {...sliderSettings}>
            {filterBlogs.map((filter, index) => (
              <div
                key={index}
                className="flex flex-wrap items-start justify-center p-5 py-10"
              >
                <CustomLink
                  className="relative px-3 py-1 m-2 rounded-md shadow-sm sm:py-2 sm:text-base ring ring-transparent group md:px-4 hover:ring hover:ring-opacity-50 focus:ring-opacity-50 hover:ring-violet-600 text-gray-900 bg-gray-200 dark:bg-gray-400 dark:text-gray-200"
                  to={filter.to}
                >
                  <span className="text-sm">{filter.name}</span>
                </CustomLink>
              </div>
            ))}
          </Slider>
        </div>

        {/* Grid for blogData */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogData.map((data, index) => (
            <LazyLoad
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={`http://localhost:3000/uploads/${
                  data.image ?? "default.jpg"
                }`}
                alt={data.title || "Blog Post"}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <p className="text-Content font-bold text-lg">
                  {data.title || "Untitled"}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-gray-500 text-sm">
                    {new Date(data.createdAt).toLocaleDateString() ||
                      "Date not available"}
                  </span>
                  <div className="flex items-center">
                    <CustomLink
                      to={`/blog/${data.slug}`}
                      className="text-sm bg-transparent space-x-2 border-none h-12 w-[100px] shadow-none hover:underline"
                      style={{ color: "#FF3D00" }}
                      noHover
                    >
                      <span>Read More</span>
                    </CustomLink>
                    <MdArrowOutward className="text-sm text-Orange font-light -ml-2" />
                  </div>
                </div>
              </div>
            </LazyLoad>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default BlogSection;
