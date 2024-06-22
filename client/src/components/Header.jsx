import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

function Header() {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.isLogin);
  const dispatch = useDispatch();

  const handleLogout = () => {
    toast.success("logout successfully");
    dispatch(authActions.logout());
    localStorage.clear();
  };

  return (
    <div className="p-4 bg-blue-500 text-white flex justify-between items-center top-0 fixed w-full z-[1]">
      <div className="text-xl font-bold">Blog App</div>
      {isLogin && (
        <div className="flex text-lg opacity-85">
          <div className="m-2 cursor-pointer">
            <Link to="/blogs">Blogs</Link>
          </div>
          <div
            className="m-2 cursor-pointer"
            onClick={() => navigate("/my-blogs")}
          >
            My Blogs
          </div>
          <div
            className="m-2 cursor-pointer"
            onClick={() => navigate("/create-blog")}
          >
            Create Blog
          </div>
        </div>
      )}
      <div className="flex justify-center items-center m-2">
        {!isLogin && (
          <>
            <div className="cursor-pointer m-2">
              <Link to="/login">Login</Link>
            </div>
            <div className="cursor-pointer m-2">
              <Link to="/register">Register</Link>
            </div>
          </>
        )}
        {isLogin && (
          <div onClick={handleLogout} className="cursor-pointer m-2">
            <Link to="/login">Logout</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
