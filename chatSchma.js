const mongoose = require('mongoose');
const chatSchema=new mongoose.Schema({
    from :{
        type:String,
        required:true,
    },
    to : {
        type:String,
        required:true,
    },
    message : {
        type:String,
        required:true,
    },
    createdAt : {
        type: Date,
        default: Date.now,
    },

});
const Chat=mongoose.model('Chat',chatSchema);
module.exports =Chat;