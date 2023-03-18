import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";

dotenv.config();
const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((error) => console.log(error));

// ROUTES
// app.get("/test", (req, res) => {
//   res.send("HELLO WORLD!");
// });
app.use("/users", userRoutes);

app.listen("5000", () => {
  console.log(`Server running on port: 5000!`);
});
