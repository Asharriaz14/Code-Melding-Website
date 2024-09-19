function BlogHeader({post}) {
  const { title, category,  image , createdAt,content } = post || {};
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-28"> 
      <div className="max-w-screen-lg mx-auto">
        <div className="mt-20 mb-8">
      <div className="text-Orange mt-4 mb-8 font-medium font-base">
        <p>Company / Code Melding blogs /  {category || 'Uncategorized'}  / <span className='text-[#676767]'> {title || 'No Title Available'}</span> </p>
      </div>
          <h1 className="text-2xl md:text-4xl font-bold mb-2">{title || 'Flutter for Web Development: Pros, Cons, and Best Practices'}</h1>
          <p className="text-Content text-sm">
          {new Date(createdAt).toLocaleDateString()}  • {(content.length /1000).toFixed(0)} min read 
          </p>
        </div>

        <img
          src={`http://localhost:3000/uploads/${image}`}
          alt="Featured"
          className="w-full h-auto mb-8"
        />
      </div>
    </div>
  );
}

export default BlogHeader;
