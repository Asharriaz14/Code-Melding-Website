import Layout from "../../layout/Layout";
import FaqSection from "./FaqSection";
import HeaderBlogSection from "./HeaderBlog";
import MiidleBlogSection from "./MiddleBlog";
import Newletter from "./Newletter";
import BlogSection from "../home/BlogSection";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

function Blog() {
  const { postBlog } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);

  const fetchPost = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/post/getposts?slug=${postBlog}`);

      if (!res.ok) {
        setError(true);
        setLoading(false);
        return;
      }

      const data = await res.json();
      console.log("data=======", data);

      if (data.posts && data.posts.length > 0) {
        setPost(data.posts[0]);
      } else {
        setError(true);
      }

      setError(false);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }, [postBlog]);

  useEffect(() => {
    fetchPost();
    window.scrollTo(0, 0);
  }, [fetchPost]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 rounded-full animate-spin border-4 border-solid border-yellow-500 border-t-transparent"></div>
      </div>
    );

  if (error) return <div>Error loading the post</div>;

  return (
    <Layout>
      <HeaderBlogSection post={post} />
      <Newletter />
      <MiidleBlogSection post={post} />
      <FaqSection />
      <BlogSection />
    </Layout>
  );
}

export default Blog;
