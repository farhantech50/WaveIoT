module.exports= function(io){
const express = require("express");
const app = express.Router();
const Loc = require('../model/db');
const fs = require('fs');
app.get('/',(req,res)=>{
    res.render('map');
})
/*
 //HTTP Rest for posting gps data to database
app.post('/values',(req,res)=>{
    const locVal  = new Loc ({
        longitude: req.query.longi,
        latitude: req.query.lati,
        clientid: req.query.cid
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
*/
io.on("connection",async (socket)=>{
     //To find the latest data from the collection
    let data=[];
    await Loc.WSB1.find().sort({_id:-1}).limit(1).then((doc)=>{
        if(doc){
            data[0]={lat:doc[0].latitude,long:doc[0].longitude,cid:doc[0].clientid};
        }
        else{
            console.log(err)
        }
    }).catch((error)=>{
        console.log(error);
    });
    await Loc.WSB2.find().sort({_id:-1}).limit(1).then((doc)=>{
        if(doc){
            data[1]={lat:doc[0].latitude,long:doc[0].longitude,cid:doc[0].clientid};
        }
        else{
            console.log(err)
        }
    }).catch((error)=>{
        console.log(error);
    });
    socket.emit("update",data);
    /*
    await Loc.find((err,doc)=>{
        if(!err){
            let data=[];
            let j = 0; 
            for(let i of doc){
                data[j]={lat:i.latitude,long:i.longitude,cid:i.clientid},
                j++;
            }
            socket.emit("update",data);
        }
        else{
            console.log(err)
        }
    })*/
})
    return app;
};
