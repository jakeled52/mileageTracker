var Miles = require('../models/miles');
var Stats = require('../models/stats')
const jwt = require("jsonwebtoken");
process.env.SECRET_KEY = 'secret'
var miles_controller = require('../controllers/miles_controller');
var path = require('path');
const express = require("express")
const users = express.Router()
const cors = require("cors")

const User = require("../models/users")
users.use(cors())


module.exports = {
  miles: function(req, res){
      var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
      User.findOne({
        _id: decoded._id
      })
        .then(user => {
          if(user) {
            User.find({_id: decoded._id}, function(err,user){
              res.json({err: err, user: user})
              console.log(user, "found user in miles_controller!!!")
            })
          } else {
            res.send("User does not exist")
          }
          })
          .catch(err => {
           res.send('error: ' + err)
          }) 
        },
 milesGet: function(req, res){
  User.findOne({
    _id: req.params.Uid
  })
    .then(user =>{
      console.log(req.params.id, "Params id in milesGet")
      for(var i = 0; i < user.milesArray.length; i++){
        if(user.milesArray[i]._id == req.params.id){
          res.json({miles: user.milesArray[i]})
        }
      }
    })
 },
  stats: function(req, res){
    User.findOne({_id: req.params.Uid}, function(err,user){
      
      res.json({err:err, stats: user.statsArray})
    })
  },
  new: function(req, res){
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    User.findOne({
      _id: decoded._id
    })
    var miles = new Users(req.body);
    miles.save(function(err, miles) {
      res.json({err: err, miles: miles});
    });
  },
  newStats: function(req, res){
    var stats = new Stats(req.body)
    User.findOne({_id: req.params.Uid}, function(err, user){
      user.statsArray.push(stats);
      user.save();
      console.log(stats, " stats in newStats in miles_controller")
    })
  },
  oneMiles: function(req, res){
    Miles.findOne({_id: req.params.id}, function(err, miles){
      res.json({err: err, miles: miles});
    });
  },
  milesUpdate: function(req, res){
    // Miles.updateOne({_id: req.params.id}, req.body, { runValidators: true }, function(err,miles){
    //   res.json({err: err, miles: miles});
    // });
    User.findOne({_id: req.params.Uid}, function(err,user){
      for(var i = 0; i < user.milesArray.length; i++){
        if(user.milesArray[i]._id == req.params.id){
          console.log(user.milesArray[i],"user.milesArray[i] in milesUpdate")
          user.milesArray[i] = req.body;
          console.log(req.body, "req.body.miles in milesUpdate")
          user.save();
        }
      }
    })
  },
  
  deleteMiles: function(req, res){
    console.log(req.params.id," mile id in delete miles")
    console.log(req.params.Uid," user id in delete miles")
    UserMiles = User.findById({_id: req.params.Uid}, function(err, user){
      var mileToDelete = 0;
      console.log(user.milesArray, " Miles Array in delete in miles_controller")
      for(var i = 0; i <user.milesArray.length; i++){
        if(user.milesArray[i]._id == req.params.id){
          mileToDelete = i;
        }
      }
        user.milesArray.splice(mileToDelete, 1);
        user.save();
      console. log(user.milesArray, " Miles Array in delete in miles_controller")
    });
    
  }
}
