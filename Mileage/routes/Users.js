const express = require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const User = require("../models/users")
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
    const today = new Date()
    const userData = {
        username: req.body.username,
        password: req.body.password,
        date: today
    }
    User.findOne({
        username: req.body.username
    })
    .then(user => {
        if(!user){
            bcrypt.hash(req.body.password, 10 , (err, hash) => {
                userData.password = hash
                User.create(userData)
                    .then(user => {
                        res.json({status: user.username + " registered"})

                    })
                    .catch(err => {
                        res.send('error: ' + err)
                    })
            })
        } else {
            res.json({error: ' User already exists'})
        }
    })
    .catch(err => {
        res.send('error' + err)
    })
})