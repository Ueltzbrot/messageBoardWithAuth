const db = require("../db/queries");
const bcrypt = require("bcryptjs");

async function getSignUpForm(req, res) {
  res.render("sign-up");
}

async function createUser(req, res, next) {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.createUser(username, hashedPassword);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getSignUpForm,
  createUser,
};
