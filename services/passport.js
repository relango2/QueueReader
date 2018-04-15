const keys = require("../Config/keys");
const passport = require("passport");
const GoogleStartegy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

const Users = mongoose.model("Users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Users.findById(id).then(ela => {
    done(null, ela);
  });
});

passport.use(
  new GoogleStartegy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const exi = await Users.findOne({
        googleId: profile.id
      });
      if (exi) done(null, exi);
      else {
        const cre = await new Users({
          googleId: profile.id
        }).save();
        if (cre) done(null, cre);
      }

      //console.log("accessToken,", accessToken);
      //console.log("refreshToken,", refreshToken);
      //console.log("profile,", profile);
    }
  )
);
