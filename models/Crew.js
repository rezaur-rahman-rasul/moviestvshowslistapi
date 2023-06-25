const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const crewSchema = new Schema({
    first_name: {
        type: String,
        required: true
      },
    last_name: {
        type: String,
        required: true
      },
    content_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Content"
      },
    roles: {
      type: String,
      required: true
      }
},{
  timestamps:true
})

const crews = mongoose.model("Crew", crewSchema);

module.exports = crews;