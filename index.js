const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const Cors = require("./middleware/multipartHandler");
const app = express();
let port = process.env.PORT || process.env.port || 3000;
const Response = require("./models/response")
const route = require("./route/route")
app.use(Cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function (req, res) {
  return res.send("App working.");
});
///response creation
app.use(function (req, res, next) {
  res.createResponse = async function (isSuccess, result, message, statusCode) {
    try {
      if (isSuccess) {
        res.status(statusCode).send(new Response(isSuccess, result, message, statusCode));
      } else {
        // let data = await customErrorHandler(result?result:message);
        // res.status(statusCode).send(new Response(isSuccess, data, data.replace(/"/g, ''), statusCode));
        res.status(statusCode).send(new Response(isSuccess, result, message, statusCode));
      }
    }
    catch (err) {
      res.status(statusCode).send(new Response(isSuccess, err, err.message.replace(/"/g, ""), statusCode));
    }
  };
  next();
});
app.use("/api", route);

app.listen(port, function (req, res) {
  console.log(`app listening on port ${port}`);
})