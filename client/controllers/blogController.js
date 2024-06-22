const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");
const colors = require("colors");

exports.getAllBlogsController = async (req, res) => {
  try {
    // const blogs = await blogModel.find({}).populate("user");
    const blogs = await blogModel.find({});
    if (!blogs) {
      return res.send({
        success: false,
        message: "no blogs found",
      });
    }
    return res.status(200).send({
      success: true,
      blogCount: blogs.length,
      message: "blogs list",
      blogs,
    });
  } catch (error) {
    return res.send(500).send({
      success: false,
      message: "some error while getting all blogs",
      error,
    });
  }
};

exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, userId } = req.body;

    if (!title || !description || !image || !userId) {
      return res.send({
        status: false,
        message: "please fill all fields",
      });
    }

    // checking if user id is valid or not
    const isValidUser = await mongoose.Types.ObjectId.isValid(userId);

    if (!isValidUser) {
      return res.send({
        status: false,
        name: "cast error",
        message: "Cast to ObjectId failed",
      });
    }

    const existingUser = await userModel.findById(userId);

    if (!existingUser) {
      return res.status(404).send({
        status: false,
        message: "user not found",
      });
    }

    const blog = new blogModel({ title, description, image, userId });

    await blog.save();

    return res.status(201).send({
      status: true,
      message: "blog added successfully",
      blog,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: "some error when we try to add a blog",
      error,
    });
  }
};

exports.updateBlogContoller = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(201).send({
      status: true,
      message: "blog updated successfully",
      blog,
    });
  } catch (error) {
    return res.send({
      status: false,
      message: "some error when we try to update blog",
      error,
    });
  }
};

exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);

    if (!blog) {
      return res.status(404).send({
        status: false,
        message: "blog not found",
      });
    }

    return res.send({
      status: true,
      message: "blog found",
      blog,
    });
  } catch (error) {
    return res.send({
      status: false,
      message: "some error when we try to get a blog",
      error,
    });
  }
};

exports.deleteBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const blog = await blogModel.findByIdAndDelete(id);

    if (!blog) {
      return res.send({
        status: false,
        message: "blog not found",
      });
    }
    return res.send({
      status: true,
      message: "blog deleted successfully",
      blog,
    });
  } catch (error) {
    return res.send({
      status: false,
      message: "some error when we try to delete blog",
      error,
    });
  }
};

exports.getUserBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    // const userBlogs = await userModel.findById(id).populate("blogs");
    const userBlogs = await blogModel.find({
      userId: id,
    });

    if (!userBlogs) {
      return res.send({
        status: false,
        message: "no blogs found for this user id",
      });
    }

    return res.status(200).send({
      status: true,
      message: "blogs found",
      userBlogs,
    });
  } catch (error) {
    return res.send({
      status: false,
      message: "some error when try to get user blog",
      error,
    });
  }
};
