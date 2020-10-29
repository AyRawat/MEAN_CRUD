let express = require("express");
let router = express.Router();
let validate = require("../../middleware/validation");
const { check, validationResult } = require("express-validator/check");
let auth = require("../../helpers/auth");
const sendRes = require("../../helpers/responseHandler");



function checkValidationResult(req, res, next) {
  var result = validationResult(req).array();
  console.log(result);
  result.length ? sendRes.to_user(res, 403, result[0].msg) : next();
}
let user = require("../../services/user/user");



router.route("/userSignup").post(
  validate.userSignup,
  (req, res, next) => {
    checkValidationResult(req, res, next);
  },
  user.signup
);

router.route("/userLogin").post(
  validate.userLogin,
  (req, res, next) => {
    checkValidationResult(req, res, next);
  },
  user.login
)
//Get All users
router.route("/users").get(auth.authenticateUser,
   user.getUsers)
//Delete User
router
  .route("/user/:userId")
  .delete(auth.authenticateUser, 
    user.deleteUser);

router.route("/updateUser").put(
      validate.userUpdate,
      (req, res, next) => {
        checkValidationResult(req, res, next);
      },
      auth.authenticateUser,
      user.updateUser
    );
//Search
router.route("/getUsers")
.get(auth.authenticateUser, 
  user.searchUser);
//Get a Particular User's Profile
router.route("/getUserProfile")
.get(auth.authenticateUser, 
  user.getUserProfile);

module.exports = router;
