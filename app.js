const express = require("express");
const app = express();
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");

const session = require("./config/session");
const passport = require("passport");
require("./config/passport")(passport);

const port = process.env.PORT || 3000;

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: false }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", require("./routes/indexRouter"));
app.use("/sign-up", require("./routes/newRouter"));

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});

app.listen(port, (error) => {
  // This is important!
  // Without this, any startup errors will silently fail
  // instead of giving you a helpful error message.
  if (error) {
    throw error;
  }
  console.log(`Auth template listening on port ${port}!`);
});
