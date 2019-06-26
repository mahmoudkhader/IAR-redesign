// This imports express and mongoose
const express = require("express");
const mongoose = require("mongoose");
// This will import the bodyParser method from body-parser
const bodyParser = require("body-parser");
// Bring in passport, which is an authentication package
const passport = require("passport");
const path = require("path");
// Point specific URLs to the files uner routes/api
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const hijri = require("./routes/api/hijri");

// this will initialize a variable called 'app' to express
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config = set it equal to the mongoURI value
const db = require("./config/keys").mongoURI;

// Connect to MongoDB through mongoose. Here we call three properties from the mongoose library (first it connects, then if successful prints something, and if there is an error (catch) it prints the error)
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config - this is the passport strategy, which in this case is a JWT strategy
// So we will require the passport file and pass in the passport object
require("./config/passport")(passport);

/** OBSOLETE
// Create a route to get something up and running
// res.send() sends a string response in a format other than JSON (it can be in XML, CSV, plain text, etc)
// reference: https://sailsjs.com/documentation/reference/response-res/res-send
// app.get("/", (req, res) => res.send("Hello Potato!"));
 */
app.use(function(req, res, next) {
  //allow cross origin requests
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, PUT, OPTIONS, DELETE, GET"
  );
  res.header("Access-Control-Allow-Origin", "localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
// Use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/hijri", hijri);

// Server static assets if in production environment
// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

// neet to run the server (for now, local port)
// const port = 5000;
// eventually will run on heroku, will use this:
// const port = process.env.PORT;
// For now, let's use an OR statement (|| means 'or')
// const port = process.env.PORT || 5000;
// const port = 5000;

// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }
// const port = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// const port = process.env.PORT || 9000;
const port = 9000;
app.listen(port);

// Pass in the port that we want the app to listen to
app.listen(port, () => console.log(`Server running on port ${port}`));
