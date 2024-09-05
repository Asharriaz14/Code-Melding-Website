import BlogImage from '../../assets/BlogImage.png'
function BlogHeader() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-screen-lg mx-auto">
        <div className="mt-20 mb-8">
      <div className="text-Orange mt-4 mb-8 font-medium font-base">
        <p>Company / Code Melding blogs / Fintech / <span className='text-[#676767]'>  Top Flutter Development</span> </p>
      </div>
          <h1 className="text-4xl font-bold mb-2">Flutter for Web Development: Pros, Cons, and Best Practices</h1>
          <p className="text-Content text-sm">
          10 January 2024 • 15 min read <span>April 5, 2022</span>
          </p>
        </div>

        <img
          src={BlogImage}
          alt="Featured"
          className="w-full h-auto mb-8"
        />

       
      </div>
    </div>
  );
}

export default BlogHeader;
