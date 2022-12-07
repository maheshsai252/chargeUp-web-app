const db = require("../models");
const User = db.user;
const {Event} = require('../models/event.model');

checkUserCanUpdateEvent = async (req, res, next) => {
    try {
      console.log("checkupdate")
      const user = await User.findOne({
        _id: req.body.userid
      });
      if(user==null) {
        res.status(400).send({ message: "Failed! User doesn't exist" });
        return;
      }
      const event = await Event.findOne({
        _id: req.body.id
      });
      if(event.createdBy != user) {
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
checkEventCreation = async (req, res, next) => {
    try {
      console.log("check event")
      console.log(req.session)
      const user = await User.findOne({
        _id: req.body.userid
      });
      if(user==null) {
        res.status(400).send({ message: "Failed! User doesn't exist" });
        return;
      }
      if(req.body.name === null || req.body.name.length ===0) {
        res.status(400).send({ message: "Failed! Event name cant be empty" });
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
const verifyEventPermission = {
        checkUserCanUpdateEvent,
        checkEventCreation
      };
      
module.exports = verifyEventPermission;