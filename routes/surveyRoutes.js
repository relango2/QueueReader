const _ = require("lodash");
const {Path} = require("path-parser");
const {URL} = require("url");
const mongoose = require("mongoose");
const Survey = mongoose.model("surveys");
const requireLogin = require("../Middlewares/requireLogin");
const requireCredits = require("../Middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

module.exports = app => {

  app.get("/api/queue", requireLogin, async (req, res) => {
    const surveys = await Survey.find({_user: req.user.id}).select({recipients: false});
    res.send(surveys);
  });

  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({_user: req.user.id}).select({recipients: false});
    res.send(surveys);
  });

  app.post("/api/surveys", requireLogin, async (req, res) => {
    const {title, subject, body} = req.body;

    const survey = new Survey({title, subject, body, _user: req.user.id, dateSent: Date.now()});

    try {
      const sur = await survey.save();
      res.send(sur);
    } catch (err) {
      res.status(422).send(err);
    }

  });
};
