const mongo = require("mongoose");
//To create multiple connection with different database, mongo.createConnection() is used.
const db = mongo.createConnection('mongodb+srv://farhan:farhan500@cluster0.15ihw.mongodb.net/locations?retryWrites=true&w=majority', {reconnectInterval: 5000,reconnectTries: 60});
db.on(`error`, console.error.bind(console, `connection error:`));
db.once(`open`, function () {console.log(`MongoDB connected on Locations`);});


const locationSchema = mongo.Schema({
    longitude: {
        type: String
    },
    latitude: {
        type: String
    },
    clientid: {
        type: String
    }
},{
    versionKey: false
});
const WSB1= db.model('WSB1',locationSchema);
//const WSB2= db.model('WSB2',locationSchema);
//const WSB3= db.model('WSB3',locationSchema);

let arr = [WSB1,/*WSB2,WSB3*/];
module.exports = arr;


/* MongoClient based
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://farhan:farhan500@cluster0.15ihw.mongodb.net';

MongoClient.connect(url, async function(err, client) {
    if(!err){
        console.log("Connected");
    }
    let db=client.db('locations');
    await db.listCollections().toArray(function(err, items) {
        console.log(items.length)
        client.close();
    });
});
*/