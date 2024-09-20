import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Category = () => {
  const [formData, setFormData] = useState({
    categoryName: "",
  });
  const [categories, setCategories] = useState([]);
  const [publishError, setPublishError] = useState(null);
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch(`/api/category/getcategory/${categoryId}`);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch categories");
      }

      const data = await res.json();
      setCategories(data);
      setFormData({ categoryName: data.name }); // Set the fetched category name
      setPublishError(null);
    } catch (error) {
      setPublishError(
        error.message || "An error occurred while fetching categories"
      );
    }
  }, [categoryId]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const res = await fetch(`/api/category/getcategory/${categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: formData.categoryName }), // Send the updated category name
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update category");
      }

      const updatedCategory = await res.json();
      setCategories(updatedCategory); // Optionally update your categories state
      setPublishError(null);
      alert("Category updated successfully!");
      navigate("/categories");
    } catch (error) {
      setPublishError(
        error.message || "An error occurred while updating the category"
      );
    }
  };

  return (
    <div>
      <div id="content" role="main" className="w-full max-w-md mx-auto p-6">
        <div className="mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                Category Form
              </h1>
            </div>

            <div className="mt-5">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-y-4">
                  <div>
                    <label
                      htmlFor="categoryName"
                      className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                    >
                      Enter Category Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="categoryName"
                        name="categoryName"
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        required
                        onChange={handleChange}
                        value={formData.categoryName}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  >
                    Update Category
                  </button>
                </div>
                {publishError && (
                  <p className="mt-3 text-sm text-red-600">{publishError}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
