const express = require("express");
const app = express.Router();
const bcrypt = require('bcrypt');
const User = require("../model/user");
require('dotenv').config();

async function createUser(){
    User.remove({});
    const saltRounds = 10;
    const user = new User({
        username: process.env.USER_NAME,
        password: await bcrypt.hash(process.env.PASS, saltRounds)
    });
    user.save().then((data)=>{
        console.log("New ID created using username: "+process.env.USER_NAME);
    }).catch((err=>{console.log(err)}));
    
}
createUser();


app.get('/',(req,res)=>{
    res.render('login');
})

app.post('/',async(req,res)=>{
    try {
    const user = await User.findOne({ username: req.body.username }); 
    if (user) {
        const cmp = await bcrypt.compare(req.body.pass, user.password);
        if (cmp) {
        res.redirect('/');
        } else {
        res.send("Wrong username or password.");
        }
    } else {
        res.send("Wrong username or password.");
    }
    } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error Occured");
    }
})

module.exports= app;