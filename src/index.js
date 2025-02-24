// Add Express
const express = require("express");

// Initialize Express
const app = express();

const userRoute = require('./routes/user.route');

// Create GET request
app.get("/", (req, res) => {
  res.status(400).json({
    status: "success",
    message: "Momento",
  })
});

app.use('/user', userRoute);

// Initialize server
app.listen(5000, () => {
  console.log("Running on port 5000.");
});

module.exports = app;