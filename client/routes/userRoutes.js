const express = require("express");
const {
  test,
  getAllUsers,
  registerController,
  loginController,
  getUserByIdController,
} = require("../controllers/userController");

const router = express.Router();

router.get("/test", test);

// get all users || GET request
router.get("/all-users", getAllUsers);

router.get("/get-user/:id", getUserByIdController);

// register or create user || POST
router.post("/register", registerController);

// login user || POST
router.post("/login", loginController);

module.exports = router;
