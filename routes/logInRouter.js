const { Router } = require("express");
const passport = require("passport");
const logInRouter = Router();
const { getLogin } = require("../controllers/logInController");

logInRouter.get("/", getLogin);

logInRouter.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/messages",
    failureRedirect: "/",
    failureMessage: true,
  })
);

logInRouter.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = logInRouter;
