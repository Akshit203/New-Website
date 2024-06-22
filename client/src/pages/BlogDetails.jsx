import React, { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export const BlogDetails = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  const [blog, setBlog] = useState();
  const [input, setInput] = useState();

  // we are getting blog details first, will put it inside a form and then edit the form, redirect to main blog page
  const getBlogDetails = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
      setBlog(data?.blog);
      setInput({
        title: data.blog.title,
        description: data.blog.description,
        image: data.blog.image,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetails();
  }, [id]);

  console.log(input);

  const handleInputChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
        title: input?.title,
        description: input?.description,
        image: input?.image,
        user: id,
      });

      if (data?.status == true) {
        toast.success("Blog updated successfully");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="shadow-sm mt-32 border w-[400px] flex flex-col justify-center items-center m-auto h-[400px] rounded-md"
      >
        <div className="font-bold text-[22px] mb-5">Edit Blog</div>
        <input
          type="text"
          placeholder="title"
          name="title"
          value={input?.title}
          onChange={handleInputChange}
          className="border w-[250px] pl-2 p-1 rounded-md m-1"
        />

        <input
          type="text"
          name="description"
          value={input?.description}
          onChange={handleInputChange}
          placeholder="description"
          className="border w-[250px] pl-2 p-1 rounded-md m-1"
        />

        <input
          type="text"
          name="image"
          value={input?.image}
          onChange={handleInputChange}
          placeholder="image"
          className="border w-[250px] pl-2 p-1 rounded-md m-1"
        />

        <button className="p-1 bg-blue-500 mt-5 w-20 text-white rounded-sm">
          Update
        </button>
      </form>
    </>
  );
};
