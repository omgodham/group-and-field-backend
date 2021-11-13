const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4 } = require("uuid");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: String,
    encryPassword: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'ROLE_STUDENT',
    },
    profileImg: {
      data: Buffer,
      ContentType: String,
    },
    std: {
      type: "Number",
      default: 1,
    },
    board: {
      type: String,
      default: "",
    },
    lectures: [
      {
         type: Object,
         default:null
      }
   ],
    feeDueLectures: [
      {
        classId: {
          type: mongoose.ObjectId,
          ref: "Class",
        },
      },
    ],
    childs: [
       {
          type: mongoose.ObjectId,
          ref: "User",
      }
    ],
    isRememberMe: {
      type: Boolean,
      default: false,
    },
    learningRate:{
        type:Number,
        default:50
    },
    calendarId:{
      type:'String',
      default:''
    }
  },
  { timestamps: true }
);

userSchema.virtual("password")
.set(function(password) {
        this.salt = v4();
        this.encryPassword = this.securePassword(password);
  });


  userSchema.methods = {
    authenticate : function(plainpassword){
        return this.encryPassword === this.securePassword(plainpassword);
    },
    
    securePassword : function(plainpassword){
        if(plainpassword){
            return crypto.createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex');
        }else{
            return '';
        }

    }
}

module.exports = mongoose.model("User", userSchema);
