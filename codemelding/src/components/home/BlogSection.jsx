import image1 from '../../assets/blog-one.png';
import image2 from '../../assets/blog-two.png';
import image3 from '../../assets/blog-three.png';
import CustomLink from '../buttons/CustomLink'
import { MdArrowOutward } from "react-icons/md";


const BlogSection = () => {
  // Sample blog data
  const blogs = [
    { id: 1,  content: 'Lorem ipsum dolor sit amet consectetur. Est erat nullam sodales volutpat ut facilisis.', imageUrl: image1, date: 'September 2, 2024' },
    { id: 2,  content: 'Lorem ipsum dolor sit amet consectetur. Est erat nullam sodales volutpat ut facilisis.', imageUrl: image2, date: 'August 29, 2024' },
    { id: 3,  content: 'Lorem ipsum dolor sit amet consectetur. Est erat nullam sodales volutpat ut facilisis.', imageUrl: image3, date: 'August 25, 2024' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
      <h2 className="text-lg font-medium text-Orange mb-8 text-center"> Blogs</h2>
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Recent Articles & News</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left side (1 blog post) */}
        <div className="hidden lg:block lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
          <img src={blogs[0].imageUrl} alt={blogs[0].content} className="w-full h-4/5	 object-cover" />
          <div className="p-6">
            <p className="text-Content font-bold text-lg">{blogs[0].content}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-gray-500 text-sm">{blogs[0].date}</span>
              <div className="flex items-center">

<CustomLink to={blogs[0].link} className="text-sm  bg-transparent  space-x-2"
style={{ color: '#FF3D00' }}>
<span>Read More</span>
</CustomLink>
<MdArrowOutward className='text-sm text-Orange font-light' />
</div>
            </div>
          </div>
        </div>

        {/* Right side (2 blog posts) */}
        <div className="space-y-6">
          {blogs.slice(1).map((blog) => (
            <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={blog.imageUrl} alt={blog.content} className="w-full h-48 object-cover" />
              <div className="p-6">
                <p className="text-Content font-bold text-lg">{blog.content}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-gray-500 text-sm">{blog.date}</span>
                  <div className="flex items-center">

                  <CustomLink to={blogs[0].link} className="text-sm  bg-transparent  space-x-2"
                  style={{ color: '#FF3D00' }}>
                <span>Read More</span>
              </CustomLink>
                <MdArrowOutward className='text-sm text-Orange font-light' />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <CustomLink className="px-6 py-3 rounded-lg">
          View All 
        </CustomLink>
      </div>
    </div>
  );
};

export default BlogSection;
