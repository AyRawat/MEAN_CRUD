const db = require("../../dbConnection/dao");
const sendResponse = require("../../helpers/responseHandler");
const encryptDecrypt = require("../../helpers/cryptoPassword");
const generateToken = require("../../helpers/generateAuthToken");
const constant = require("./userConstant");
var https = require("https");
const { constants } = require("buffer");


module.exports = {
 
  signup: async (req, res) => {
    try {
      let condition = {emailId: req.body.emailId}
      let user = await db.user.findOne(condition);
      if(user){
        sendResponse.to_user(
          res,
          200,
          null,
          constant.signupValidateMsg,
          null
        );
        return;
      }else{
        let data  ={
          emailId: req.body.emailId,
          name: req.body.name,
          password: encryptDecrypt.encrypt(req.body.password)
        }
        let userSignUp = new db.user(data);
         await userSignUp.save();
        if(userSignUp){
          sendResponse.to_user(
            res,
            200,
            null,
            constant.userSignupSuccessMsg,
            null
          );
          return;
        }else{
          sendResponse.to_user(
            res,
            400,
            "BAD REQUEST",
            constant.error,
            null
          )
        }
      }
    } catch (e) {
      console.log(e);
      sendResponse.to_user(res, 400, "Bad request", constant.error);
    }
  },
  login: async (req, res) => {
    try {
      var condition = {
        emailId: req.body.emailId,
        password: encryptDecrypt.encrypt(req.body.password),
      };
      var result = await db.user.findOne(condition);
      if (!result) {
        sendResponse.to_user(res, 400, null, constant.loginValidateMsg, null);
      } else {
        authToken = generateToken.authToken({
          _id: result._id,
        });
        sendResponse.to_user(res, 200, null, constant.loginSuccessMsg, {
          userToken: authToken,
          userData: {
           userData: result,
           userToken: authToken
          },
        });
      }
    } catch (e) {
      console.log(e);
      sendResponse.to_user(res, 400, "Bad request", constant.error);
    }
  },
  getUserProfile: async (req, res) => {
    try {
      var obj = await db.user.findOne({_id: req.query.userId});
      if (obj != "") {
        sendResponse.to_user(res, 200, null, constant.gotAllUsers, obj);
      } else {
        sendResponse.to_user(
          res,
          200,
          "NO DATA",
          constant.failedToGetUsers,
          null
        );
      }
    } catch (e) {
      sendResponse.to_user(res, 400, e, constant.error);
    }
  },
  getUsers: async (req, res) => {
    try {
      var obj = await db.user.find({});
      if (obj != "") {
        sendResponse.to_user(res, 200, null, constant.gotAllUsers, obj);
      } else {
        sendResponse.to_user(
          res,
          200,
          "NO DATA",
          constant.failedToGetUsers,
          null
        );
      }
    } catch (e) {
      sendResponse.to_user(res, 400, e, constant.error);
    }
  },
  updateUser: async (req, res) => {
    try {
      const filter = { _id: req.body.userId };

      const data = {
        name: req.body.name,
        emailId:req.body.emailId
      };

      var success = await db.user.findByIdAndUpdate(filter, data, {
        new: true,
      });
      if (!success) {
        sendResponse.to_user(
          res,
          404,
          "DATA_NOT_FOUND",
          "user Not Found With Id",
          null
        );
      } else {
        sendResponse.to_user(
          res,
          200,
          null,
          "Profile updated Successfully",
          success
        );
      }
    } catch (e) {
      console.log("e,e", e);
      sendResponse.to_user(res, 400, e, constant.error);
    }
  },

  deleteUser: async (req, res) => {
    try {
      var success = await db.user.findByIdAndRemove(req.params.userId);
      if (!success) {
        sendResponse.to_user(
          res,
          404,
          "NO DATA",
          constant.faqNotFoundMsg,
          null
        );
      } else {
        sendResponse.to_user(
          res,
          200,
          null,
          "Deleted",
          success
        );
      }
    } catch (e) {
      sendResponse.to_user(res, 400, e, constant.error);
    }
  },

  searchUser: async (req, res) => {
    try {
      var filter = {
        name: {
          $regex: ".*" + req.query.searchKey + ".*",
          $options: "si",
        }
      };
      var obj = await db.user.find(filter);
      if (obj != "") {
        sendResponse.to_user(res, 200, null, constant.userSuccessMsg, obj);
      } else {
        sendResponse.to_user(
          res,
          202,
          constant.noContent,
          constant.userValidateMsg,
          null
        );
      }
    } catch (e) {
      console.log(e);
      sendResponse.to_user(res, 400, constant.badRequest, constant.error);
    }
  },
};
