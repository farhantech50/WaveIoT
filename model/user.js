const mongo = require("mongoose");
mongo.connect('mongodb+srv://farhan:farhan500@cluster0.15ihw.mongodb.net/users?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology: true},()=>{
    console.log("MongoDB connected on Users")
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