const { required } = require("joi");
const mongoose = require("mongoose");
const passport = require("passport");
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email :{
        type:String,
        required:true
    
    },
}
);   
userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",userSchema);

