const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/userModel.js");
const userRouter = require("./routes/userRoutes.js");

const cors = require("cors");

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connection successful...");

    app.listen(process.env.PORT || 8000, (err) => {
      if (err) console.log("Error", err);

      console.log(`Running Server at Port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error:", error);
  });

app.use(userRouter);
