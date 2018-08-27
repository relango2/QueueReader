//Currently in use.
var kafka = require('kafka-node');
var HighLevelConsumer = kafka.HighLevelConsumer;
var Client = kafka.Client;

var client = new Client('54.183.204.91');
var topics = [
  {
    topic: 'test_topic'
  }
];

var options = {
  autoCommit: true,
  fetchMaxWaitMs: 1000,
  fetchMaxBytes: 1024 * 1024,
  encoding: 'buffer'
};
var consumer = new HighLevelConsumer(client, topics, options);

consumer.on('message', function(message) {
  //console.log(JSON.parse(message.value));
});

consumer.on('error', function(err) {
  console.log('error', err);
});

process.on('SIGINT', function() {
  consumer.close(true, function() {
    process.exit();
  });
});
