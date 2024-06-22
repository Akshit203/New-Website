import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

function Blogs() {
  const [blogs, setBlogs] = useState([]);

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blogs");

      if (data?.success == true) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center p-10 m-auto mt-10 w-1/2">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => {
            console.log(blog?.userId, localStorage.getItem("userId"));
            return (
              <BlogCard
                key={blog?._id}
                id={blog?._id}
                isUser={localStorage.getItem("userId") === blog?.userId}
                title={blog?.title}
                description={blog?.description}
                image={blog?.image}
                username={blog?.user?.username}
                time={blog?.createdAt}
              />
            );
          })
        ) : (
          <div className="text-xl mt-10">No blogs found</div>
        )}
      </div>
    </>
  );
}

export default Blogs;
