const mongo = require("mongoose");
mongo.connect('mongodb+srv://farhan:farhan500@cluster0.15ihw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology: true},()=>{
    
})
const userSchema = mongo.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
},{
    versionKey: false
});

module.exports = mongo.model('users',userSchema);