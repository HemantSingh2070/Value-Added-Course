const Router = require("express").Router();

const User = require("../models/user");

Router.get("/", (req, res) => {
  return res.render("form");
});
Router.post("/", async (req, res) => {
  const { name, email, age } = req.body;
  const user = new User({ name, email, age });
  try {
    await user.save();
    return res.render("welcome", { name, age, error: false });
  } catch (error) {
    console.error("Error saving user:", error);
    return res.status(500).render("form", {
      error:
        "An error occurred while saving the user or due to duplicate email .Please try again.",
    });
  }
});

module.exports = Router;
