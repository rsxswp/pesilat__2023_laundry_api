require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const db = require("./models");
const logger = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "*" }));

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

//Set app config
const title = process.env.TITLE;
const port = process.env.PORT;
const baseUrl = process.env.URL + port;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

require("./routes")(app);

db.sequelize.sync().then(() => {
  // create_roles();
  app.listen(port, () => console.log(title + " run on " + baseUrl));
});
