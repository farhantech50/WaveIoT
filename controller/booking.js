const express = require("express");
const app = express.Router();
var path = require("path");

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '../views/booking.ejs'));
})

module.exports=app;