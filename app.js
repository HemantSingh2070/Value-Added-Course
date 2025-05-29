import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

import homeRouter from "./routes/home.js";
import formRouter from "./routes/form.js";

// For __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Set view engine and views directory
app.set("view engine", "ejs"); // or pug, hbs, etc.
app.set("views", path.join(__dirname, "views"));

app.listen(PORT, () => {
  console.log(`Server is running.`);
});

app.use("/", homeRouter);
app.use("/form", formRouter);
