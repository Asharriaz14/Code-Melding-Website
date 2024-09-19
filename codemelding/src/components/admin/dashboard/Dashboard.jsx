import { Button, Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [startIndex, setStartIndex] = useState(0); // Start with 0
  const limit = 2; // Limit of 2 posts per fetch
  const [postCount, setPostCount] = useState(0); // Track total posts available
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      if (!currentUser || !currentUser.isAdmin) return;

      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}&limit=${limit}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts((prev) => [...prev, ...data.posts]);
          setPostCount(data.totalPosts); // Track total number of posts available

          // If fewer than 'limit' posts are fetched or no more posts available, hide the showMore button
          if (data.posts.length < limit || userPosts.length + data.posts.length >= data.totalPosts) {
            setShowMore(false);
          }
        } else {
          console.error('Failed to fetch posts:', data.message);
        }
      } catch (error) {
        console.error('Error fetching posts:', error.message);
      }
    };

    fetchPosts();
  }, [currentUser, startIndex]); // Dependency on startIndex for fetching more posts

  const handleShowMore = () => {
    setStartIndex((prevIndex) => prevIndex + limit); // Increment startIndex by the number of posts fetched
  };

  const handleDeletePost = async () => {
    setShowModal(false); // Close the modal

    try {
      const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`, {
        method: 'DELETE',
      });

      const data = await res.json(); // Parse the response data

      if (!res.ok) {
        // Log a detailed error message if the response is not OK
        console.error('Failed to delete post:', data.message);
      } else {
        // Update the state to remove the deleted post
        setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
        console.log('Post successfully deleted.');
      }
    } catch (error) {
      // Log any error that occurs during the fetch process
      console.error('Error deleting post:', error.message);
    }
  };

  return (
    <div>
      {currentUser && currentUser.isAdmin ? (
        <>
          {userPosts.length > 0 ? (
            <>
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date updated</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post Image</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userPosts.map((post) => (
                    <tr key={post._id}>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(post.updatedAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/post/${post.slug}`}>
                          <img
                            src={`http://localhost:3000/uploads/${post.image}`}
                            alt={post.title}
                            className="w-20 h-10"
                          />
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{post.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => {
                            setShowModal(true);
                            setPostIdToDelete(post._id);
                          }}
                          className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                        >
                          Delete
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/update-post/${post._id}`}
                          className="ml-2 px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {showMore && userPosts.length < postCount && (
                <button
                  onClick={handleShowMore}
                  className="ml-2 px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                >
                  Show More
                </button>
              )}
            </>
          ) : (
            <p className="text-center text-gray-500">You have no posts yet.</p>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">You are not authorized to view this page.</p>
      )}

      <Modal dismissible show={showModal} onClose={() => setShowModal(false)} className="flex justify-center items-center m-auto">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" className="bg-red-600" onClick={handleDeletePost}>
                Yes, I'm sure
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

export default Dashboard;
