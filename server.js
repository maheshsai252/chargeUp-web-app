const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require('path');
const app = express();
require('dotenv').config()

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;
const sessions = require('express-session');

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));
app.use(cookieParser());
var corsOptions = {
    
  origin: "http://localhost:8080"
};

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});
if (process.env.NODE_ENV === 'production') {
  //*Set static folder
  // app.use(express.static('client/build'));
  app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

  // app.get('/*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
}
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const session = require('express-session');
const db = require("./models");
const Role = db.role;
// mongodb://localhost:27017/db8
db.mongoose
  .connect(process.env.REACT_APP_MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


require('./routes/auth.routes')(app);
require('./routes/event.routes')(app);
require('./routes/registration.routes')(app);
require('./routes/payment.routes')(app);

