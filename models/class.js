const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
{
    topic:{
        type:String,
        default:"",
        required:true
    },
    startDate:{
        type:String,
        default:"",
    },
    endDate:{
        type:String,
        default:"" 
    },
    startTime:{
        type:String,
        default:"",
    },
    endTime:{
        type:String,
        default:"" 
    },
    hours:{
        type:Number,
        default:1 
    },
    forStd:{
        type:Number,
        default:1 
    },
    priorityId:{
        type:Number,
        default:1 
    }
}, { timestamps: true }
);

module.exports = mongoose.model("Class", classSchema);