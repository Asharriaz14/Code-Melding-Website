import { FaBlog, FaHistory, FaBoxOpen } from "react-icons/fa";
import PropTypes from "prop-types"; // Step 2: Import PropTypes

const InformationBox = ({ blogData }) => {
  const { lastMonthPosts, posts, totalPosts } = blogData || {
    lastMonthPosts: 0,
    posts: [],
    totalPosts: 0,
  };

  const uniqueCategories = [
    ...new Set(posts.map((post) => post.category || "Uncategorized")),
  ];
  const uniqueCategoryCount = uniqueCategories.length;

  return (
    <div>
      <div className="m-6">
        <div className="flex flex-wrap -mx-6">
          {/* Total Blogs Card */}
          <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100">
              <div className="p-3 rounded-full bg-indigo-600 bg-opacity-75">
                <FaBlog className="h-8 w-8 text-white" />
              </div>

              <div className="mx-5">
                <h4 className="text-2xl font-semibold text-gray-700">
                  {totalPosts}
                </h4>
                <div className="text-gray-500">Total Blogs</div>
              </div>
            </div>
          </div>

          {/* Last Month Posts Card */}
          <div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100">
              <div className="p-3 rounded-full bg-orange-600 bg-opacity-75">
                <FaHistory className="h-8 w-8 text-white" />
              </div>

              <div className="mx-5">
                <h4 className="text-2xl font-semibold text-gray-700">
                  {lastMonthPosts}
                </h4>
                <div className="text-gray-500">Last Month</div>
              </div>
            </div>
          </div>

          {/* Total Unique Categories Card */}
          <div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100">
              <div className="p-3 rounded-full bg-pink-600 bg-opacity-75">
                <FaBoxOpen className="h-8 w-8 text-white" />
              </div>

              <div className="mx-5">
                <h4 className="text-2xl font-semibold text-gray-700">
                  {uniqueCategoryCount}
                </h4>
                <div className="text-gray-500">Total Categories</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

InformationBox.propTypes = {
  blogData: PropTypes.shape({
    lastMonthPosts: PropTypes.number,
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        category: PropTypes.string,
      })
    ),
    totalPosts: PropTypes.number,
  }),
};

export default InformationBox;
