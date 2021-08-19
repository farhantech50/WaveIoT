module.exports= function(io){
const express = require("express");
const app = express.Router();
const Loc = require('../model/db');
const fs = require('fs');
app.get('/',(req,res)=>{
    res.render('map');
})

app.post('/values',(req,res)=>{
    const locVal  = new Loc ({
        longitude: req.query.longi,
        latitude: req.query.lati
    })
    locVal.save((err,doc)=>{
        if(!err){
            res.sendStatus(200);
        }
        else {
            console.log('Error during record update : ' + err);
        }
    });
    
})

io.on("connection",async (socket)=>{
    await Loc.find((err,doc)=>{
        if(!err){
            let data=[];
            let j = 0; 
            for(let i of doc){
                data[j]={lat:i.latitude,long:i.longitude};
                j++;
            }
            socket.emit("update",data);
        }
        else{
            console.log(err)
        }
    })
})
    return app;
};
