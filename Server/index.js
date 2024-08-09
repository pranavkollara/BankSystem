const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const database = require('./database');
const customerModel = require('./database/model/Customer');

const app = express();

app.use(express.json());
app.use(cors());

app.listen(4000,() => {
    console.log("Running on 4000");
})

app.post("/adduser",async (req,res) => {
   
   try{

     const query = await customerModel.insertMany({
        id:req.body.id,
        name : req.body.name,


       });
       console.log("User Added");
       res.json("Added")
   }catch(err){
    console.log(err);
   }
})

app.post("/transaction",async (req,res) => {
//! id1 sender id2 reciver
try{
    const sender = await customerModel.findOne({id:req.body.id1});
    if(!sender) return res.status(404).json("sender not found");
    const reciver = await customerModel.findOne({id:req.body.id2});
    if(!reciver) return res.status(404).json("reciver not found")
    sender.balance-=req.body.amount;
    await sender.save();
    reciver.balance+=req.body.amount;
    await reciver.save();
    res.json({
        "Message" : "Transaction Completed"
    })

    sender.transcation.push({
        amount:req.body.amount,
        description:"nice payment bro",
        reciver:-1,
    })
    reciver.transcation.push({
        amount:req.body.amount,
        description:"nice payment bro",
        reciver:1,
    })
    await sender.save();
    await reciver.save();



}catch(err){
    if(err.name === 'ValidationError') res.status(401).json("bro no money");
    console.log(err);
}
    
    
})

app.patch("/updatebalance/:uid",async (req,res) => {
   try{
    const user = await customerModel.findOne({id:req.params.uid});
    if(!user) return res.json("user not found");
    user.balance+=req.body.value;
    await user.save();
    res.json("updated");
   }catch(err){
    if(err.name === 'ValidationError') res.json("bro no balance");
    console.log(err);
   }
})