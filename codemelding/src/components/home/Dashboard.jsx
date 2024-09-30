import { useState, useRef, useEffect } from "react";
import Layout from "../../layout/Layout";
import { useSelector } from "react-redux";
import DefaultAvatar from "../../assets/default_avatar.webp";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Alert, Modal, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const { currentUser, error } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});

  // console.log('currentUser:', currentUser);
  // console.log('currentUser.id:', currentUser._id);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(e.target.files[0]);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  const uploadImage = async () => {
    console.log("uploading image");
    // const storage = getStorage(app);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }
    try {
      dispatch(updateStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User`s profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
        navigate("/register");
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleSignout = async () => {
    try {
      const res = await fetch(`/api/user/signout`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess(data));
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Layout>
        <section className="py-10 my-auto dark:bg-gray-900 mt-12">
          <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
            <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
              <div>
                <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white">
                  Profile
                </h1>
                <h2 className="text-gray-600 text-sm mb-4 dark:text-gray-400">
                  Create Profile
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="w-full rounded-sm  items-center justify-center">
                    <div className="flex items-center space-x-6 justify-center">
                      <div
                        className="shrink-0"
                        onClick={() => filePickerRef.current.click()}
                      >
                        <img
                          id="preview_img"
                          className="h-32 w-32 object-cover rounded-full"
                          src={
                            imageFileUrl ||
                            currentUser?.profilePicture ||
                            DefaultAvatar
                          }
                          alt="Current profile photo"
                        />
                      </div>
                      <label className="block">
                        <span className="sr-only">Choose profile photo</span>
                        <input
                          type="file"
                          onChange={handleImageChange}
                          ref={filePickerRef}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                    <div className="w-full mb-4 mt-6">
                      <label
                        htmlFor="username"
                        className="mb-2 dark:text-gray-300"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="username"
                        placeholder="username"
                        defaultValue={currentUser.username}
                        onChange={handleChange}
                        className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      />
                    </div>
                    <div className="w-full mb-4 lg:mt-6">
                      <label htmlFor="email" className="dark:text-gray-300">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="email"
                        placeholder="email"
                        defaultValue={currentUser.email}
                        onChange={handleChange}
                        className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      />
                    </div>
                  </div>
                  <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                    <div className="w-full mb-4 lg:mt-6">
                      <label htmlFor="password" className="dark:text-gray-300">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="password"
                        placeholder="password"
                        defaultValue={currentUser.password}
                        onChange={handleChange}
                        className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      />
                    </div>
                  </div>
                  <div className="w-full rounded-lg bg-blue-800 text-center p-4 mt-6 mb-4">
                    <button className="bg-blue-600 text-white p-2 rounded-lg w-full">
                      Submit
                    </button>
                  </div>
                </form>
                <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                  <div className="w-full mb-4 mt-6">
                    <Button
                      onClick={() => setShowModal(true)}
                      className="text-red-500  p-2 font-bold   rounded-lg w-full"
                    >
                      Delete Account
                    </Button>
                  </div>
                  <div className="w-full mb-4 lg:mt-6">
                    <button
                      onClick={handleSignout}
                      className=" text-red-900 p-2 font-bold   rounded-lg w-full"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
                {updateUserSuccess && (
                  <Alert color="success" className="mt-5">
                    {updateUserSuccess}
                  </Alert>
                )}
                {error && (
                  <Alert color="failure" className="mt-5">
                    {error}
                  </Alert>
                )}
                {updateUserError && (
                  <Alert color="failure" className="mt-5">
                    {updateUserError}
                  </Alert>
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
                        Are you sure you want to delete your id?
                      </h3>
                      <div className="flex justify-center gap-4">
                        <Button
                          color="failure"
                          className="bg-red-600"
                          onClick={handleDeleteUser}
                        >
                          {"Yes, I'm sure"}
                        </Button>
                        <Button
                          color="gray"
                          onClick={() => setShowModal(false)}
                        >
                          No, cancel
                        </Button>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
}

export default Dashboard;
