const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  duration: {
    type: String
  },
  origin: {
    type: String
  },
  genre: {
    type: String
  }
},{
  timestamps:true
});

const content = mongoose.model("Content", contentSchema);

module.exports = content;
