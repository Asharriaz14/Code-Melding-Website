import { useEffect, useState, useMemo } from "react";
import CustomLink from "../buttons/CustomLink";
import { MdArrowOutward, MdSearch } from "react-icons/md";
import LazyLoad from "react-lazyload";
import Layout from "../../layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../redux/user/blogSlice";

const BlogSection = () => {
  const dispatch = useDispatch();
  const { blogs, error, loading } = useSelector((state) => state.blog);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const filteredData = useMemo(() => {
    return blogs.filter((post) => {
      const term = searchTerm.toLowerCase();
      const titleMatch = post.title?.toLowerCase().includes(term);
      const categoryMatch = post.category?.toLowerCase().includes(term);

      // If a category is selected, match only blogs in that category
      if (selectedCategory && post.category !== selectedCategory) {
        return false;
      }

      return titleMatch || categoryMatch;
    });
  }, [blogs, searchTerm, selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
  };

  const uniqueCategories = useMemo(() => {
    return [...new Set(blogs.map((post) => post.category))];
  }, [blogs]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-28">
        <h2 className="text-lg font-medium text-orange-500 mb-2 text-center">
          Blogs
        </h2>

        {/* Search Input */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by Title or Category"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-lg py-2 px-4 w-80 focus:outline-none focus:border-orange-500"
            />
            <MdSearch className="absolute right-3 top-2.5 text-gray-400" />
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-8 flex flex-wrap justify-center space-x-2">
          {uniqueCategories.length > 0 ? (
            uniqueCategories.map((category, index) => (
              <div
                key={index}
                onClick={() => handleCategoryClick(category)}
                className={`relative px-3 py-1 m-2 rounded-md shadow-sm sm:py-2 sm:text-base ring ring-transparent group md:px-4 hover:ring hover:ring-opacity-50 focus:ring-opacity-50 ${
                  selectedCategory === category
                    ? "bg-orange-500 text-white"
                    : "text-gray-900 bg-gray-200"
                } dark:bg-gray-400 dark:text-gray-200 cursor-pointer`}
              >
                <span className="text-sm">{category}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No categories found.</p>
          )}
        </div>

        {/* Grid for Blog Posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.length ? (
            filteredData.map((data, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <LazyLoad>
                  <img
                    src={`http://localhost:3000/uploads/${
                      data.image ?? "default.jpg"
                    }`}
                    alt={data.title || "Blog Post"}
                    className="w-full h-48 object-cover"
                  />
                </LazyLoad>
                <div className="p-6">
                  <p className="font-bold text-lg text-gray-800">
                    {data.title || "Untitled"}
                  </p>
                  <p className="text-sm text-gray-500 hidden">
                    {data.category || "No Category"}
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
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No blogs found matching your search.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BlogSection;
