module.exports=function(){
    
const mqtt = require('mqtt')
const Loc = require('../model/db');
const options = {
    host: "ecede9a1.us-east-1.emqx.cloud",
    port: 15954,
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
            (new Loc[0]({
            latitude: locData[0],
            longitude: locData[1],
            clientid: locData[2]
            })).save();
            break;
        case "WSB2":
            (new Loc[1]({
            latitude: locData[0],
            longitude: locData[1],
            clientid: locData[2]
            })).save();
            break;
        case "WSB3":
            (new Loc[2]({
            latitude: locData[0],
            longitude: locData[1],
            clientid: locData[2]
            })).save();
            break;
    }

});
}
