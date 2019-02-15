var mongoose = require('mongoose');

var MilesSchema = new mongoose.Schema({
  type:{
    type: String,
    required: [true, "Type is required"]
  },
    date: {
    type: Date,
      required: [true, "Date is required"],
  },
  distance: {
    type: Number,
    
    min: [1,"Must be a mile or greater."]
  },
  distance1:{
    type: Number,
    required: [true, "Starting mileage is required."],
    min: [0,"Must be zero miles or greater."]
  },
  distance2:{
    type: Number,
    required: [true, "Ending distance is required."],
    min: [1,"Must be a mile or greater."]
  },
  notes: {
    type: String
  },
  category: {
    type: String,
    default: ""
  }
}, {timestamps: true });

var Miles = mongoose.model('Miles', MilesSchema);
module.exports = Miles;