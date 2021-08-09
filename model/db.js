const mongo = require("mongoose");
mongo.connect('mongodb+srv://farhan:farhan500@cluster0.15ihw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology: true},()=>{
    console.log('connected to database');
})
const locationSchema = mongo.Schema({
    longitude: {
        type: String
    },
    latitude: {
        type: String
    },
});

module.exports = mongo.model('locations',locationSchema);