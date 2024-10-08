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
        const check = await customerModel.findOne({id:req.body.id});
        if(check) return res.status(201).json("User already exists")
     const query = await customerModel.insertMany({
        id:req.body.id,
        name : req.body.name,


       });
       console.log("User Added");
       res.status(201).json("Added")
   }catch(err){
    console.log(err);
   }
})

app.post("/transaction",async (req,res) => {
//! id1 sender id2 receiver
if(req.body.id1 == req.body.id2){
    return res.status(404).json({"Message":"BRO WHAT??"})
}
try{
    const sender = await customerModel.findOne({id:req.body.id1});
    if(!sender) return res.status(404).json({"Message":"Sender Not Found"});
    const receiver = await customerModel.findOne({id:req.body.id2});
    if(!receiver) return res.status(404).json({"Message":"Receiver Not Found"})
    sender.balance-=req.body.amount;
    await sender.save();
    receiver.balance= Number(receiver.balance) + Number(req.body.amount);
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
    if(err.name === 'ValidationError') res.status(401).json({"Message":"Not enough Money"});
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

app.get("/transaction/:uid",async (req,res) => {
    try{
        const user = await customerModel.findOne({
            id:req.params.uid
        })
        const data = await user.transcation;
    
        res.json(data)
    }catch(err){
        console.log(err) ;
    }
})

app.get("/role/:uid",async (req,res)=>{
    try{
        const user = await customerModel.findOne({id:req.params.uid});
        res.json(user.role);
    }catch(err){
        console.log(err);
    }
})

app.get("/users",async (req,res)=>{
    try{
        const users = await customerModel.find();
        const data = [];
        users.forEach(element => {
            if(element.role==1){

                data.push({
                    "name" :  element.name,
                    "id":element.id
                })
            }
        });
        res.json(data)
    }catch(err){
        console.log(err)
    }
})