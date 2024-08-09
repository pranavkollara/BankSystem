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
//! id1 sender id2 receiver
try{
    const sender = await customerModel.findOne({id:req.body.id1});
    if(!sender) return res.status(404).json("sender not found");
    const receiver = await customerModel.findOne({id:req.body.id2});
    if(!receiver) return res.status(404).json("receiver not found")
    sender.balance-=req.body.amount;
    await sender.save();
    receiver.balance+=req.body.amount;
    await receiver.save();
    res.json({
        "Message" : "Transaction Completed",
        "Sender" : sender.balance,
        "Receiver" : receiver.balance
    })

    sender.transcation.push({
        amount:req.body.amount,
        description:"nice payment bro",
        receiver:-1,
    })
    receiver.transcation.push({
        amount:req.body.amount,
        description:"nice payment bro",
        receiver:1,
    })
    await sender.save();
    await receiver.save();

    sender.transcation.sort((a,b) => b.date-a.date);
    receiver.transcation.sort((a,b) => b.date-a.date);
    if(sender.transcation.length >10){
        sender.transcation.splice(10);
    }
    if(receiver.transcation.length >10){
        receiver.transcation.splice(10);
    }
    await sender.save();
    await receiver.save();


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

app.get("/balance/:uid",async (req,res) => {
    try{
        const user = await customerModel.findOne({
            id:req.params.uid
        })
        if(!user) res.status(404).json("user not found");
        res.json({"balance" : user.balance});
    }catch(err){
        console.log(err)
    }
})