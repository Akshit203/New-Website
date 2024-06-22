const userModel = require("../models/userModel");
const colors = require("colors");

const brcrypt = require("bcrypt");

exports.test = (req, res) => {
  return res.status(200).send("test route");
};

exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // if fields are empty
    if (!username || !email || !password) {
      // console.log("please fill all fields");
      return res.send({
        success: false,
        message: "please fill all fields",
      });
    }

    // if user already exist
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.send({
        success: false,
        message: "user already exist",
      });
    }

    // lets hash password of user before saving to db, here 10 is salt
    const hashPassword = await brcrypt.hash(password.toString(), 10);

    // save new user in database
    const user = new userModel({ username, email, password: hashPassword });
    await user.save();

    return res.status(201).send({
      success: true,
      message: "new user created",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      error,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.send({
      count: users.length,
      success: true,
      users,
    });
  } catch (error) {
    console.log(error.red);
    return res.status(500).send({
      success: false,
      message: "some error to get all users",
      error,
    });
  }
};

exports.getUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).send({
        status: false,
        message: "user id not found",
      });
    }

    return res.status(200).send({
      status: true,
      message: "user found",
      user,
    });
  } catch (error) {
    return res.send({
      status: false,
      message: "some error when we try to get a user by id",
    });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      // console.log("input fields are empty");
      return res.send({
        success: false,
        message: "input fields are empty",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      console.log("email not found");
      return res.send({
        success: false,
        message: "email not found",
      });
    }

    // checking password, it returns true or false
    const isMatch = await brcrypt.compare(password.toString(), user.password);

    if (!isMatch) {
      return res.send({
        success: false,
        message: "password incorrect",
      });
    }

    return res.status(200).send({
      success: true,
      message: "login successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
    });
  }
};
