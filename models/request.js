const mongoose = require("mongoose");


const requestSchema = new mongoose.Schema({
    description:{
        type:'String',
        default:''
    },
    from:{
        type: Object,
        default:null ,
      },
      amount:{
          type:Number,
          default:0
      }
  })

  module.exports = mongoose.model("Request", requestSchema);