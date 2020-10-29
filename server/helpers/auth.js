//== require packages ====//
let jwt = require("jsonwebtoken");
// config function
let config = require("../helpers/config")();
var sendResponse = require("../helpers/responseHandler");
const db = require("../dbConnection/dao");

module.exports.authenticateUser = function(req, res, next) {
  // Get authorication token in header
  let token = req.headers.authtoken;

  // if token exist then verify the token
  if (token) {
    jwt.verify(token, config.secretKey, function(err, user) {
      // if error occured that means token in not valid.
      if (err) {
        sendResponse.to_user(
          res,
          403,
          null,
          "Failed to authenticate token.",
          null
        );
      } else {
        db.user.findById(user._id).exec((err, success) => {
          if (err) {
            sendResponse.to_user(res, 500, null, "Server error", null);
          } else if (!success) {
            sendResponse.to_user(res, 403, null, "Invalid token", null);
          } else {
            
              req.user = success;
              next();
            
          }
        });
      }
    });
  } else {
    sendResponse.to_user(res, 403, null, "No token provided", null);
  }
};

