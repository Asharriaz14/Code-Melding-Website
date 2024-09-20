import { Button, Modal } from "flowbite-react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { FaEdit } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import Category from "./Category";

const DisplayCategory = () => {
  const [categories, setCategories] = useState([]);
  const [publishError, setPublishError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState("");

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/category/getcategory");
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch categories");
      }
      const data = await res.json();
      setCategories(data);
      setPublishError(null);
    } catch (error) {
      setPublishError(
        error.message || "An error occurred while fetching categories"
      );
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleDeleteCategory = async () => {
    try {
      const res = await fetch(
        `/api/category/deletepost/${categoryIdToDelete}`,
        { method: "DELETE" }
      );
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete category");
      }
      fetchCategories();
      setShowDeleteModal(false);
    } catch (error) {
      setPublishError(
        error.message || "An error occurred while deleting the category"
      );
    }
  };

  // Memoized table rows for better performance
  const categoryRows = useMemo(
    () =>
      categories.map((cat, index) => (
        <tr key={cat._id} className="border-b">
          <td className="px-6 py-4 text-sm font-medium text-gray-900">
            {index + 1}
          </td>
          <td className="text-sm text-gray-900 font-light px-6 py-4">
            {cat.name}
          </td>
          <td className="text-sm text-gray-900 font-light px-6 py-4">
            <Link to={`/update-category/${cat._id}`}>
              <FaEdit size={20} />
            </Link>
          </td>
          <td className="text-sm text-gray-900 font-light px-6 py-4">
            <button
              onClick={() => {
                setShowDeleteModal(true);
                setCategoryIdToDelete(cat._id);
              }}
            >
              <MdDeleteForever size={20} />
            </button>
          </td>
        </tr>
      )),
    [categories]
  );

  return (
    <div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="py-2 inline-block min-w-full">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm text-left font-medium text-gray-900 px-6 py-4"
                    >
                      <button onClick={() => setShowAddModal(true)}>
                        Add New Category
                      </button>
                    </th>
                  </tr>
                  <tr>
                    <th className="text-sm text-left font-medium text-gray-900 px-6 py-4">
                      No
                    </th>
                    <th className="text-sm text-left font-medium text-gray-900 px-6 py-4">
                      Category
                    </th>
                    <th className="text-sm text-left font-medium text-gray-900 px-6 py-4">
                      Edit
                    </th>
                    <th className="text-sm text-left font-medium text-gray-900 px-6 py-4">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>{categoryRows}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add Category Modal */}
      <Modal show={showAddModal} onClose={() => setShowAddModal(false)}>
        <Category
          onClose={() => setShowAddModal(false)}
          fetchCategories={fetchCategories}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        dismissible
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        className="flex justify-center items-center m-auto"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this category?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                className="bg-red-600"
                onClick={handleDeleteCategory}
              >
                Yes, I`m sure
              </Button>
              <Button color="gray" onClick={() => setShowDeleteModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DisplayCategory;
