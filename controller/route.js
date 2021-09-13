module.exports= function(io){
const express = require("express");
const app = express.Router();
const Loc = require('../model/db');
const fs = require('fs');
app.get('/',(req,res)=>{
    res.render('map');
})

io.on("connection",async (socket)=>{
     //To find the latest data from the collection
    let data=[];
    for(let i=0;i<Loc.length;i++){
        await Loc[i].find().sort({_id:-1}).limit(1).then((doc)=>{
            if(doc){
                data[i]={lat:doc[0].latitude,long:doc[0].longitude,cid:doc[0].clientid};
            }
        }).catch((error)=>{
            console.log(`Location value for WSB${i+1} not found`);
        });
    }
    
    socket.emit("update",data);
})
    return app;
};
