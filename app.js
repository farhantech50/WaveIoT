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
app.set('view engine','ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.use('/map',route);
app.use('/',loginRoute);




