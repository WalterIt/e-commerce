import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/user.js";
import authRoute from "./routes/auth.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((error) => console.log(error));

// ROUTES
// app.get("/test", (req, res) => {
//   res.send("HELLO WORLD!");
// });
app.use("/auth", authRoute);
app.use("/users", userRoutes);

app.listen("5000", () => {
  console.log(`Server running on port: 5000!`);
});
