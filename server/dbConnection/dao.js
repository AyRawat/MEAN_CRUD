var mongoose = require("mongoose");
var config = require("../helpers/config")();
mongoose.Promise = global.Promise;
mongoose.connection.openUri(config.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


mongoose.connection.on("connected", () => {
  console.log("Mongoose default connection open to " + config.DB_URL);
});


mongoose.connection.on("error", (err) => {
  console.log("Mongoose default connection error: " + err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose default connection disconnected");
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});

module.exports = {
  user: require("../models/user/user")
};
