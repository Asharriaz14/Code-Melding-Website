import { useState, useEffect, useRef } from "react";
import { HiX } from "react-icons/hi";
import PropTypes from "prop-types";

const Category = ({ onClose, fetchCategories }) => {
  const modalRef = useRef();
  const [formData, setFormData] = useState({ categoryName: "" });
  const [publishError, setPublishError] = useState(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({ ...prevData, categoryName: value }));
  };
  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPublishError(null); // Reset error before submitting
    try {
      const res = await fetch("/api/category/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryName: formData.categoryName.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        setPublishError(data.message || "An error occurred");
        return;
      }

      setFormData({ categoryName: "" });
      fetchCategories(); // Fetch updated categories after creation
      onClose(); // Close modal after successful addition
    } catch (error) {
      setPublishError("Something went wrong");
      console.error("Request error:", error);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="category-form-title"
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    >
      <div ref={modalRef} className="bg-white rounded-lg shadow-xl p-6 w-96">
        <div className="flex items-center justify-between mb-4">
          <h1
            id="category-form-title"
            className="text-2xl font-bold text-gray-800"
          >
            Category Form
          </h1>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <HiX className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="categoryName"
            className="block text-sm font-bold ml-1 mb-2"
          >
            Enter Category Name
          </label>
          <input
            type="text"
            id="categoryName"
            name="categoryName"
            className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 transition"
            required
            onChange={handleChange}
            value={formData.categoryName}
          />
          <button
            type="submit"
            className="mt-4 py-3 px-4 w-full bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Add Category
          </button>
          {publishError && (
            <p className="mt-3 text-sm text-red-600">{publishError}</p>
          )}
        </form>
      </div>
    </div>
  );
};

Category.propTypes = {
  onClose: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
};

export default Category;
