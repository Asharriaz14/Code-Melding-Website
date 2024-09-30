import Layout from "../layout/Layout";
import InformationBox from "./InformationBox";
import { useCallback, useEffect, useState } from "react";
import Dashboard from "../Categories/DisplayCategory";
import Blogs from "../allBlogs/DisplayBlogs";

function Index() {
  const [blogData, setBlogData] = useState(null);
  const handleRequest = useCallback(async () => {
    try {
      const res = await fetch("/api/post/getposts");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      console.log("blog data ==== ", data);
      setBlogData(data);
    } catch (error) {
      console.log("Error:", error.message);
    }
  }, []);

  useEffect(() => {
    handleRequest();
  }, [handleRequest]);

  return (
    <Layout>
      <InformationBox blogData={blogData} />
      <div className="my-12">
        <div className="font-bold text-xl m-6">Blogs</div>
        <Blogs />
      </div>
      <div className="my-12">
        <div className="font-bold text-xl m-6">Categories</div>
        <Dashboard />
      </div>
    </Layout>
  );
}

export default Index;
