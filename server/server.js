const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

const publicPath = path.join(__dirname, "..", "public");
const port = process.env.PORT || 8081;

app.get("/api/test", (req, res) => {
  res.send("the api is up!");
});

app.use(express.static(publicPath));
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days before it expires
    keys: [keys.cookieKey] // key to encrypt our cookie, can be any random string of characters; can add multiple keys as an additional layer of security
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/apiRoutes")(app);
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log("Server is up!");
});
