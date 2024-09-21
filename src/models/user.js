const mongoose=require('mongoose');
const validator=require('validator')

const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50
    },
    lastName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50
    },
    emailId:{
        type:String,
        required:true,
        lowercase:true,
        validate(value){
            
            if(!validator.isEmail(value)){
                throw new Error("Email Not Valid")
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong Password");
            }

        }
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        required:true,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("gender data not valid");
            }

        }
       


    },
    skills:{
        type:[String]
    },
    about:{
        type:String,
        default:"This is default about for the user"
    },
    photoUrl:{
        type:String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo Url")
            }
        }
    }
    
    
},{
    timestamps:true
})
const User=mongoose.model("User",userSchema);

module.exports=User;