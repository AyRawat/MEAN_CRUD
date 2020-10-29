const { check, oneOf } = require("express-validator");



var checkEmail = [
    check("emailId", "EmailId is required").exists(),
    check("emailId", "Invalid email address").isEmail(),
  ],
  checkName = [
    check("name", "name is required")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Name cannot be empty"),
  ];
  password = [
    check("password", "Password is required")
      .exists()
      .not()
      .isEmpty()
      .withMessage("password cannot be empty"),
  ];
oldPassword = [
  check("oldPassword", "oldPassword is required")
    .exists()
    .not()
    .isEmpty()
    .withMessage("oldPassword cannot be empty"),
];
newPassword = [
  check("newPassword", "newPassword is required")
    .exists()
    .not()
    .isEmpty()
    .withMessage("newPassword cannot be empty"),
];
confirmPassword = [
  check("confirmPassword", "confirmPassword is required")
    .exists()
    .not()
    .isEmpty()
    .withMessage("confirmPassword cannot be empty"),
];



var validateObj = {};



validateObj.userLogin = [...checkEmail, ...password];
validateObj.userSignup = [...checkEmail, ...password];
validateObj.userEmailVerify = [...checkEmail];
validateObj.userUpdate = [...checkEmail,...checkName];
validateObj.resetPass = [...checkEmail, ...confirmPassword, ...newPassword];


module.exports = validateObj;
