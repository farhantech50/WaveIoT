const mongo = require("mongoose");
mongo.connect('mongodb+srv://farhan:farhan500@cluster0.15ihw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology: true},()=>{
    
})
const userSchema = mongo.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
},{
    versionKey: false
});

module.exports = mongo.model('users',userSchema);