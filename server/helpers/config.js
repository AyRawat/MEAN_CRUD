module.exports = function() {
  var env = "devEnv";
  var devEnv = {
    PORT: 2000,
    DB_URL: "mongodb://localhost/crudApp",
    secretKey: "<@crudApp@>",
  };
  
  return env == "devEnv" ? devEnv : "";
};
