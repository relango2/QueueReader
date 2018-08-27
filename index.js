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
  const path = require("path").default;
  app.use(express.static("client/build"));
  //app.use(express.static(path.join(__dirname, "../client/build")));
  // Express will serve up the index.html file
  // if it doesn't recognize the route
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    //res.sendFile(path.resolve("build", "index.html"));
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

io.on('error', function() {
  //here i change options
  socket = io.connect(host, options);
});

var outputArray = ["{\"key\" : \"1\", \"value\":\"random\"}"];

var HighLevelConsumer = kafka.HighLevelConsumer;
var Client = kafka.Client;

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

/*
return Events.create({
        id: decodedMessage.id,
        type: decodedMessage.type,
        userId: decodedMessage.userId,
        sessionId: decodedMessage.sessionId,
        data: JSON.stringify(decodedMessage.data),
        createdAt: new Date()
    });
*/

var consumer = new HighLevelConsumer(client, topics, options);

consumer.on("message", function(message) {
  var decodedMessage = JSON.parse(message.value);
  var o = {
    data: decodedMessage,
    createdAt: Date.now()
  };
  outputArray.push(o);
});

consumer.on('error', function(err) {
  console.log('error', err);
});

const getApiAndEmit = async socket => {
  /*var o = {
    data: "{\"key\" : \"1\", \"value\":\"random\"}",
    createdAt: Date.now()
  };*/
  outputArray.push("{\"key\" : \"1\", \"value\":\"random\"}");

  //console.log(outputArray);
  socket.emit("FromAPI", outputArray);

};

server.listen(4001, () => console.log(`Listening on port ${ 4001}`));
