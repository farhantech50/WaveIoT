const express = require("express");
const app = express.Router();
const Loc = require('../model/db');
const fs = require('fs');
app.get('/',(req,res)=>{
    setInterval(async ()=>{
        await Loc.find((err,doc)=>{
            if(!err){
                let data='';
                for(let i of doc){
                    data += "Longitude: "+i.longitude+"  "+"Latitude: "+i.latitude+"\n";
                }
                fs.writeFile("./public/live.txt",data,(err)=>{
                    if(err){
                        throw err;
                    }
                });
            }
            else{
                console.log(err)
            }
        })
    },1000)
    res.render('index');
    
    
})

/*
//by parameter
app.post('/values/:id',(req,res)=>{
    let id = req.params.id;
    console.log("By param: "+id);
    res.render('index',{id});
})*/

//by query
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


module.exports= app;
