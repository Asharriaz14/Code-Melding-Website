import { Button, Modal } from "flowbite-react";
import { useEffect, useState, useMemo } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { fetchBlogs } from "../../../redux/user/blogSlice";
import { useDispatch, useSelector } from "react-redux";

function DisplayBlogs() {
  const dispatch = useDispatch();
  const { blogs, error, loading } = useSelector((state) => state.blog);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!blogs || blogs.length === 0) {
      // Only fetch if blogs are not already in state
      dispatch(fetchBlogs());
    }
  }, [dispatch, blogs]);

  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  const handleDeletePost = async () => {
    setShowModal(false); // Close the modal

    try {
      // Make the delete request
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json(); // Parse the response data

      if (!res.ok) {
        // Handle the error
        console.error("Failed to delete post:", data.message);
      } else {
        // After deletion, re-fetch the updated blogs from Redux
        dispatch(fetchBlogs());
        console.log("Post successfully deleted.");
      }
    } catch (error) {
      // Handle any error that occurs during the fetch process
      console.error("Error deleting post:", error.message);
    }
  };

  // Table rows for each blog post
  const categoryRows = useMemo(
    () =>
      blogs.map((post) => (
        <tr key={post._id}>
          <td className="px-6 py-4 ">
            {new Date(post.updatedAt).toLocaleDateString()}
          </td>
          <td className="px-6 py-4 ">
            <Link to={`/post/${post.slug}`}>
              <img
                src={`http://localhost:3000/uploads/${post.image}`}
                alt={post.title}
                className="w-20 h-10"
              />
            </Link>
          </td>
          <td className="px-6 py-4 ">
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
          </td>
          <td className="px-6 py-4 ">{post.category}</td>
          <td className="px-6 py-4 ">
            <button
              onClick={() => {
                setShowModal(true);
                setPostIdToDelete(post._id); // Set the ID of the post to be deleted
              }}
              className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
            >
              Delete
            </button>
          </td>
          <td className="px-6 py-4 ">
            <Link
              to={`/update-post/${post._id}`}
              className="ml-2 px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
            >
              Edit
            </Link>
          </td>
        </tr>
      )),
    [blogs]
  );

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      {currentUser && currentUser.isAdmin ? (
        <>
          {blogs.length > 0 ? (
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="py-2 inline-block min-w-full">
                  <div className="overflow-hidden">
                    <table className="min-w-full">
                      <thead className="border-b">
                        <tr>
                          <th className="text-sm text-left font-medium text-gray-900 px-6 py-4">
                            Date updated
                          </th>
                          <th className="text-sm text-left font-medium text-gray-900 px-6 py-4">
                            Post Image
                          </th>
                          <th className="text-sm text-left font-medium text-gray-900 px-6 py-4">
                            Post Title
                          </th>
                          <th className="text-sm text-left font-medium text-gray-900 px-6 py-4">
                            Category
                          </th>
                          <th className="text-sm text-left font-medium text-gray-900 px-6 py-4">
                            Delete
                          </th>
                          <th className="text-sm text-left font-medium text-gray-900 px-6 py-4">
                            Edit
                          </th>
                        </tr>
                      </thead>
                      <tbody>{categoryRows}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">You have no posts yet.</p>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">
          You are not authorized to view this page.
        </p>
      )}

      <Modal
        dismissible
        show={showModal}
        onClose={() => setShowModal(false)}
        className="flex justify-center items-center m-auto"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                className="bg-red-600"
                onClick={handleDeletePost} // Handle the delete operation
              >
                Yes, I’m sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DisplayBlogs;
