const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      // res.redirect("/dashboard");
      res.redirect("/dashboard");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout(); // takes the cookie with id and kills it
    res.redirect("/");
    // res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user); // if logged out, req.user will be blank as will the screen
  });
};
