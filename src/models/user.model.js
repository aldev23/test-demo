
import mongoose, {Schema} from "mongoose";

// jsonwebtoken npm pkg used for token like access and refresh tokens defined in .env

import jwt from "jsonwebtoken";

// bcrypt npm pkg used for hashing passwords 

import bcrypt from "bcrypt";

const UserSchema = new Schema(
    {
        username:{
            type: String,
            required:true,
            unique: true,
            lowercase:true,
            trim: true,
            index:true,
        },
        email:{
            type: String,
            required:true,
            unique: true,
            lowercase:true,
            trim: true,
            
        },
        fullname:{
            type: String,
            required:true,
            trim: true,
            index:true,
        },
        avatar:{
            type: String, // cloudinary url
            required:true,
            unique: true,
            lowercase:true,
            trim: true,
            index:true,
        },
        coverImage:{
            type: String //cloudinary url
        },
        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        password:{
            type: String,
            required:[true, 'Password is required']
        },
        refreshToken:{
            type: String
        }
    },
    {
        Timestamps:true
    }
    );

//pre Middleware using to to before saving new and updated password

UserSchema.pre("save", async function(next)
{
    // checking pass is modified or not if modified then it will hash this password otherwise do not

    if(!this.isModified("password")) return next();

    this.password =await bcrypt.hash(this.password, 10)
    next()
})

// we check here current password with encrypted stored password in database 

UserSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

// here we are generating access tokens through Methods like above 

//this method use for jwt tokens for access and refresh tokens
UserSchema.methods.generateAccessToken = function(){
  return  jwt.sign({
        _id:this._id,
        email:this.email,
        username: this.username,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}
UserSchema.methods.generateRefreshToken = function(){
    return  jwt.sign({ 
        _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}

 export const User = mongoose.model("User", UserSchema);