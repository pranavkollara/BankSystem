const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const database = require('./database');

const app = express();
app.listen(4000,() => {
    console.log("Running on 4000");
})
