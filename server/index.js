if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}
require('./config/passport');
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require('passport');
const cors = require('cors');

const errorMiddleware = require("./middleware/error");

const user = require("./routes/userRoute");
const business = require("./routes/businessRoute");
const product = require("./routes/productRoute");
const stripe = require("./routes/stripeRoute");
const notification = require("./routes/notificationRoute");

const corsOptions = {
  origin: process.env.CLIENT_DOMAIN, 
  credentials: true,
};

app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(passport.initialize());

app.use("/api/user", user);
app.use("/api/business", business);
app.use("/api/product", product);
app.use("/api/stripe", stripe);
app.use("/api/notification", notification);

app.use(errorMiddleware);

module.exports = app;
