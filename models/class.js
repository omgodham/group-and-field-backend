const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
{
    id:{
        type:String,
        default:"",
        unique:true,
        dropDups: true
    },
    attachments:{
        type:Array,
        default:[]
    },
    description:{
        type:String,
        default:"",
    },
    location:{
        type:'String',
        default:""
    },
    title:{
        type:String,
        default:"",
        required:true
    },
    end:{
        type:String,
        default:"" 
    },
    start:{
        type:String,
        default:"",
    },
    url:{
        type:String,
        default:"",
    },
    teacher:{
          type: mongoose.ObjectId,
          ref: "User",
    }
}, { timestamps: true }
);

module.exports = mongoose.model("Class", classSchema);