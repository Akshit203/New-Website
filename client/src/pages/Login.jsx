import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";

import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  // form input
  const handleInputChange = (e) => {
    setInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/login", {
        email: input.email,
        password: input.password,
      });

      if (data.success == true) {
        localStorage.setItem("userId", data?.user?._id);
        localStorage.setItem("username", data?.user?.username);
        dispatch(authActions.login());
        toast.success("login successfully");
        navigate("/blogs");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col justify-between items-center shadow-md mt-48 rounded-md w-1/4 h-4/5 m-auto p-10">
        <h1 className="text-2xl mb-4">Login</h1>
        <input
          className="m-2 border p-1 rounded-sm"
          type="email"
          placeholder="email"
          name="email"
          onChange={handleInputChange}
        />
        <input
          className="m-2 border p-1 rounded-sm"
          type="password"
          placeholder="password"
          name="password"
          onChange={handleInputChange}
        />
        <button className="bg-blue-600 text-white m-2 p-1 rounded-lg w-24">
          submit
        </button>
        <div
          onClick={() => navigate("/new-password")}
          className="mt-3 text-sm text-blue-600 underline cursor-pointer"
        >
          forgot password ?
        </div>
      </div>
    </form>
  );
}

export default Login;
