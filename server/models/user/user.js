var mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  user = new Schema(
    {
      name: {
        type: String,
      },
      emailId: {
        type: String,
      },
      password: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );
module.exports = mongoose.model("user", user, "user");
