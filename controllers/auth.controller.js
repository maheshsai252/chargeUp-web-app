// const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

const {sendEmail} = require('../services/MailService');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    console.log("signing up");
    console.log(req.body);

  const user = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    name: req.body.name,
    file: req.body.file
  });
  console.log(user._id);
  try {
    const usercreated = await user.save();
    console.log("created")
    res.status(200).send({
      id: usercreated._id,
      email: usercreated.email,
      name: usercreated.name
    });
    sendEmail("maheshsai252@gmail.com",usercreated.email,"Sign Up!!","","'<b>Hey "+ usercreated.name +"!!</b><br><br> Thanks for signing up to chargeUp !!<br/>")
  } catch (err) {
      res.status(500).send({ message: err });
      return;
    
  }
};
exports.signupWithGoogle = async (req, res) => {
  console.log("signing up");
  console.log(req.body);

const user = new User({
  email: req.body.email,
  googleid: req.body.googleId,
  name: req.body.name
});

try {
  const usercreated = await user.save();
  
  res.status(200).send({
    id: usercreated._id,
    email: usercreated.email,
    name: usercreated.name
  });
} catch (err) {
  if (err) {
    res.status(500).send({ message: err });
    return;
  }
}
};

exports.get = async (req,res) => {
    try {
      console.log(req.body, "sessioning");
      const userId = req.body.userid;
      var user = await User.find({
        _id: req.body.userid
      });
      console.log("data",user);
      res.send(user);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving details."
      });
    }
      
      
  }

exports.getAll = async (req,res) => {
  try {
    console.log(req.session, "session");

    var data = await User.find({});
    // sendEmail("maheshsai252@gmail.com","maheshsai252@gmail.com","test","test-test");

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  }
    
    
}

exports.signin = async (req, res) => {
  try {
    console.log("signing in");
    console.log(req.body);
    const user = await User.findOne({
      email: req.body.email
    });
    if(user==null) {
      res.status(400).send({ message: "Failed! User doesn't exist" });
      return;
    }

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
      
    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!"
      });
    }
    session=req.session;
    req.session.userid=user._id;
    console.log(req.session, "session");
    res.status(200).send({
      id: user._id,
      email: user.email,
      name: user.name,
      image: user.file
    });
  } catch (err) {
    if (err) {
      // if (!user) {
        return res.status(404).send({ message: "User Not found." });
      // }
    }
  }
  
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findOneAndRemove({
      email: req.body.email
    });
    res.status(200).send({
      message: "User deleted"
    });
  } catch (err) {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
  }
    

     
  };

  exports.updateUser = async(req, res) => {
    try {
      console.log(req.body.name);
      let user;
      if(req.body.password ==='none') {
        user = await User.findOneAndUpdate({
          email: req.body.email
        },{
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8),
          name: req.body.name,
          
        });
      } else {
        user = await User.findOneAndUpdate({
          email: req.body.email
        },{
          email: req.body.email,
          name: req.body.name,
          
        });
      }
      if(req.body.file !== 'none') {
         user = await User.findOneAndUpdate({
          email: req.body.email
        },{
          file: req.body.file

        });
      }
      console.log(user)
      res.status(200).send({
        message: "User Updated",
        name: req.body.name,
        email: req.body.email,
        image: user.file
      });
    } catch (err) {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
    }
    
      
  };

  exports.logOut = async (req,res) => {
    try {
        req.session.destroy();
        res.status(200).send({ message: "user logged out" });
        
    } catch (err) {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
    }

  }