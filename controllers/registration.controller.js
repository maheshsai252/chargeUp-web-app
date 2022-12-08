// const config = require("../config/auth.config");
const db = require("../models");
const Registration = db.registration;
const {Event} = require('../models/event.model');

const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.createRegistration = async (req, res) => {
    console.log("creating Registration with following params");
    console.log(req.body);
    params = req.body
    const user = await User.findOne({_id: req.body.userid})
    const event = await Event.findOne({_id: req.body.eventId})
  const registration = new Registration({
    event: event,
    user: user
  });
    if(event.available <=0) {
      res.status(500).send("Seats are unavailable");
      return
    }
    if(event.endDate <=new Date()) {
      res.status(500).send("Registration Window closed");
      return;
    }
  try {
    const registrationcreated = await registration.save();
    await Event.findByIdAndUpdate(event._id, { $inc: { available: -1 } })
    res.status(200).send({
      id: registrationcreated._id,
      name: registrationcreated.name,
      date: registrationcreated.createdAt
    });
  } catch (err) {
    if (err) {
      console.log(err);
      res.status(500).send({ message: err });
      return;
    }
  }
};
exports.getAllRegistrationsOfEvent = async (req,res) => {
    try {
      const event = await Event.find({
        _id: req.body.eventId
      });
      console.log(event);
      if(event==null) {
        res.status(400).send({
            message: "Event doesnt exist"
          });

      }
      var data = await Registration.find({
        event: event
      });
      console.log(data,"regs")
      let regs = []
      for(var i=0;i<data.length;i++) {
        const user = await User.findOne({
          _id: data[i].user
        })
        regs.push({
          user: user,

          date: data[i].createdAt
        });
      }
      console.log(regs,"fe")
      res.status(200).send(regs);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving details."
      });
    }
      
      
  }
  exports.getAllRegistrationsOfUser = async (req,res) => {
    try {
      const user = await User.find({
        _id: req.body.userId
      });
      if(user==null) {
        res.status(400).send({
            message: "User doesnt exist"
          });

      }
      var data = await Registration.find({
        user: req.body.userId
      });
      console.log(data);
      let events = []
      for(var i=0;i<data.length;i++) {
        const event = await Event.findOne({
          _id: data[i].event
        })
        events.push(event);
      }
      console.log(events);
      res.status(200).send(events);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving details."
      });
    }
      
      
  }

// exports.searchEvent = async (req,res) => {
//     try {  
//       var data = await Event.find({name: { "$regex": req.body.search, "$options": "i" }})
//       res.status(200).send(data);
//     } catch (err) {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     }   
// }
// exports.filterByTags = async (req,res) => {
//     try {  
//         const searchArray = req.body.searchArray;

//         const orArray = searchArray.map((seachValue) => {
//             return {
//                 tags: searchValue,
//             }
//         });
//       var data = await Event.aggregate([{
//         $match: { $or: orArray }
//         }])
//         res.status(200).send(data);
//     } catch (err) {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     }   
// }


exports.deleteRegistration = async (req, res) => {
  try {
    await Registration.findOneAndRemove({
      user: req.body.userid,
      event: req.body.eventid
    });
    await Event.findByIdAndUpdate(req.body.eventid, { $inc: { available: 1 } })
    res.status(200).send({
      message: "Registarion deleted"
    });
  } catch (err) {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
  }
    

     
  };
  exports.getRegistartionByID = async (req,res) => {
    try {
      console.log(req.session, "session");
  
      var data = await Registration.find({_id: req.body.id})
      res.status(200).send(data);
  } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    }
      
      
  }

  