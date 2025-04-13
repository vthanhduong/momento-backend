require('dotenv').config();
// Add Express
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// Initialize Express
const app = express();
// Import routes
const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const momentRoute = require("./routes/moment.route");
const friendshipRoute = require("./routes/friendship.route");
//
const statusCode = require('./utils/http-status-code.const');
// Validator config
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// Import routes
app.use('/user', userRoute);
app.use('/auth', authRoute);
app.use('/moment', momentRoute);
app.use('/friendship', friendshipRoute);

// GET REQUEST
app.get("/", (req, res) => {
  return res.status(statusCode.OK).json({
    status: "success",
    message: "The service is live.",
  });
});


// Initialize server
app.listen(5000, () => {
  console.log("Running on port 5000.");
});

module.exports = app;