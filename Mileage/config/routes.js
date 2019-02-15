var miles_controller = require('../controllers/miles_controller');
var path = require('path');
var express = require("express")
var users = express.Router()
var cors = require("cors")
var jwt = require("jsonwebtoken")
var bcrypt = require("bcrypt")

var User = require("../models/users")
users.use(cors())
process.env.SECRET_KEY = 'secret'

var Miles = require('../models/miles');
var Stats = require('../models/stats')


module.exports = function(app) {
  app.get('/api/miles/stats/:Uid', miles_controller.stats);
  app.get('/api/miles', miles_controller.miles);
  app.get('/api/miles/:id/:Uid', miles_controller.milesGet)
  app.put('/api/miles/:id/:Uid', miles_controller.milesUpdate);
  app.delete('/api/miles/:id/:Uid', miles_controller.deleteMiles);
  app.post('/api/miles/stats/:Uid', miles_controller.newStats);
  app.post('/api/miles', (req, res) => {
    console.log("made it to the /api/miles post. Huray.")
    console.log(req.body.user[0]._id, ' user id in routes.js')
    
    console.log(req.body, "req.body.miles - routes.js")
    User.findOne({
      _id: req.body.user[0]._id
    })
      .then(user => {
        if(user) {
          console.log("if(user) in routes.js")
          console.log(user,'user in if(user) - routes.js')
          user.milesArray.push(req.body);
          console.log(user, 'user before save')
          console.log(req.body.user[0].milesArray, "new mileage!")
          user.save(function(err, miles) {
            console.log("made it to save.")
            res.json({err: err , miles: miles})
            console.log(req.body.user[0].milesArray , " miles array after save.")
            console.log("miles in save", miles, err)
            console.log(user, "after save in routes.js")
          });
        } else {
          res.send("User does not exist")
          console.log("User does not exsit - routes.js")
        }
        })
        .catch(err => {
          res.send('error: ' + err)
          console.log("Error in routes.js")
        })
      });
 
  app.get('/api/miles/:id', miles_controller.oneMiles);

    app.post('/register', (req, res) => {
      const today = new Date()
      const userData = {
          username: req.body.username,
          password: req.body.password,
          created: today
      }
      User.findOne({
          username: req.body.username
      })
      .then(user => {
          if(!user){
            if(req.body.password == req.body.cpassword){
              bcrypt.hash(req.body.password, 10 , (err, hash) => {
                  userData.password = hash
                  User.create(userData)
                      .then(user => {
                          res.json({status: user.username + " registered"})
  
                      })
                      .catch(err => {
                          res.send('error: ' + err)
                      })
              })}
          } else {
              res.json({error: ' User already exists'})
          }
      })
      .catch(err => {
          res.send('error' + err)
      })
  })
  app.post('/login', (req,res) =>{
    User.findOne({
      username: req.body.username
    })
    .then(user => {
      if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
          const payload = {
            _id: user._id,
            username: user.username
          }
          let token = jwt.sign(payload, process.env.SECRET_KEY,{
            expiresIn: 144000
          })
          res.json({token: token})
        } else{
          res.json({error: "Password does not match"})
        }
        }else{
          res.json({error:"User does not exist"})
        }
      })
      .catch(err =>{
        res.send('error: ' + err)
      })
    })
  app.get('/profile', (req, res) => {
    console.log(req.headers)
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    User.findOne({
      _id: decoded._id
    })
      .then(user => {
        if(user) {
          res.json(user)
        } else {
          res.send("User does not exist")
        }
        })
        .catch(err => {
          res.send('error: ' + err)
        })
      })
      app.get('/api/miles', (req, res) => {
        console.log(req.headers)
        var d = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
        console.log(d, "some text")
        User.findOne({
          _id: d._id
        })
          .then(user => {
            if(user) {
              res.json(user)
              console.log("made it to user")
              console.log(user)
            } else {
              res.send("User does not exist")
            }
            })
            .catch(err => {
              res.send('error: ' + err)
              console.error(err)
              console.log("didnt make it")
            })
          });
  app.all('*', (req, res, next) => {
    res.sendFile(path.resolve('./public/dist/public/index.html'))
  });
}

