const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const { body, validationResult, matchedData } = require("express-validator");

async function getSignUpForm(req, res) {
  res.render("sign-up");
}


async function createUser(req, res, next) {
  try {
    const { username, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.createUser(username,hashedPassword, firstName, lastName);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
}

const validateSignUp = [
   body("username").trim().notEmpty().withMessage("Username darf nicht leer sein"),
  body("firstName").trim().notEmpty().withMessage("First Name darf nicht leer sein"),
  body("lastName").trim().notEmpty().withMessage("last Name du weiß schon"),
   body('password').isLength({ min: 5 }).withMessage("mindestens 5"),
  body('confirmPassword').custom((value, { req }) => {
    return value === req.body.password;

  })];


const validPassword = [
  validateSignUp,
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("sign-up", {
        errors: errors.array(),
      });
    }

    next();
  },
];


module.exports = {
  getSignUpForm,
  createUser,
  validPassword,
};
