const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

const homeRouter = require("./routes/home");
const formRouter = require("./routes/form");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://localhost:27017/mydatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.set("view engine", "ejs");
app.set("views", "./view");

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use("/", homeRouter);
app.use("/form", formRouter);
