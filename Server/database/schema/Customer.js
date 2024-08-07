const mongoose = require("mongoose");

const transcationSchema = mongoose.Schema({
    data:Date,
    amount:Number,
    description:String,
    reciver:Number
})

const customerSchema = mongoose.Schema({
  
  _id: mongoose.Types.ObjectId,
  id:String,
  name: String,
  role:{
    type:Number,
    default:1
  }, 
  balance : Number,
  transcation: [transcationSchema]
});

module.exports = customerSchema;