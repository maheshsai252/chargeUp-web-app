const db = require("../models");
const { validate } = require("../models/user.model");
const ROLES = db.ROLES;
const User = db.user;


var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
var passwordRegex = /^(?=.*\d)(?=.*[@#])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z@,#]{8,}$/;
function isPasswordValid(password) {
    if (!password)
        return false;

    if(password.length<8)
        return false;

    var valid = passwordRegex.test(password);
    if(!valid)
        return false;

   

    return true;
}
function isEmailValid(email) {
    if (!email)
        return false;

    if(email.length>250)
        return false;

    var valid = emailRegex.test(email);
    if(!valid)
        return false;

    // Further checking of some things regex can't handle
    var parts = email.split("@");
    if(parts[0].length>64)
        return false;

    var domainParts = parts[1].split(".");
    if(domainParts.some(function(part) { return part.length>63; }))
        return false;

    return true;
}
checkExist = async (req, res, next) => {
  try {
    console.log("searching");
    const user = await User.findOne({
      email: req.body.email
    });
    if(user==null) {
      res.status(400).send({ message: "Failed! User doesn't exist" });
      return;
    }
    console.log(user);
    next();
  } catch (err) {
      console.log(err);
      res.status(400).send({ message: "Failed! User doesn't exist" });
      return;
    
  }
    
  };
checkUpdate = async (req, res, next) => {
  try {
    console.log("checkupdate")
    const user = await User.findOne({
      email: req.body.email
    });
    if(user==null) {
      res.status(400).send({ message: "Failed! User doesn't exist" });
      return;
    }
    
      if(req.body.password==null && req.body.name == null) {
        res.status(400).send({ message: "Failed! Nothing to update" });
        return;
      }
      if(req.body.password!=null && !isPasswordValid(req.body.password)) {
        res.status(400).send({ message: "Failed! Password is not valid" });
        return;
      } else if(req.body.password == null) {
        req.body.password = user.password
      }
      if(req.body.name == null) {
        req.body.name = user.name;
        console.log("name changed")
      }
      next();

    
  } catch (err) {
    console.log(err);
    // if (err) {
      res.status(400).send({ message: "Failed! User doesn't exist" });
      return;
    // }

  }
  
  };
  

checkValidate = async (req, res, next) => {
  try {
    const user  = await User.findOne({
      email: req.body.email
    });
    if (user) {
      res.status(400).send({ message: "Failed! Email is already in use!" });
      return;
    }
    if(req.body.email==null || !isEmailValid(req.body.email)) {
      res.status(400).send({ message: "Failed! Email is not valid" });
      return;
    }
    if(req.body.name == null || req.body.name.length <=0) {
      res.status(400).send({ message: "Failed! Name of user is not valid" });
      return;
    }
    if(req.body.password==null || !isPasswordValid(req.body.password)) {
      res.status(400).send({ message: "Failed! Password is not valid" });
      return;
    }
    next();
  } catch(err) {
    // if (err) {
      res.status(500).send({ message: err });
    // }
  }
  
};

checkValidateWithGoogle = async (req, res, next) => {
  try {
    console.log("experiencing", req.body);
    const user  = await User.findOne({
      email: req.body.email
    });
    if (user) {
      console.log(user);
      res.status(200).send({
        id: user._id,
        email: user.email,
        name: user.name
      });
      // res.status(400).send({ message: "Failed! Email is already in use!" });
      return;
    }
    if(req.body.email==null || !isEmailValid(req.body.email)) {
      res.status(400).send({ message: "Failed! Email is not valid" });
      return;
    }
    if(req.body.name == null || req.body.name.length <=0) {
      res.status(400).send({ message: "Failed! Name of user is not valid" });
      return;
    }
    if(req.body.googleId==null || req.body.name.length <=0) {
      res.status(400).send({ message: "Failed! Google Id is not valid" });
      return;
    }
    next();
  } catch(err) {
    // if (err) {
      res.status(500).send({ message: err });
    // }
  }
  
};

const verifySignUp = {
  checkValidate,
  checkUpdate,
  checkExist,
  checkValidateWithGoogle
};

module.exports = verifySignUp;