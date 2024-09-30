import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Blog from "./components/blog/Blog";
import RegistrationForm from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/home/Dashboard";
import UserRoute from "./components/home/PrivateRoute";
import PostPage from "./components/admin/createpost/Indexs";
import AdminRoute from "./components/admin/AdminRoute";
import DispalyAllBlogs from "./components/admin/allBlogs/Index";
import AdminDashboard from "./components/admin/dashboard/Index";
import UpdatePost from "./components/admin/updateBlogs/Index";
import DisplayBlog from "./components/blog/DisplayAll";
import Categories from "./components/admin/Categories/Index";
import UpdateCategory from "./components/admin/updateCategories/Index";
import Services from "./components/services/Index";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Home />} />
        <Route path="/blog/:postBlog" element={<Blog />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />

        <Route element={<UserRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/createpost" element={<PostPage />} />
          <Route path="/all-blogs" element={<DispalyAllBlogs />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />
          <Route path="/categories" element={<Categories />} />
          <Route
            path="/update-category/:categoryId"
            element={<UpdateCategory />}
          />
        </Route>
        <Route path="/blog" element={<DisplayBlog />} />
        <Route path="/android" element={<Services />} />
        {/* <Route path="/admin" element={<AdminDashboard />} />   */}
      </Routes>
    </Router>
  );
}
