module.exports= function(io){
const express = require("express");
const app = express.Router();
const Loc = require('../model/db');
const fs = require('fs');
app.get('/',(req,res)=>{
    res.render('index');
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

app.post('/clean',(req,res)=>{
    Loc.db.dropCollection('locations');
    res.sendStatus(200);
})
io.on("connection",async (socket)=>{
    await Loc.find((err,doc)=>{
        if(!err){
            let data='';
            for(let i of doc){
                data += "Longitude: "+i.longitude+"  "+"Latitude: "+i.latitude+"\n";
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
