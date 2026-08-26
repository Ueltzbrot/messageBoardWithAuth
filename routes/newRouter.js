const { Router } = require("express");
const newRouter = Router();
const { getSignUpForm, createUser } = require("../controllers/newController");

newRouter.get("/", getSignUpForm);
newRouter.post("/", createUser);

module.exports = newRouter;
