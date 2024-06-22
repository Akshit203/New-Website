import Header from "./components/Header";

import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Blogs from "./pages/Blogs";
import MyBlogs from "./pages/MyBlogs";
import CreateBlog from "./pages/CreateBlog";
import { BlogDetails } from "./pages/BlogDetails";

import { Toaster } from "react-hot-toast";

import { useSelector } from "react-redux";

function App() {
  const isLogin = useSelector((state) => state.isLogin);
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/blogs"
          element={isLogin ? <Blogs /> : <Navigate to="/" />}
        />
        <Route
          path="/my-blogs"
          element={isLogin ? <MyBlogs /> : <Navigate to="/" />}
        />
        <Route
          path="/blog-details/:id"
          element={isLogin ? <BlogDetails /> : <Navigate to="/" />}
        />
        <Route
          path="/create-blog"
          element={isLogin ? <CreateBlog /> : <Navigate to="/" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
