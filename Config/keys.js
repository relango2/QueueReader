//Keys.js - place where it is decided to use the correcr set of Keys
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  //return production set of keys
  module.exports = require("./prod.js");
} else {
  // we are in development. return the production set of keys.
  module.exports = require("./dev.js");
}
