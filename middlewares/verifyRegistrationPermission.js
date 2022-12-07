const db = require("../models");
const Registration = require("../models/registration.model");
const User = db.user;
const {Event} = require('../models/event.model');
const Registarion = db.registration;

checkUserCanUpdateRegistration = async (req, res, next) => {
    try {
      console.log("checkupdate")
      const user = await User.findOne({
        _id: req.body.userid
      });
      if(user==null) {
        res.status(400).send({ message: "Failed! User doesn't exist" });
        return;
      }
      const reg = await Registration.findOne({
        user: req.body.userid,
        event: req.body.eventid
      });
      if(reg == null) {
        res.status(400).send({ message: "Failed! User dont have permission to update" });
          return;
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
checkRegistrationCreation = async (req, res, next) => {
    try {
      console.log("check event")
      const user = await User.findOne({
        _id: req.body.userid
      });
      // console.log(user,user==null);
      if(user===null) {
        res.status(400).send({ message: "Failed! User doesn't exist" });
        return;
      }
      const event = await Event.findOne({
        _id: req.body.eventId
      });
      // console.log(req.body.eventId,event, event==null)
      if(event==null) {
        res.status(400).send({ message: "Failed! Event doesn't exist" });
        return;
      }
      
     const registration = await Registarion.findOne({
        user: user._id,
        event: event._id
     })
     const registrations = Registarion.find({
      
   })
     console.log(registrations,registrations!=null)
    if(registration != null) {
        res.status(400).send({ message: "Failed! Registartion exist" });
        return;
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
const verifyRegistartionPermission = {
        checkUserCanUpdateRegistration,
        checkRegistrationCreation
};
      
module.exports = verifyRegistartionPermission;