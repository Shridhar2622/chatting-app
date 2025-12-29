const mongoose=require("mongoose")


const MessageSchema=new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    reciever:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
        required: true
    },
    chatId: String,
},{timestamps: true})

module.exports=mongoose.model("Message",Message)