import { Alert } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "uncategorized",
    content: "",
    blogImage: null,
    sections: [],
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, blogImage: file }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleQuillChange = (value) => {
    setFormData((prevData) => ({ ...prevData, content: value }));
  };

  const handleSectionQuillChange = (index, value) => {
    const updatedSections = [...formData.sections];
    updatedSections[index] = { ...updatedSections[index], text: value };
    setFormData((prevData) => ({ ...prevData, sections: updatedSections }));
  };

  const handleSectionFileChange = (index, e) => {
    const file = e.target.files[0];
    const updatedSections = [...formData.sections];
    updatedSections[index] = { ...updatedSections[index], image: file };
    setFormData((prevData) => ({ ...prevData, sections: updatedSections }));
  };

  const addSection = () => {
    setFormData((prevData) => ({
      ...prevData,
      sections: [...prevData.sections, { image: null, text: "" }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fd = new FormData();
    fd.append("title", formData.title);
    fd.append("category", formData.category);
    fd.append("content", formData.content);
    if (formData.blogImage) {
      fd.append("blogImage", formData.blogImage);
    }

    formData.sections.forEach((section, index) => {
      if (section.image) {
        fd.append(`sections[${index}][image]`, section.image);
      }
      if (section.text) {
        fd.append(`sections[${index}][text]`, section.text);
      }
    });

    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message || "An error occurred");
      } else {
        setPublishError(null);
        // navigate(`/post/${data.slug}`);
        setFormData({
          title: "",
          category: "uncategorized",
          content: "",
          blogImage: null,
          sections: [],
        });
        setPreviewImage(null);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/category/getcategory");

      if (!res.ok) {
        // If the response status is not ok, throw an error
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch categories");
      }

      const data = await res.json();
      console.log(data);
      // if (Array.isArray(data)) {
      //   console.log("Received an array.");
      // } else if (typeof data === "object") {
      //   console.log("Received an object.");
      // } else {
      //   console.log("Received data is neither an array nor an object.");
      // }
      setCategories(data); // Update state with fetched data
      setPublishError(null); // Clear any previous errors
    } catch (error) {
      setPublishError(
        error.message || "An error occurred while fetching categories"
      );
    }
  }, []); // Empty dependency array ensures this only runs once on mount

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]); // Add fetchCategories as a dependency

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="w-full max-w-2xl bg-white rounded-lg shadow-lg border px-8 py-6"
      >
        <div className="space-y-6">
          <p className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
            Create a Post
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
              required
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
              <option> Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat.name}>
                  {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Main Image Upload */}
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

          {/* Section for Image and Text */}
          {formData.sections.map((section, index) => (
            <div key={index} className="mb-6">
              <div>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={(e) => handleSectionFileChange(index, e)}
                />
                {section.image && (
                  <img
                    src={URL.createObjectURL(section.image)}
                    alt={`Section ${index + 1} Image Preview`}
                    className="mt-4 w-64 h-64 object-cover rounded-lg"
                  />
                )}
              </div>
              <ReactQuill
                theme="snow"
                value={section.text}
                onChange={(value) => handleSectionQuillChange(index, value)}
                className="mt-4 h-32"
              />
            </div>
          ))}

          {/* Button to Add New Section */}
          <button
            type="button"
            onClick={addSection}
            className="mb-6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add More Section
          </button>

          {/* Submit Button */}
          <button
            className={`w-full ${
              isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
            } focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-white focus:ring-blue-800`}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Create Post"}
          </button>

          {/* Display error if publishError exists */}
          {publishError && (
            <Alert color="failure" className="mt-4">
              {publishError}
            </Alert>
          )}
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
