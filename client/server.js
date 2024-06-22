const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const path = require('path')

// config env, so we can get data from .env file
dotenv.config();

// import routes
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");



// connecting to mongo db database
connectDB();

// here we are initializing our app
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

app.use(express.static(path.join(__dirname, "./client/build")))

app.get('*',function(req, res){
  res.sendFile(path.join(__dirname, "./client/build/index.html")
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`sever running on port ${PORT}`);
});
