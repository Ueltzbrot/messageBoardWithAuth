const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const pool = require("../db/pool");

module.exports = session({
  store: new pgSession({
    pool,
  }),
  secret: process.env.SESSION_SECRET || "cats",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
});
