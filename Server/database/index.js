const mongoose = require('mongoose');
require('dotenv').config();
console.log(process.env.mongo_uri);

async function connectDB() {
    try{
        const client = await mongoose.connect(process.env.mongo_uri);
        console.log("DB connected");
        return client;
    }catch(err){

        throw err;
    } 
}
module.exports.default = connectDB();