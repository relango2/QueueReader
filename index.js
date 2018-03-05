const express = require("express");
const authRoutes = require("./routes/authroutes");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./models/user");
const key = require("./Config/keys");
require("./services/passport");

mongoose.connect(key.MongoURI);

const app = express();
app.use(cookieSession({
  maxAge : 30 * 24 * 60 * 60 * 1000,
  keys: [key.cookieKey]

}));

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT);
