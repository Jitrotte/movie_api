const jwtSecret = "your_jwt_secret"; // Same as key used in JWTSTRATEGY

const jwt = require("jsonwebtoken"),
  passport = require("passport");

require("./passport.js");

let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username,
    expiresIn: "7d", // Specifies that token expires in 7 days
    algorithm: "HS256",
  });
};

module.exports = (router) => {
  router.post("/login", (req, res) => {
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: "Invalid Credentials",
          user: user,
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
};
