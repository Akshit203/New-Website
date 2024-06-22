import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";

function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/blog/user-blogs/${id}`);
      console.log(data.userBlogs);
      if (data?.userBlogs) {
        setBlogs(data?.userBlogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);
  return (
    <div className="flex flex-col items-center p-10 m-auto mt-10 w-1/2">
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => {
          return (
            <BlogCard
              key={blog._id}
              id={blog._id}
              isUser={true}
              title={blog.title}
              description={blog.description}
              image={blog.image}
              username={localStorage.getItem("username")}
              time={blog.createdAt}
            />
          );
        })
      ) : (
        <div className="text-xl mt-10">No blogs found</div>
      )}
    </div>
  );
}

export default MyBlogs;
