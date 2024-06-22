import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
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
      const { data } = await axios.post("/api/v1/user/register", {
        username: input.name,
        email: input.email,
        password: input.password,
      });

      if (data.success == true) {
        toast.success("account created successfully");
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className=" flex flex-col justify-between items-center shadow-md mt-36 rounded-md w-1/4 h-4/5 m-auto p-10">
          <h1 className="text-2xl mb-4">Register</h1>
          <input
            className="m-2 border p-1 rounded-sm"
            type="text"
            placeholder="name"
            name="name"
            value={input.name}
            onChange={handleInputChange}
          />
          <input
            className="m-2 border p-1 rounded-sm"
            type="email"
            placeholder="email"
            name="email"
            value={input.email}
            onChange={handleInputChange}
          />
          <input
            className="m-2 border p-1 rounded-sm"
            type="password"
            placeholder="password"
            name="password"
            value={input.password}
            onChange={handleInputChange}
          />
          <button className="bg-blue-600 text-white m-2 p-1 rounded-lg w-24">
            submit
          </button>
          <div
            onClick={() => navigate("/login")}
            className="mt-3 text-sm text-blue-600 underline cursor-pointer"
          >
            Already have account ? please login
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
