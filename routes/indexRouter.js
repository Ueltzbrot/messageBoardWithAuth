const { Router } = require("express");
const passport = require("passport");
const indexRouter = Router();
const { getIndex } = require("../controllers/indexController");

indexRouter.get("/", getIndex);

indexRouter.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureMessage: true,
  })
);

indexRouter.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = indexRouter;
