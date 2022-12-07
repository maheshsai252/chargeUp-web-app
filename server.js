const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
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
  .connect('mongodb+srv://mahesh:bandaru21@buddy.vq6xz.mongodb.net/?retryWrites=true&w=majority', {
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
