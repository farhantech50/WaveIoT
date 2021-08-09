const express = require("express");
const app  = express();
const route = require('./controller/route');
require('./model/db');
app.listen(process.env.PORT || 3000);

app.set('view engine','ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use('/',route);


