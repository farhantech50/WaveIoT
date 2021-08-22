module.exports=function(){
    var mqtt = require('mqtt')

var options = {
    host: "yee248bb.us-east-1.emqx.cloud",
    port: 15539,
    protocol: 'mqtt',
    username: 'waveiot',
    password: 'Farhan500'
}

//initialize the MQTT client
var client = mqtt.connect(options);

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
    console.log(locData);
});
}
