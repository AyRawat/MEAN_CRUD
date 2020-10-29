var jwt = require("jsonwebtoken"),
  config = require("./config")(),
  _ = require("underscore");
token = {
  authToken: function(data) {
    //data.toJSON()
    var token = jwt.sign(data, config.secretKey);
    return token;
  }
};
module.exports = token;
