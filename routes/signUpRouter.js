const { Router } = require("express");
const signUpRouter = Router();
const { getSignUpForm, createUser, validPassword } = require("../controllers/signUpController");

signUpRouter.get("/", getSignUpForm);
signUpRouter.post("/", validPassword,
  createUser
);

module.exports = signUpRouter;
