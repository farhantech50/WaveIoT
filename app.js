const express = require("express");
const app  = express();

require('./model/db');
require('dotenv').config();

var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);
server.listen(process.env.PORT || 3000);
app.set('socketio', io);

const route = require('./controller/route')(io);
const loginRoute = require('./controller/login');
const dashRoute = require('./controller/dashboard');
const bookRoute = require('./controller/booking');
app.set('view engine','ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.use('/map',route);
app.use('/',loginRoute);
app.use('/dashboard',dashRoute);
app.use('/booking',bookRoute);

const mqttServer = require('./mqtt/mqtt');

mqttServer();


