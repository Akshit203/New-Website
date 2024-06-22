const express = require("express");
const {
  getAllBlogsController,
  createBlogController,
  updateBlogContoller,
  getBlogByIdController,
  deleteBlogController,
  getUserBlogController,
} = require("../controllers/blogController");

//router
const router = express.Router();

//routes
router.get("/all-blogs", getAllBlogsController);

router.post("/create-blog", createBlogController);

router.put("/update-blog/:id", updateBlogContoller);

router.get("/get-blog/:id", getBlogByIdController);

router.delete("/delete-blog/:id", deleteBlogController);

router.get("/user-blogs/:id", getUserBlogController);

module.exports = router;
