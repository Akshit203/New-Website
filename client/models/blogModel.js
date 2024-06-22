const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    image: {
      type: String,
      required: [true, "image is required"],
    },
    // user: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "User",
    //   require: [true, "user is required"],
    // },
    userId: {
      type: mongoose.Types.ObjectId,
      require: [true, "user id is required"],
    },
  },
  { timestamps: true }
);

const blogModel = new mongoose.model("Blog", blogSchema);

module.exports = blogModel;
