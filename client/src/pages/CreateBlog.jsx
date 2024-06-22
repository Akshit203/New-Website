import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";

function CreateBlog() {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate("/");
  const [input, setInput] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleInputChange = (e) => {
    setInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/blog/create-blog", {
        title: input.title,
        description: input.description,
        image: input.image,
        userId,
      });

      console.log(data);
      if (data?.status == true) {
        toast.success("Blog created successfully");
        navigate("/blogs");
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
        <div className="font-bold text-[22px] mb-5">Create Blog</div>
        <input
          type="text"
          placeholder="title"
          name="title"
          value={input.title}
          className="border w-[250px] pl-2 p-1 rounded-md m-1"
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="description"
          placeholder="description"
          value={input.description}
          className="border w-[250px] pl-2 p-1 rounded-md m-1"
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="image"
          placeholder="image"
          value={input.image}
          className="border w-[250px] pl-2 p-1 rounded-md m-1"
          onChange={handleInputChange}
        />

        <button className="p-1 bg-blue-500 mt-5 w-20 text-white rounded-sm">
          Add
        </button>
      </form>
    </>
  );
}

export default CreateBlog;
