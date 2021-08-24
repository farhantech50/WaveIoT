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
    switch(locData[2]){
        case "WSB1":
            (new Loc.WSB1({
            latitude: locData[0],
            longitude: locData[1],
            clientid: locData[2]
            })).save();
            break;
        case "WSB2":
            (new Loc.WSB2({
            latitude: locData[0],
            longitude: locData[1],
            clientid: locData[2]
            })).save();
            break;
    }

});
}
