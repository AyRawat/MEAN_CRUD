let express = require("express");
let app = express();
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let helmet = require("helmet");
let config = require("./server/helpers/config")();
var cors = require("cors");
app.use(cors());


require("./server/dbConnection/dao");
app.use(helmet());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

mongoose.Promise = global.Promise;
// use morgan to log requests to the console

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if ("OPTIONS" === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});


app.use("/user", require("./server/routes/user/userRoute"));



let listener = app.listen(config.PORT, function(err, success) {
  console.log("Api started on port-->> " + listener.address().port);
});
listener.timeout = 1000000;
