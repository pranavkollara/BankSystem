const mongoose = require("mongoose");

const transcationSchema = mongoose.Schema({
    date:{
      type:Date,
      default:Date.now
    },
    amount:Number,
    description:String,
    receiver:Number // 1 receiverd -1 sent;
})

const customerSchema = mongoose.Schema({
  
  _id: mongoose.Types.ObjectId,
  id:String,
  name: String,
  role:{
    type:Number,
    default:1
  }, 
  balance : {type:Number,default:0,min:[0,"bro no money"]},
  transcation: [transcationSchema]
});

module.exports = customerSchema;