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
    (accessToken, refreshToken, profile, done) => {
      Users.findOne({ googleId: profile.id }).then(exi => {
        if (exi) {
          done(null, exi);
        } else {
          new Users({ googleId: profile.id })
            .save()
            .then(cre => done(null, cre));
        }
      });

      console.log("accessToken,", accessToken);
      console.log("refreshToken,", refreshToken);
      console.log("profile,", profile);
    }
  )
);
