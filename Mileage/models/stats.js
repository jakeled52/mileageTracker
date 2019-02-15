var mongoose = require('mongoose');

var StatsSchema = new mongoose.Schema({
  mpg:{
    type: Number,
    required: [true, "Miles per gallon is required"],
    min: 1
  },
    ppg: {
    type: Number,
      required: [true, "Price per gallon is required"],
    min: 1
  },
}, {timestamps: true });

var Stats = mongoose.model('Stats', StatsSchema);
module.exports = Stats;