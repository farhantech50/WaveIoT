const mongo = require("mongoose");

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
const WSB2= db.model('WSB2',locationSchema);
module.exports = {WSB1,WSB2};