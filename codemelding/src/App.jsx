import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Blog from "./components/blog/Blog";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RegistrationForm from "./components/auth/Register";
import Login from "./components/auth/Signin";
import Dashboard from "./components/home/Dashboard";
import UserRoute from "./components/home/PrivateRoute";
import Adminside from "./components/admin/Home";
import PostPage from "./components/admin/createpost/Indexs";
import AdminRoute from "./components/admin/AdminRoute";
import DispalyAllBlogs from "./components/admin/allBlogs/Index";
import AdminDashboard from "./components/admin/dashboard/Index";
import UpdatePost from "./components/admin/updateBlogs/Index";
import DisplayBlog from "./components/blog/DisplayAll";
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Home />} />
          <Route path="/blog/:postBlog" element={<Blog />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ss" element={<Adminside />} />

          <Route element={<UserRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<Adminside />} />
            <Route path="/createpost" element={<PostPage />} />
            <Route path="/allblogs" element={<DispalyAllBlogs />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/update-post/:postId" element={<UpdatePost />} />
          </Route>
          <Route path="/blog" element={<DisplayBlog />} />
          {/* <Route path="/admin" element={<AdminDashboard />} />   */}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
