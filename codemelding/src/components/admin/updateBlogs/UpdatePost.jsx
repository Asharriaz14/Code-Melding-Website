import { Alert } from "flowbite-react";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function UpdatePost() {
  const [formData, setFormData] = useState({
    title: "",
    category: "uncategorized",
    content: "",
    blogImage: null,
  });
  const [previewImage, setPreviewImage] = useState(null); // State to hold image preview
  const [publishError, setPublishError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Added for submit button loading state
  const { postId } = useParams();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();

        if (!res.ok) {
          setPublishError(data.message);
          return;
        }
        console.log("Fetched post data:", data.posts[0]);

        if (res.ok) {
          setFormData(data.posts[0]);
          // Construct the full URL for the image
          const imageBaseUrl = "http://localhost:3000/uploads/"; // Update with your actual base URL
          setPreviewImage(`${imageBaseUrl}${data.posts[0].image}`);
          setPublishError(null);
        }
      } catch (error) {
        setPublishError(error.message);
      }
    };
    fetchPost();
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  console.log("checking data====", formData);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, blogImage: file }));
    setPreviewImage(URL.createObjectURL(file)); // Create and set image preview URL
  };

  const handleQuillChange = (value) => {
    setFormData((prevData) => ({ ...prevData, content: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    // Log formData to check if _id is present
    console.log("Submitting formData:", formData);

    const fd = new FormData();
    fd.append("title", formData.title);
    fd.append("category", formData.category);
    fd.append("content", formData.content);
    if (formData.blogImage) {
      fd.append("blogImage", formData.blogImage);
    }

    try {
      const res = await fetch(
        `/api/post/updatepost/${formData._id}/${currentUser._id}`,
        {
          method: "PUT",
          body: fd,
        }
      );
      console.log("API response:", res);
      const data = await res.json();
      console.log("data=======", data);
      if (!res.ok) {
        setPublishError(data.message || "An error occurred");
      } else {
        setPublishError(null);
        // navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="w-full max-w-2xl bg-white rounded-lg shadow-lg border px-8 py-6"
      >
        <div className="space-y-6">
          <p className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
            Update Post
          </p>

          {/* Title Input */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Blog Title
            </label>
            <input
              placeholder="Enter title"
              name="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required // Title is required
            />
          </div>

          {/* Category Select */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Select Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3"
            >
              <option value="uncategorized">Select a Category</option>
              <option value="javascript">Javascript</option>
              <option value="react js">React JS</option>
            </select>
          </div>

          {/* File Upload and Preview */}
          <div className="flex flex-col items-center justify-center border-2 border-teal-500 border-dotted p-4 rounded-lg">
            <input
              type="file"
              accept="image/*"
              name="blogImage"
              onChange={handleFileChange}
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Image Preview"
                className="mt-4 w-64 h-64 object-cover rounded-lg"
              />
            )}
          </div>

          {/* ReactQuill for Content */}
          <div>
            <ReactQuill
              theme="snow"
              className="h-72 mb-6"
              value={formData.content}
              onChange={handleQuillChange}
            />
          </div>

          {/* Submit Button */}
          <button
            className={`w-full ${
              isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
            } focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-white focus:ring-blue-800`}
            type="submit"
            disabled={isSubmitting} // Disable button while submitting
          >
            {isSubmitting ? "Submitting..." : "Update Post"}
          </button>
        </div>

        {/* Display error if publishError exists */}
        {publishError && (
          <Alert color="failure" className="mt-4">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}

export default UpdatePost;
