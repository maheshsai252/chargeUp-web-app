// const config = require("../config/auth.config");
const db = require("../models");
const {Event} = require('../models/event.model');
const User = db.user;
const kmeans = require('node-kmeans');
const Registration = db.registration;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { set } = require("mongoose");

function hav(x) {
    const s = Math.sin(x / 2)
    return s * s
  }
const PI_180 = Math.PI / 180;
  function relativeHaversineDistance(lat1, lon1, lat2, lon2) {
    const aLatRad = lat1 * PI_180
    const bLatRad = lat2 * PI_180
    const aLngRad = lon1 * PI_180
    const bLngRad = lon2 * PI_180
  
    const ht = hav(bLatRad - aLatRad) + Math.cos(aLatRad) * Math.cos(bLatRad) * hav(bLngRad - aLngRad)
    // since we're only interested in relative differences,
    // there is no need to multiply by earth radius or to sqrt the squared differences
    return Math.asin(ht)
  }

exports.createEvent = async (req, res) => {
    console.log("creating Event with following params");
    console.log(req.body);
    params = req.body
    const user = await User.findOne({_id: req.session.userid})

  const event = new Event({
    name: params.name,
    summary: params.summary,
    description: params.description,
    tags: params.tags,
    price: params.price,
    type: params.type,
    capacity: params.capacity,
    available: params.capacity,
    date: params.date,
    latitude: params.latitude,
    longitude: params.longitude,
    place: params.place,
    startDate: params.startDate,
    endDate: params.endDate,
    createdBy: params.userid,
    nameTag: params.nameTag,
    filenames: params.files
  });
  
  try {
    const eventcreated = await event.save();
    
    res.status(200).send({
      id: eventcreated._id,
      name: eventcreated.name,
      date: eventcreated.date,
      nameTag: eventcreated.nameTag
    });
  } catch (err) {
    console.log(err);
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
  }
};
exports.getAllEvents = async (req,res) => {
    try {
        console.log(req.body);
      var data = await Event.find({
        
      });
      console.log(data[0]["capacity"]);
      res.send(data);
    } catch (err) {
        console.log(err.message);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving details."
      });
    }
      
      
  }
  exports.getPopularEvents = async (req,res) => {
    try {
      var data = await Event.find({
        startDate: {
            $gte: new Date(), 
            
        }
      });
      console.log(data[0]["capacity"]);
      data = data.sort((a,b) => {
        console.log(a,b);
        return ((a["capacity"]-a["available"])/a["capacity"]) - ( ((b["capacity"]-b["available"])/b["capacity"]))
      })
      res.send(data);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving details."
      });
    }
  }
  exports.filterEventsByCategory = async (req,res) => {
    try {
      console.log("starting");
        const searchCategoryArray = req.body.searchCategory;
        const start = req.body.start == undefined ? new Date() : req.body.start;
        const end = req.body.end;
        const price = req.body.price;
        const search = req.body.search;
        console.log(searchCategoryArray,start,end,price)
        
      
        var data = await Event.find({$and: [{startDate: {
          $gte: start, 
          
      }},{
        type: searchCategoryArray
        }, 
        {
          "price": {
              $gt: price
          }
    }, {name: 
      { 
          "$regex": req.body.search, 
          "$options": "i" 
  }}
        
      ]})
      
        res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving details."
      });
    }
  }
  exports.fetchEventsCreated = async (req,res) => {
    try {
      if(req.body.userid === undefined) {
        res.status(500).send("No user id");
        return
      }
      var data = await Event.find({$and: [{
        createdBy: req.body.useid
      } 
            
    ]})
    res.status(200).send(data); 
    } catch (error) {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving details."
      });
    }
  }
  exports.fetchEventsByCategory = async (req,res) => {
    try {
      console.log("starting");
        const searchCategoryArray = req.body.searchCategory;
        const start = req.body.start;
        const end = req.body.end;
        const price = req.body.price;
        const search = req.body.search;
        console.log(searchCategoryArray,start,end,price)
        
      
        var data = await Event.find({$and: [{startDate: {
          $gte: new Date(), 
          
      }},{
        type: searchCategoryArray
        }        
      ]})
      console.log(data,"data fetching");
        res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving details."
      });
    }
  }
  exports.filterEventsByPrice = async (req,res) => {
    try {
        const low = req.body.pricelow;
        const high = req.body.priceHigh;

        const orArray = searchArray.map((seachValue) => {
            return {
                type: searchValue,
            }
        });
      var data = await Event.aggregate([{startDate: {
        $gte: new Date(), 
    }},{
        price: {
            $gte: low,
            $lt: high 
            
        }
    }])
    res.send(data);
    }  catch (err) {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving details."
      });
    }
  }
  exports.filterEventsOfOrganiser = async (req,res) => {
    try {
        const userId = req.body.userId;

    
      var data = await Event.find({$and: [{startDate: {
        $gte: new Date(), 
        
    }},{
       createdBy: userId
    }]})
    res.status(200).send(data);
}  catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving details."
      });
    }
  }
  exports.getNearbyTrendingEvents = async (req,res) => {
    try {
        const lat = req.body.latitude
        const long = req.body.longitude
      var data = await Event.find({
        startDate: {
            $gte: new Date(), 
        }
      });
      console.log(data[0]["capacity"]);
      data = data.sort((a,b) => {
        console.log(a,b);
        return ((a["capacity"]-a["available"])/a["capacity"]) - ( ((b["capacity"]-b["available"])/b["capacity"]))
      }).slice(0,20);
      data = data.sort((a,b) => {
        console.log(a,b);
        return (relativeHaversineDistance(a["latitude"], a["longitude"], lat, long) - relativeHaversineDistance(b["latitude"], b["longitude"], lat, long));
      })
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving details."
      });
    }
  }
  exports.getNearbyEvents = async (req,res) => {
    try {
        const lat = req.body.latitude
        const long = req.body.longitude
      var data = await Event.find({
        startDate: {
            $gte: new Date(), 
            
        }
      });
      data=data.filter((a) => {return a.place !== "online"|| a.place !== "Online"})
      data = data.sort((a,b) => {
        console.log(a,b);
        return (relativeHaversineDistance(a["latitude"], a["longitude"], lat, long) - relativeHaversineDistance(b["latitude"], b["longitude"], lat, long));
      })
      console.log(data, "lslsl")
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving details."
      });
    }
  }
exports.getEventByID = async (req,res) => {
  try {
    console.log(req.session, "session");

    var data = await Event.find({_id: req.body.id})
    res.status(200).send(data);
} catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  }
    
    
}
exports.getEventByNameTag = async (req,res) => {
    try {
  
      var data = await Event.find({nameTag: req.body.nameTag})
      console.log(data,"result");
      res.status(200).send(data);
  } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    }
      
      
  }
exports.searchEvent = async (req,res) => {
    try {  
      
    var data = await Event.find({$and: [{startDate: {
      $gte: new Date(), 
      
  }},{name: 
    { 
        "$regex": req.body.search, 
        "$options": "i" 
}}]})
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    }   
}
exports.filterByTags = async (req,res) => {
    try {  
        const searchArray = req.body.searchArray;

        const orArray = searchArray.map((seachValue) => {
            return {
                tags: searchValue,
            }
        });
      var data = await Event.aggregate([{startDate: {
        $gte: new Date(), 
        
    }},{
        $match: { $or: orArray }
        }])
        res.status(200).send(data);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    }   
}


exports.deleteEvent = async (req, res) => {
  try {
    await Event.findOneAndRemove({
      _id: req.body.eventid
    });
    res.status(200).send({
      message: "Event deleted"
    });
  } catch (err) {
    console.log(err);
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
  }
    

     
  };

  exports.updateEvent = async(req, res) => {
    try {
      const params = req.body;
      console.log(req.body.filenames, "before update")
      const eventupdated = await Event.findOneAndUpdate({
        _id: req.body.eventid
      },{
        name: params.name,
        summary: params.summary,
        description: params.description,
        price: params.price,
        capacity: params.capacity,
        startDate: params.startDate,
        endDate: params.endDate,
        filenames: params.filenames
    });
    await Event.findByIdAndUpdate(req.body.eventid, { $inc: { available: req.body.available } })
    console.log(eventupdated,"after")
  res.status(200).send(eventupdated);

      
    } catch (err) {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
    }
    
      
  };

  exports.checkNameTag = async (req,res) => {
    try {
        var data = await Event.find({nameTag: req.body.nameTag})
        console.log(data, "checking name tag")
        if(data.length != 0) {
            res.status(400).send({"message": "name taken"});
        } else {
            res.status(200).send({"message": "name available"});
        }
    } catch (err) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: err });
            return;
          }
    }
  }
  exports.likeEvent = async (req,res) => {
    try {
        const userid = req.body.userid;
        const eventid = req.body.eventid;

        const user = await User.findOne({
          _id: userid
        })
        const event = await Event.findOne({
          _id: eventid
        })
        if(user===undefined) {
          res.status(500).send({"message": "user is not defined"});
        }
        if(event===undefined) {
          res.status(500).send({"message": "user is not defined"});
        }
        
        const interests =  Array.from(new Set(user.interests.concat(event.tags)))
        console.log(interests)
        const users = await User.findOneAndUpdate({
          _id: userid
        }, {
          interests: interests
        });
        res.status(200).send({
          "message": "liked success"
        });
        console.log(users.interests)
    } catch (err) {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
        return;
      }
    }
  }
  exports.pairing = async (req,res) => {
    try {
      
      var data = await Registration.find({
        event: req.body.eventid
      });

      // Create the data 2D-array (vectors) describing the data
      let vectors = new Array();
      console.log("pairing")
      console.log(data,vectors);
      var interest=0
      for (let i = 0 ; i < data.length ; i++) {
        const user = await User.findOne({
          _id: data[i]['user']
        })

        if(user._id===req.body.userid) {
          interest = i;
        }
        vectors[i] = [ user.favourites.length , user.interests.length];
      }
      
      kmeans.clusterize(vectors, {k: 1}, async (err,res1) => {
        if (err) console.error(err);
        else console.log('%o',res);
        if(res1.length ===0) {
          res.status(500).send({
            message: "no enough data"
          })
          return;
        }
        res1.map(async (r)=>{
          console.log(r.clusterInd);
          ans=[]
          console.log(r.clusterInd,interest)
            if(r.clusterInd.includes(interest) ) {
              ans=[]
              for(var i=0;i<r.clusterInd.length;i++) {
                const user = await User.findOne({
                  _id: data[i]['user']
                })
                ans.push(user);
              }
              console.log(ans);
              res.status(200).send(ans);
              console.log("sent")
            }
         
          
        })
      })

    } catch (error) {
      console.log(error)
      res.status(500).send({
        message: error
      })
    }
  }
