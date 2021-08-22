module.exports=function(){
    
const mqtt = require('mqtt')
const Loc = require('../model/db');
const options = {
    host: "yee248bb.us-east-1.emqx.cloud",
    port: 15539,
    protocol: 'mqtt',
    username: 'waveiot',
    password: 'Farhan500'
}

//initialize the MQTT client
const client = mqtt.connect(options);

//setup the callbacks
client.on('connect', function () {
    console.log('MQTT Connected');
});

client.on('error', function (error) {
    console.log(error);
});
client.subscribe('wave');

client.on('message', function (topic, message) {
    const locData = message.toString().split('=');
    const locVal  = new Loc ({
        latitude: locData[0],
        longitude: locData[1],
        clientID: locData[2]
    })
    locVal.save((err,doc)=>{
        if(!err){
            console.log(locVal);
        }
        else {
            console.log('Error during record update : ' + err);
        }
    });
});
}
