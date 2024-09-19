import CustomLink from "../buttons/CustomLink";
import { MdArrowOutward } from "react-icons/md";
import { useEffect, useState, useCallback } from "react";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";

const BlogSection = () => {
  const [blogData, setBlogData] = useState([]);
  const limit = 3;

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch(`/api/post/getposts?limit=${limit}`);
      if (!res.ok) throw new Error("Failed to fetch posts");

      const data = await res.json();
      setBlogData(data.posts);
    } catch (error) {
      console.error("Error Fetching Posts:", error);
    }
  }, [limit]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
      <h2 className="text-lg font-medium text-Orange mb-8 text-center">
        Blogs
      </h2>
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
        Recent Articles & News
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left side (1 blog post) */}
        {blogData.length > 0 && (
          <LazyLoad className="hidden lg:block lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={`http://localhost:3000/uploads/${
                blogData[0]?.image ?? "default.jpg"
              }`}
              alt={blogData[0]?.title || "Blog Post"}
              className="w-full h-4/5 object-cover"
            />
            <div className="p-6">
              <Link
                to={`/blog/${blogData[0]?.slug}`}
                className="text-Content font-bold text-lg"
              >
                {blogData[0]?.title || "Untitled"}
              </Link>
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-500 text-sm">
                  {new Date(blogData[0]?.createdAt).toLocaleDateString() ||
                    "Date not available"}
                </span>
                <div className="flex items-center">
                  <CustomLink
                    to={`/blog/${blogData[0]?.slug}`}
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
        )}

        {/* Right side (2 blog posts) */}
        <div className="space-y-12">
          {blogData.slice(1).map((data, index) => (
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
                      className="text-sm bg-transparent space-x-2 border-none h-12 w-[100px]  shadow-none hover:underline"
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

      <div className="flex justify-center mt-8">
        <CustomLink
          to="/blog"
          className="px-6 py-3 bg-Orange text-white rounded-lg shadow-md hover:bg-darkOrange"
        >
          View All
        </CustomLink>
      </div>
    </div>
  );
};

export default BlogSection;
