import express from "express";
const Router = express.Router();

Router.get("/", (_, res) => {
  return res.render("home");
});

export default Router;
