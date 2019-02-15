var mongoose = require("mongoose");
var MilesSchema = require('../models/miles').schema;
var StatsSchema = require('../models/stats').schema;

var UsersSchema = new mongoose.Schema({
    username:{type:String, required: true},
    password:{
        type:String, required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    milesArray: [MilesSchema],
    statsArray: [StatsSchema]
  
}, {timestamps: true });

module.exports = User = mongoose.model('users', UsersSchema)