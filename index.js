const http = require("http");
const socketIo = require("socket.io");
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const key = require("./Config/keys");
var kafka = require("kafka-node");
require("./models/user");
require("./models/Survey");
require("./services/passport");

mongoose.connect(key.MongoURI);

const app = express();
//console.log(app);
app.use(bodyParser.json());
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [key.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authroutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

if ((process.env.NODE_ENV = "production")) {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  //app.use(express.static("client/build"));

  app.use(express.static("client/build"));
  //app.use(express.static(path.join(__dirname, "../client/build")));
  // Express will serve up the index.html file
  // if it doesn't recognize the route

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", socket => {
  console.log("New client connected"),
  setInterval(() => getApiAndEmit(socket), 10000);
  socket.on("disconnect", () => console.log("Client disconnected"));
});

io.on('error', function() {});

var outputObj = {};

var HighLevelConsumer = kafka.HighLevelConsumer;
var Client = kafka.Client;

//
var client = new Client("54.183.204.91");
var topics = [
  {
    topic: "test_topic"
  }
];

var options = {
  autoCommit: true,
  fetchMaxWaitMs: 1000,
  fetchMaxBytes: 1024 * 1024,
  encoding: "buffer"
};

//initializing the consumer
var consumer = new HighLevelConsumer(client, topics, options);

//consumer error handler
consumer.on("message", function(message) {
  //pass the message to the parser
  handleMessage(message);
  console.log('on Message');
});

function handleMessage(message) {
  //extract the value from the kafka message
  var value = JSON.parse(message.value);
  // extract key from the Kafka message
  var key = new Buffer(message.key).toString('ascii');
  // extract offset from the Kafka message
  var offset = message.offset;
  console.log(offset);
  var keyCombo = key + "_" + offset;
  // record the message key as current standing in the outputObj object
  outputObj[keyCombo] = value.replace(/'/g, '"');
} // handleMessage

//Consumer error hadler
consumer.on('error', function(err) {
  //log the error received
  console.log('error', err);
});

//Socket emitter
const getApiAndEmit = async socket => {
  //socket emiting the outputObj object with the keyword FromAPI
  socket.emit("FromAPI", outputObj);
  console.log('emmiter');
  console.log(outputObj);
};

//server listening
server.listen(4001, () => console.log(`Listening on port ${ 4001}`));
