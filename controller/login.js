const express = require("express");
const app = express.Router();
const bcrypt = require('bcryptjs');
const User = require("../model/user");
require('dotenv').config();

async function createUser(){
    User.remove({});
    const saltRounds = 10;
    bcrypt.hash(process.env.PASS, saltRounds, function(err, hash) {
        const user = new User({
            username: process.env.USER_NAME,
            password: hash
        });
        user.save().then((data)=>{
            console.log("New ID created using username: "+process.env.USER_NAME);
        }).catch((err=>{console.log(err)}));
    });
    

}
createUser();


app.get('/',(req,res)=>{
    res.render('login');
})

app.post('/',async(req,res)=>{
    try {
    const user = await User.findOne({ username: req.body.username }); 

    if (user) {
        bcrypt.compare( req.body.pass, user.password, function(err, result) {
            if (result) {
                res.redirect('/map');
                } else {
                res.send("Wrong username or password.");
                }
        });
    } else {
        res.send("Wrong username or password.");
    }
    } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error Occured");
    }
})

module.exports= app;